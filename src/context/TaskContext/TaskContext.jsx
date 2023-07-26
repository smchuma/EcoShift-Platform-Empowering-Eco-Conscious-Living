import { createContext, useEffect, useReducer, useState } from "react";
import { BASEURL } from "../../api_url/api";
import useRefreshToken from "../../hooks/useRefresh";
import { useMutation, useQuery } from "react-query";
import { HorizontalLoader } from "../../components";
import PropTypes from "prop-types";

const baseUrl = BASEURL;
const endpointPath = "task";

const TaskContext = createContext();

export const TaskReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case "UPDATE_TASK": {
      const updatedTask = action.payload;
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === updatedTask._id) {
          return updatedTask;
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TaskReducer, {
    tasks: null,
  });

  const refreshAccessToken = useRefreshToken();
  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    data: tasks,
    refetch,
    error,
  } = useQuery(
    "TaskData",
    async () => {
      const accessToken = await refreshAccessToken();
      const taskResponse = await fetch(`${baseUrl}/${endpointPath}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const taskData = await taskResponse.json();

      const userIds = taskData.map((task) => task.userId);

      const userResponse = await fetch(
        `${baseUrl}/user?id=${userIds.join(
          ","
        )}&fields=firstName,lastName,image`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userData = await userResponse.json();

      const data = taskData.map((task) => {
        const user = userData.find((user) => user._id === task.userId);

        return {
          ...task,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
          },
        };
      });
      return data;
    },
    {
      staleTime: Infinity, // Cache the data for a long time
    }
  );
  if (error) {
    console.log(error);
  }

  const postTask = useMutation(
    async (data) => {
      const accessToken = await refreshAccessToken();
      const response = await fetch(`${baseUrl}/${endpointPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },
    {
      onSuccess: async (newTask) => {
        const accessToken = await refreshAccessToken();
        const userId = newTask.userId;
        const userResponse = await fetch(`${baseUrl}/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const userData = await userResponse.json();

        // Combine the new post and user data into a single object
        const taskDataWithUser = {
          ...newTask,
          user: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            profilePicture: userData.profilePicture,
          },
        };

        // Dispatch the action with the new post and user data
        dispatch({
          type: "CREATE_TASK",
          payload: taskDataWithUser,
        });
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

  const updateTask = useMutation(
    async (variables) => {
      const accessToken = await refreshAccessToken();
      const { id, data } = variables;

      const response = await fetch(`${baseUrl}/${endpointPath}/${id} `, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      return response.json();
    },

    {
      onSuccess: async (updatedTask) => {
        dispatch({
          type: "UPDATE_TASK",
          payload: updatedTask,
        });
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

  const deleteTask = useMutation(
    async (postId) => {
      const accessToken = await refreshAccessToken();
      const response = await fetch(`${baseUrl}/${endpointPath}/${postId}`, {
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
    if (tasks) {
      dispatch({ type: "GET_TASKS", payload: tasks });
    }
  }, [dispatch, tasks]);

  return (
    <TaskContext.Provider
      value={{
        ...state,
        dispatch,
        isLoading,
        postTask,
        deleteTask,
        updateTask,
      }}
    >
      {loading && <HorizontalLoader />}
      {children}
    </TaskContext.Provider>
  );
};

TaskContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContext;
