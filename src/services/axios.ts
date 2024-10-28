import axios from "axios";


const host = 'http://localhost:3000' //localUrl;
// const host = 'https://proyecto-1-backend-iota.vercel.app' //cloudUrl


export function checkLocalTokenValidity() {
  const token = localStorage.getItem('token');
  if (!token) return false

  if (token.length < 20) return false

  return true
}

export const axiosInstance = axios.create({
  baseURL: host + '/api/v1/',
  headers: {
    "content-type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
  if (checkLocalTokenValidity())
  {
    const token = localStorage.getItem('token');
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
