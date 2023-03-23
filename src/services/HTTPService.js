import axios from "axios";

const HTTPService = axios.create({
  timeout: 1000,
});

HTTPService.interceptors.response.use((response) => {
  // console.log("Response:", JSON.stringify(response, null, 2));
  if (response.status === 401) {
    window.location.href = "/";
  }
  return response;
});

export default HTTPService;
