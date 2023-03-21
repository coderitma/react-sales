const config = {
  API_BASE_URL: "http://localhost:3000", // ketika proxy diaktifkan untuk menangani cors, setup self host di sini.
  API_ENDPOINT_LOGIN: "/users/login",
  API_ENDPOINT_CHECK_TOKEN: "/hello/world",
  API_ENDPOINT_BARANG: "/barang",
  TOAST_WARNING: {
    TEXT: "Warning",
    ICON: "https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/24/Warning-icon.png",
  },
  TOAST_INFO: {
    TEXT: "Info",
    ICON: "https://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/24/information-icon.png",
  },
  TOAST_DANGER: {
    TEXT: "Upssss!",
    ICON: "https://icons.iconarchive.com/icons/martz90/circle-addon2/24/warning-icon.png",
  },
  TOAST_SUCCESS: {
    TEXT: "Success",
    ICON: "https://icons.iconarchive.com/icons/itweek/knob-toolbar/24/Knob-Valid-Green-icon.png",
  },
  KEY_LOCAL_STORAGE_TOKEN: "TOKEN",
  ACTIVITY: {
    EDIT: "EDIT",
    DELETE: "DELETE",
    ADD: "ADD",
    GET: "GET",
  },
};

export default config;
