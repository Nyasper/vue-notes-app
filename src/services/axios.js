import axios from "axios";


// const host = 'http://localhost:3000' //localUrl;
const host = 'https://proyecto-1-backend-iota.vercel.app' //cloudUrl

export const axiosInstance = axios.create({
  baseURL: host + '/api/v1/',
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});
