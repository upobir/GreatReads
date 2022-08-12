import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "";
/**
 * call api() and then call get(), post()
 * @returns {AxiosInstance}
 */
const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, user } = useContext(AuthContext);

  const loggedInAxiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  const anonymousAxiosInstance = axios.create({
    baseURL
  });

  loggedInAxiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
    if (!isExpired) return req;
    
    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: authTokens.refresh
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  const wrappedAPI = () => {
    if(user){ 
      return loggedInAxiosInstance;
    }else{
      return anonymousAxiosInstance;
    }
  }

  return wrappedAPI;
};

export default useAxios;