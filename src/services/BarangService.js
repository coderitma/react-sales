import axios from "axios";
import config from "../config";
import AuthService from "./AuthService";

const ENDPOINT = `${config.BASE_URL}/barang`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const list = () => {
  return axios.get(ENDPOINT, CONFIG);
};

const create = (barang) => {
  return axios.post(ENDPOINT, { ...barang }, CONFIG);
};

const get = (kodeBarang) => {
  return axios.get(`${ENDPOINT}/${kodeBarang}`, CONFIG);
};

const edit = (barang) => {
  const { kodeBarang, ...dataBarang } = barang;
  return axios.put(`${ENDPOINT}/${kodeBarang}`, { ...dataBarang }, CONFIG);
};

const remove = (kodeBarang) => {
  return axios.delete(`${ENDPOINT}/${kodeBarang}`, CONFIG);
};

export default { list, create, get, edit, remove };
