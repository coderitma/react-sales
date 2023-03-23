import axios from "axios";
import config from "../config";

const ENDPOINT_LOGIN = "/users/login";
const ENDPOINT_CHECK_TOKEN = "/hello/world";
const KEY_LOCAL_STORAGE_TOKEN = "TOKEN";

const login = ({ email, password }) => {
  return axios.post(`${config.BASE_URL}${ENDPOINT_LOGIN}`, {
    email,
    password,
  });
};

const tokenVerify = async () => {
  const token = getToken();

  try {
    if (token) {
      const result = await axios.post(
        `${config.BASE_URL}${ENDPOINT_CHECK_TOKEN}`,
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
  localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, token);
};

const getToken = () => {
  return localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
};

export default {
  login,
  saveToken,
  getToken,
  tokenVerify,
};
