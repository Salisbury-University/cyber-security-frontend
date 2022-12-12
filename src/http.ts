import axios from "axios";

export default function () {
  return axios.create({
    baseURL: "http://localhost:3000",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });
}
