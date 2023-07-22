import { useContext } from "react";
import { AuthContext } from "../context/Auth/AuthContext";

const useAuth = () => {
  const { state, login, logout, register, dispatch } = useContext(AuthContext);
  const { userId } = state;

  return { login, logout, state, register, dispatch, userId };
};

export default useAuth;
