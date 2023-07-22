import { useContext } from "react";
import ProjectContext from "../Context/ProjectContext/ProjectContext";

const useProject = () => {
  const { state, isLoading, createProject, deleteProject } =
    useContext(ProjectContext);

  return { state, isLoading, createProject, deleteProject };
};

export default useProject;
