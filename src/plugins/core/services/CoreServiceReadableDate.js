import {
  CORE_DATA_PROVIDER_DATE_OPTION,
  CORE_DATA_PROVIDER_LOCALE,
  CORE_DATA_PROVIDER_TIMEZONE,
} from "../CoreDataProvider";

const CoreServiceReadableDate = (date) => {
  let d = new Date(Date.parse(date));
  return d.toLocaleDateString(CORE_DATA_PROVIDER_LOCALE, {
    timeZone: CORE_DATA_PROVIDER_TIMEZONE,
    ...CORE_DATA_PROVIDER_DATE_OPTION,
  });
};

export default CoreServiceReadableDate;
