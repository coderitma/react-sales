import { CORE_DATA_PROVIDER_TOKEN_KEY } from "../CoreDataProvider";

const CoreServiceStoreToken = (token) => {
  localStorage.setItem(CORE_DATA_PROVIDER_TOKEN_KEY, token);
};

export default CoreServiceStoreToken;
