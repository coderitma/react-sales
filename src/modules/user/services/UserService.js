import axios from "axios";
import config from "../config";

const loginService = ({ email, password }) => {
  return axios.post(`${config.API_BASE_URL}${config.API_ENDPOINT_LOGIN}`, {
    email,
    password,
  });
};

const tokenVerify = async () => {
  const token = getToken();

  try {
    if (token) {
      const result = await axios.post(
        `${config.API_BASE_URL}${config.API_ENDPOINT_CHECK_TOKEN}`,
        {},
        {
          headers: {
            "x-access-token": getToken(),
          },
        }
      );
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

const saveToken = (token) => {
  localStorage.setItem(config.KEY_LOCAL_STORAGE_TOKEN, token);
};

const getToken = () => {
  return localStorage.getItem(config.KEY_LOCAL_STORAGE_TOKEN);
};

export default {
  loginService,
  saveToken,
  getToken,
  tokenVerify,
};
