import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const ENDPOINT = `${config.BASE_URL}/barang`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const list = (query = {}) => {
  CONFIG.params = query;
  return HTTPService.get(ENDPOINT, CONFIG);
};

const create = (barang) => {
  return HTTPService.post(ENDPOINT, { ...barang }, CONFIG);
};

const get = (kodeBarang) => {
  return HTTPService.get(`${ENDPOINT}/${kodeBarang}`, CONFIG);
};

const edit = (barang) => {
  const { kodeBarang, ...dataBarang } = barang;
  return HTTPService.put(
    `${ENDPOINT}/${kodeBarang}`,
    { ...dataBarang },
    CONFIG
  );
};

const remove = (kodeBarang) => {
  return HTTPService.delete(`${ENDPOINT}/${kodeBarang}`, CONFIG);
};

export default { list, create, get, edit, remove };
