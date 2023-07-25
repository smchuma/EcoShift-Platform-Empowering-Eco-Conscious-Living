import { useContext } from "react";
import TaskContext from "../context/TaskContext/TaskContext";

const useTask = () => {
  const { tasks, isLoading, postTask, deleteTask, updateTask } =
    useContext(TaskContext);

  return { tasks, isLoading, postTask, deleteTask, updateTask };
};

export default useTask;
