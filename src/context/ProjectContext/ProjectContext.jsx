import { createContext, useEffect, useReducer, useState } from "react";
import { BASEURL } from "../../API_URL/api";
import useRefreshToken from "../../hooks/useRefresh";
import PropTypes from "prop-types";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { HorizontalLoader } from "../../components";

const baseUrl = BASEURL;

const endpointPath = "projects";

export const ProjectContext = createContext();

export const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "CREATE_PROJECT":
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case "DELETE_PROJECT":
      return {
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProjectReducer, {
    projects: null,
  });

  const refreshAccessToken = useRefreshToken();
  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    data: projects,
    refetch,
    error,
  } = useQuery(
    "projectData",
    async () => {
      const accessToken = await refreshAccessToken();
      const projectResponse = await fetch(`${baseUrl}/${endpointPath}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const projectData = await projectResponse.json();
      return projectData;
    },

    {
      staleTime: Infinity,
    }
  );
  if (error) {
    console.log(error);
  }

  const createProject = useMutation(
    async (projectData) => {
      const accessToken = await refreshAccessToken();
      const response = await axios.post(
        `${baseUrl}/${endpointPath}`,
        projectData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return response.data.project;
    },

    {
      onSuccess: () => {
        refetch();
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setLoading(error);
      },
      onMutate: () => {
        setLoading(true);
      },
    }
  );

  const deleteProject = useMutation(
    async (projectId) => {
      const accessToken = await refreshAccessToken();
      const response = await fetch(`${baseUrl}/${endpointPath}/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.json();
    },
    {
      onSuccess: async () => {
        await refetch();
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
      },
      staleTime: 60000,
      onMutate: () => {
        setLoading(true);
      },
    }
  );

  useEffect(() => {
    if (projects) {
      dispatch({ type: "GET_PROJECTS", payload: projects });
    }
  }, [dispatch, projects]);

  return (
    <ProjectContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        createProject,
        deleteProject,
      }}
    >
      {loading && <HorizontalLoader />}
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchUser: PropTypes.bool,
};

export default ProjectContext;
