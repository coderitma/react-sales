import axios from "axios";
import config from "../../../config";
import AuthService from "../../auth/services/AuthService";

const conf = {
  headers: {
    "x-access-token": AuthService.getToken(),
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
  const { kodePemasok, ...dataPemasok } = pemasok;
  return axios.put(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}/${kodePemasok}`,
    { ...dataPemasok },
    conf
  );
};

const remove = (kodePemasok) => {
  return axios.delete(
    `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}/${kodePemasok}`,
    conf
  );
};

const removeAll = (pilihPemasok) => {
  let tasks = [];
  for (let kodePemasok of pilihPemasok) {
    tasks.push(
      axios.delete(
        `${config.API_BASE_URL}${config.API_ENDPOINT_PEMASOK}/${kodePemasok}`,
        conf
      )
    );
  }

  return axios.all(tasks);
};

export default { list, create, edit, remove, get, removeAll };
