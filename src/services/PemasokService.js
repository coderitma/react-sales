import axios from "axios";
import config from "../config";
import AuthService from "./AuthService";

const ENDPOINT = `${config.BASE_URL}/pemasok`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const list = () => {
  return axios.get(ENDPOINT, CONFIG);
};

const create = (pemasok) => {
  return axios.post(ENDPOINT, { ...pemasok }, CONFIG);
};

const get = (kodePemasok) => {
  return axios.get(`${ENDPOINT}/${kodePemasok}`, CONFIG);
};

const edit = (pemasok) => {
  const { kodePemasok, ...dataPemasok } = pemasok;
  return axios.put(`${ENDPOINT}/${kodePemasok}`, { ...dataPemasok }, CONFIG);
};

const remove = (kodePemasok) => {
  return axios.delete(`${ENDPOINT}/${kodePemasok}`, CONFIG);
};

export default { list, create, edit, remove, get };
