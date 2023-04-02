import config from "../config";
import HTTPService from "./HTTPService";

const AuthService = {};
const ENDPOINT_LOGIN = "/users/login";
const ENDPOINT_CHECK_TOKEN = "/hello/world";
const KEY_LOCAL_STORAGE_TOKEN = "TOKEN";

AuthService.login = ({ email, password }) => {
  return HTTPService.post(`${config.BASE_URL}${ENDPOINT_LOGIN}`, {
    email,
    password,
  });
};

AuthService.tokenVerify = async () => {
  const token = AuthService.getToken();

  try {
    if (token) {
      await HTTPService.post(
        `${config.BASE_URL}${ENDPOINT_CHECK_TOKEN}`,
        {},
        {
          headers: {
            "x-access-token": AuthService.getToken(),
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

AuthService.saveToken = (token) => {
  localStorage.setItem(KEY_LOCAL_STORAGE_TOKEN, token);
};

AuthService.getToken = () => {
  return localStorage.getItem(KEY_LOCAL_STORAGE_TOKEN);
};

export default AuthService;
