import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const ENDPOINT = `${config.BASE_URL}/pembelian`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const list = () => {
  return HTTPService.get(ENDPOINT, CONFIG);
};

const create = (pembelian) => {
  return HTTPService.post(ENDPOINT, { ...pembelian }, CONFIG);
};

const get = (faktur) => {
  return HTTPService.get(`${ENDPOINT}/${faktur}`, CONFIG);
};

export default { list, create, get };
