import axios from "axios";


const url = 'http://localhost:3000/' //localUrl;

// const url = 'https://proyecto-1-backend-iota.vercel.app/' //cloudUrl
console.log((await axios.get(url)).data)

const axiosInstance = axios.create({
  baseURL: url + 'api/v1/',
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,

});

export default axiosInstance;
