import config from "../config";
import { helperHandlerExportResponse } from "../utils/helpers";
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

PembelianService.reportPeriodExcel = (data) => {
  CONFIG.query = null;

  return new Promise((resolve, reject) => {
    HTTPService({
      url: `${ENDPOINT}/report/period/excel`,
      method: "POST",
      responseType: "blob",
      headers: CONFIG.headers,
      data,
    })
      .then((response) => {
        helperHandlerExportResponse(response, resolve, "REPORT-PEMBELIAN");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

PembelianService.fakturPrint = (faktur) => {
  CONFIG.query = null;

  return new Promise((resolve, reject) => {
    HTTPService({
      url: `${ENDPOINT}/${faktur}/print/excel`,
      method: "POST",
      responseType: "blob",
      headers: CONFIG.headers,
    })
      .then((response) =>
        helperHandlerExportResponse(response, resolve, "FAKTUR")
      )
      .catch((error) => {
        reject(error);
      });
  });
};

export default PembelianService;
