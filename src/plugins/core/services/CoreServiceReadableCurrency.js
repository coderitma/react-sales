import {
  CORE_DATA_PROVIDER_CURRENCY,
  CORE_DATA_PROVIDER_LOCALE,
} from "../CoreDataProvider";

const CoreServiceReadableCurrency = (num) => {
  return parseInt(num).toLocaleString(CORE_DATA_PROVIDER_LOCALE, {
    style: "currency",
    currency: CORE_DATA_PROVIDER_CURRENCY,
  });
};

export default CoreServiceReadableCurrency;
