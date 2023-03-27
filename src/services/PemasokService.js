import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const ENDPOINT = `${config.BASE_URL}/pemasok`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const list = (query) => {
  CONFIG.params = { ...query };
  return HTTPService.get(ENDPOINT, CONFIG);
};

const create = (pemasok) => {
  return HTTPService.post(ENDPOINT, { ...pemasok }, CONFIG);
};

const get = (kodePemasok) => {
  return HTTPService.get(`${ENDPOINT}/${kodePemasok}`, CONFIG);
};

const edit = (pemasok) => {
  const { kodePemasok, ...dataPemasok } = pemasok;
  return HTTPService.put(
    `${ENDPOINT}/${kodePemasok}`,
    { ...dataPemasok },
    CONFIG
  );
};

const remove = (kodePemasok) => {
  return HTTPService.delete(`${ENDPOINT}/${kodePemasok}`, CONFIG);
};

export default { list, create, edit, remove, get };
