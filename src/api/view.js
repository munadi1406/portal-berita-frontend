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

export const getViewGroupById = async (id) => {
  const data = await axiosJWT.get(`${endpoint}/view/${id}`);
  return data;
};


export const getViewByMonth = async (id) => {
  const data = await axiosJWT.get(`${endpoint}/viewByMonth/${id}`);
  return data;
};


export const getViewByWeek = async (id) => {
  const data = await axiosJWT.get(`${endpoint}/viewByWeek/${id}`);
  return data;
};


export const postView = async (artikelId,date) => {
  const data = await axiosJWT.post(`${endpoint}/view`,{
    artikelId,
    date
  });
  return data;
};


export const totalPostAndView = async (id) => {
  const data = await axiosJWT.get(`${endpoint}/totalpostandview/${id}`);
  return data;
};