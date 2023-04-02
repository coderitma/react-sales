import config from "../config";
import AuthService from "./AuthService";
import HTTPService from "./HTTPService";

const ENDPOINT = `${config.BASE_URL}/reporting`;
const CONFIG = {
  headers: {
    "x-access-token": AuthService.getToken(),
  },
};

const ReportingService = {};

ReportingService.list = (query) => {
  CONFIG.params = query;
  return HTTPService.get(ENDPOINT, CONFIG);
};

ReportingService.create = (payload) => {
  CONFIG.query = null;
  return HTTPService.post(`${ENDPOINT}/pembelian`, { ...payload }, CONFIG);
};

ReportingService.delete = (reporting) => {
  CONFIG.params.query = {};
  return HTTPService.delete(`${ENDPOINT}/${reporting.id}`, CONFIG);
};

ReportingService.download = (reporting) => {
  CONFIG.query = null;
  return new Promise((resolve, reject) => {
    HTTPService({
      url: `${ENDPOINT}/unduh`,
      method: "POST",
      responseType: "blob",
      headers: CONFIG.headers,
      data: {
        path: reporting.path,
      },
    })
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${reporting.jenis}_${new Date().getTime()}.xlsx`
        );
        document.body.appendChild(link);
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default ReportingService;
