import axios from "axios";

const HTTPService = axios.create({
  timeout: 1000,
});

HTTPService.interceptors.request.use((response) => {
  // console.log("Response:", JSON.stringify(response, null, 2));
  document.body.classList.add("loading-indicator");
  return response;
});

HTTPService.interceptors.response.use((response) => {
  document.body.classList.remove("loading-indicator");
  // console.log("Response:", JSON.stringify(response, null, 2));
  if (response.status === 401) {
    window.location.href = "/";
  }
  return response;
});

export default HTTPService;
