import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const { state } = useAuth();

  return state.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
