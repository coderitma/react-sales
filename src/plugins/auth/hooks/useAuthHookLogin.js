import { AUTH_DATA_PROVIDER_USER_SCHEMA } from "../AuthDataProvider";
import AuthServiceLogin from "../services/AuthServiceLogin";
import CoreServiceStoreToken from "../../core/services/CoreServiceStoreToken";
import useCoreHookHandleInput from "../../core/hooks/useCoreHookHandleInput";

const useAuthHookLogin = () => {
  const [user, setUser, handleInput] = useCoreHookHandleInput(
    AUTH_DATA_PROVIDER_USER_SCHEMA
  );

  const handleAuthServiceLogin = () => {
    AuthServiceLogin(user)
      .then((response) => {
        CoreServiceStoreToken(response.data.token);
        window.location.href = "/pembelian";
      })
      .catch((error) => {});
  };

  return [user, setUser, handleInput, handleAuthServiceLogin];
};

export default useAuthHookLogin;
