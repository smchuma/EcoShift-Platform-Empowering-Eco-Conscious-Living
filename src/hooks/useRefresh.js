import axios from "axios";
import useAuth from "../hooks/useAuth";
import { BASEURL } from "../API_URL/api";

const useRefreshToken = () => {
  const { dispatch } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${BASEURL}/refresh`, {
      withCredentials: true,
    });
    // const accessToken = response?.data?.accessToken;
    dispatch((prev) => {
      return {
        ...prev,
        accessToken: response?.data?.accessToken,
      };
    });
    // localStorage.setItem("accessToken", accessToken);
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
