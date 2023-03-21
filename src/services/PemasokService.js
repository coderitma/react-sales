import axios from "axios";
import config from "../config";
import UserService from "./UserService";

const conf = {
  headers: {
    "x-access-token": UserService.getToken(),
  },
};

const list = () => {
  return axios.get(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}`,
    conf
  );
};

const create = (pemasok) => {
  return axios.post(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}`,
    { ...pemasok },
    conf
  );
};

const get = (kodePemasok) => {
  return axios.get(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}/${kodePemasok}`,
    conf
  );
};

const edit = (pemasok) => {
  const { kodePemasok, ...pemasok } = pemasok;
  return axios.put(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}/${kodePemasok}`,
    { ...pemasok },
    conf
  );
};

const remove = (kodePemasok) => {
  return axios.delete(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}/${kodePemasok}`,
    conf
  );
};

export default { list, create, edit, remove, get };
