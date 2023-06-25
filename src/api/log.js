import axios from "axios";
import Cookies from "js-cookie";
import { newAccessToken } from "./users";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  function (config) {
    const at = Cookies.get("at");
    config.headers["Authorization"] = `Bearer ${at}`;
    return config;
  },
  function (error) {
    // Do something with request error
    console.log({ error });
    return Promise.reject(error);
  }
);

axiosJWT.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 403) {
      await newAccessToken();
      const originalRequest = error.config;
      return await axiosJWT(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getLog = async (page) => {
  const data = await axiosJWT.get(`${endpoint}/log/${page}`);
  return data;
};

export const addLog = async (currentPage) => {
  const res = await axios.get("https://ipapi.co/json/");
  const ip = res.data.ip;
  const city = res.data.city;
  const region = res.data.region;
  const country = res.data.country_name;
  const browser = window.navigator.userAgent;
  const data = await axios.post(`${endpoint}/log`, {
    ipAddress: ip,
    browser,
    currentPage,
    city,
    region,
    country,
  });
  return data;
};
