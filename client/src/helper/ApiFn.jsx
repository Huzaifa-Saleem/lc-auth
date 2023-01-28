import axios from "axios";
import { useDispatch } from "react-redux";
import { setError, setLoading, setSuccess } from "../redux/Slice/UserSlice";

//base url
axios.defaults.baseURL = "http://localhost:8080";

export const VerifyUser = async (username) => {
  try {
    const data = await axios.post("/api/authenticate", { username });
    return Promise.resolve(data);
  } catch (error) {
    const err = { error: "Username Doesn't Exist ...!" };
    return Promise.reject(err);
  }
};

export const loginUser = async (cred) => {
  const { username, password } = cred;
  try {
    const data = await axios.post("/api/login", {
      username,
      password,
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserDetail = async (username) => {
  try {
    const data = await axios.get(`/api/user/${username}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
