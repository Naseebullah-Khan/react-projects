import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://redux-toolkit-jobster-api-server.onrender.com/api/v1",
  timeout: 10000,
});

export default customFetch;
