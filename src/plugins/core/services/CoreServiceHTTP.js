// eslint-disable-next-line
import axios from "axios";
import {
  CORE_DATA_PROVIDER_CLASS_LOADING_INDICATOR,
  CORE_DATA_PROVIDER_TIMEOUT,
} from "../CoreDataProvider";
import CoreServiceStatus401 from "./CoreServiceStatus401";

const CoreServiceHTTP = axios.create({
  timeout: CORE_DATA_PROVIDER_TIMEOUT,
});

CoreServiceHTTP.interceptors.request.use(
  (req) => {
    document.body.classList.add(CORE_DATA_PROVIDER_CLASS_LOADING_INDICATOR);
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

CoreServiceHTTP.interceptors.response.use(
  (res) => {
    document.body.classList.remove(CORE_DATA_PROVIDER_CLASS_LOADING_INDICATOR);
    return res;
  },
  (error) => {
    CoreServiceStatus401(error);
    document.body.classList.remove(CORE_DATA_PROVIDER_CLASS_LOADING_INDICATOR);
    return Promise.reject(error);
  }
);

export default CoreServiceHTTP;
