import { useContext } from "react";
import UserContext from "../context/UserContext/UserContext";

const useUser = () => {
  const { user, setUser, isLoading, error, updateUser } =
    useContext(UserContext);
  return { user, setUser, isLoading, error, updateUser };
};

export default useUser;
