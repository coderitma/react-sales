import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const BarangService = {};
const ENDPOINT = `${config.BASE_URL}/barang`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

BarangService.list = (query = {}) => {
  CONFIG.params = query;
  return HTTPService.get(ENDPOINT, CONFIG);
};

BarangService.create = (barang) => {
  return HTTPService.post(ENDPOINT, { ...barang }, CONFIG);
};

BarangService.get = (kodeBarang) => {
  return HTTPService.get(`${ENDPOINT}/${kodeBarang}`, CONFIG);
};

BarangService.edit = (barang) => {
  const { kodeBarang, ...dataBarang } = barang;
  return HTTPService.put(
    `${ENDPOINT}/${kodeBarang}`,
    { ...dataBarang },
    CONFIG
  );
};

BarangService.remove = (kodeBarang) => {
  return HTTPService.delete(`${ENDPOINT}/${kodeBarang}`, CONFIG);
};

export default BarangService;
