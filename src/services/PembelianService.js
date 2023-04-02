import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const PembelianService = {};
const ENDPOINT = `${config.BASE_URL}/pembelian`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

PembelianService.list = (query) => {
  CONFIG.params = query;
  return HTTPService.get(ENDPOINT, CONFIG);
};

PembelianService.create = (pembelian) => {
  return HTTPService.post(ENDPOINT, { ...pembelian }, CONFIG);
};

PembelianService.get = (faktur) => {
  CONFIG.params = {};
  return HTTPService.get(`${ENDPOINT}/${faktur}`, CONFIG);
};

PembelianService.reporting = (query) => {
  CONFIG.params = query;
  return HTTPService.get(`${config.BASE_URL}/reporting/pembelian`, CONFIG);
};

export default PembelianService;
