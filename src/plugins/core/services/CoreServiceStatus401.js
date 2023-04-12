import {
  CORE_DATA_PROVIDER_STATUS_401,
  CORE_DATA_PROVIDER_BAD_REQUEST,
} from "../CoreDataProvider";
import CoreServiceSwal from "./CoreServiceSwal";

const CoreServiceStatus401 = (error) => {
  if (
    error.code === CORE_DATA_PROVIDER_BAD_REQUEST &&
    error.response.status === CORE_DATA_PROVIDER_STATUS_401
  ) {
    if (error.response && error.response.data && error.response.data.message) {
      CoreServiceSwal.fire({
        title: "Ups!",
        html: <i>{error.response.data.message}</i>,
        icon: "warning",
      });
    }
  }
};

export default CoreServiceStatus401;
