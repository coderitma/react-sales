import axios from "axios";
import config from "../config";
import UserService from "./UserService";

const conf = {
  headers: {
    "x-access-token": UserService.getToken(),
  },
};

const list = () => {
  return axios.get(`${config.API_BASE_URL}${config.API_ENDPOINT_BARANG}`, conf);
};

const create = (payload) => {
  return axios.post(
    `${config.API_BASE_URL}${config.API_ENDPOINT_BARANG}`,
    {
      ...payload,
    },
    conf
  );
};

const get = (kodeBarang) => {
  return axios.get(
    `${config.API_BASE_URL}${config.API_ENDPOINT_BARANG}/${kodeBarang}`,
    conf
  );
};

const edit = (barang) => {
  const { kodeBarang, ...dataBarang } = barang;
  return axios.put(
    `${config.API_BASE_URL}${config.API_ENDPOINT_BARANG}/${kodeBarang}`,
    {
      ...dataBarang,
    },
    conf
  );
};

const remove = (kodeBarang) => {
  return axios.delete(
    `${config.API_BASE_URL}${config.API_ENDPOINT_BARANG}/${kodeBarang}`,
    conf
  );
};

export default {
  list,
  create,
  get,
  edit,
  remove,
};
