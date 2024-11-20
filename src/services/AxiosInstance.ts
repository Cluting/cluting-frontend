import axios from "axios";

export const Instance = axios.create({
  baseURL: "http://52.78.93.170:8080/api/v1"
});
