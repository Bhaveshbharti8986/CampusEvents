import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3301/api",
  withCredentials: true
});

export default API;
