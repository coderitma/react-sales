import { CORE_DATA_PROVIDER_TOKEN_KEY } from "../CoreDataProvider";

const CoreServiceGetToken = () => {
  return localStorage.getItem(CORE_DATA_PROVIDER_TOKEN_KEY);
};

export default CoreServiceGetToken;
