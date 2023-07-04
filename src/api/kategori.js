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


export const getKategori = async () => {
  const data = await axios.get(`${endpoint}/kategori`);
  return data;
};


export const addKategori = async (kategori) => {
  const data = await axiosJWT.post(`${endpoint}/kategori`,{
    kategori
  });
  return data;
};

export const editKategori = async (id,kategori) => {

  const data = await axiosJWT.put(`${endpoint}/kategori`,{
    id,
    kategori
  });
  return data;
};


export const deleteKategori = async (id) => {
  const data = await axiosJWT.delete(`${endpoint}/kategori/${id}`);
  return data;
};