import axios from "axios";

export default function () {
  return axios.create({
    baseURL: "https://localhost:3000",
    timeout: 8000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Credentials": true,
    },
  });
}
