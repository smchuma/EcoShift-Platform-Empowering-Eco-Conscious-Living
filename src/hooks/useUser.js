import { useContext } from "react";
import UserContext from "../context/UserContext/UserContext";

const useUser = () => {
  const { user, allUsers, setUser, isLoading, error, updateUser } =
    useContext(UserContext);
  return { user, setUser, allUsers, isLoading, error, updateUser };
};

export default useUser;
