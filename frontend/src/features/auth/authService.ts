import axios from "axios";

const BASE_URL = "/api/users/";

export const registerUserAPI = async (userData: User) => {
  const response = await axios.post(BASE_URL, userData);

  if (response.data) {
    const data = JSON.stringify(response.data);
    localStorage.setItem("user", data);
  }

  return response.data;
};
