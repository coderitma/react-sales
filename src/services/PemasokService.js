import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const PemasokService = {};
const ENDPOINT = `${config.BASE_URL}/pemasok`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

PemasokService.list = (query) => {
  CONFIG.params = { ...query };
  return HTTPService.get(ENDPOINT, CONFIG);
};

PemasokService.create = (pemasok) => {
  return HTTPService.post(ENDPOINT, { ...pemasok }, CONFIG);
};

PemasokService.get = (kodePemasok) => {
  return HTTPService.get(`${ENDPOINT}/${kodePemasok}`, CONFIG);
};

PemasokService.edit = (pemasok) => {
  const { kodePemasok, ...dataPemasok } = pemasok;
  return HTTPService.put(
    `${ENDPOINT}/${kodePemasok}`,
    { ...dataPemasok },
    CONFIG
  );
};

PemasokService.remove = (kodePemasok) => {
  return HTTPService.delete(`${ENDPOINT}/${kodePemasok}`, CONFIG);
};

export default PemasokService;
