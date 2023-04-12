import { CORE_DATA_PROVIDER_EXCEL_EXT } from "../CoreDataProvider";

const CoreServiceExportBlob = (response, resolver, filename) => {
  const href = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute(
    "donwload",
    `${filename}-${new Date().getTime()}${CORE_DATA_PROVIDER_EXCEL_EXT}`
  );
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(href);
  resolver(true);
};

export default CoreServiceExportBlob;
