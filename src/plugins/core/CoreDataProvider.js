export const CORE_DATA_PROVIDER_BASE_URL =
  process.env.PROD === "1" ? "" : "http://localhost:3000";

export const CORE_DATA_PROVIDER_DATE_OPTION = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const CORE_DATA_PROVIDER_LOCALE = "id-ID";
export const CORE_DATA_PROVIDER_TIMEZONE = "Asia/Jakarta";
export const CORE_DATA_PROVIDER_CURRENCY = "IDR";
export const CORE_DATA_PROVIDER_EXCEL_EXT = ".xlsx";
export const CORE_DATA_PROVIDER_CLASS_LOADING_INDICATOR = "loading-indicator";
export const CORE_DATA_PROVIDER_TIMEOUT = 1000;
export const CORE_DATA_PROVIDER_TOKEN_KEY = "token";
export const CORE_DATA_PROVIDER_TOKEN_HEADER = "x-access-token";
export const CORE_DATA_PROVIDER_BAD_REQUEST = "ERR_BAD_REQUEST";
export const CORE_DATA_PROVIDER_STATUS_401 = 401;
