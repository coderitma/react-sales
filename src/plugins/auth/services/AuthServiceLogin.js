import { CORE_DATA_PROVIDER_BASE_URL } from "../../core/CoreDataProvider";
import CoreServiceHTTP from "../../core/services/CoreServiceHTTP";

const AuthServiceLogin = (user) => {
  return CoreServiceHTTP.post(
    `${CORE_DATA_PROVIDER_BASE_URL}/users/login`,
    user
  );
};

export default AuthServiceLogin;
