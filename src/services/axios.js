import axios from "axios";

//localUrl;
// const url = 'http://localhost:3000/'


//cloudUrl
const url = 'https://proyecto-1-backend-iota.vercel.app/'
const axiosInstance = axios.create({
  baseURL: url + 'api/v1/',
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,

});

export default axiosInstance;
