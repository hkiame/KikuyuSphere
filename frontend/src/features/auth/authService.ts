import axios from "axios";
import { LoginData, RegisterUserData } from "../../types/auth";
const BASE_URL = "/api/auth";

export const registerUserAPI = async (userData: RegisterUserData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);

  if (response.data) {
    const data = JSON.stringify(response.data);
    localStorage.setItem("user", data);
  }

  return response.data;
};

export const loginUserAPI = async (credentials: LoginData) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);

  if (response.data) {
    const data = JSON.stringify(response.data);
    localStorage.setItem("user", data);
  }

  return response.data;
};
