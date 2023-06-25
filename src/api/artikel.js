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

export const getArtikel = async (page) => {
  const data = await axios.get(`${endpoint}/artikelpost/${page}`);
  return data;
};

export const getArtikelById = async (id) => {
  const data = await axiosJWT.get(`${endpoint}/artikelById/${id}`);
  return data;
};

export const artikelByTitle = async (title) => {
  const data = await axios.get(`${endpoint}/artikel/${title}`);

  return data;
};


export const artikelByKategori = async (kategori,page) => {
  const data = await axios.get(`${endpoint}/artikelByKategori/${kategori}/${page}`);

  return data;
};

export const deleteArtikel = async (id) => {
  const data = await axiosJWT.delete(`${endpoint}/artikel/${id}`);

  return data;
};

export const insertArticle = async (id,title, content,prolog, kategori, image) => {
    const formData = new FormData();
    formData.append('publisherId', id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('kategori', kategori);
    formData.append('prolog', prolog);
    formData.append('image', image);
    const response = await axiosJWT.post(`${endpoint}/artikel`, formData);
    return response;
};


export const updateArticle = async (artikelId,title,content,prolog,kategori,image,) => {
    const formData = new FormData();
    formData.append('artikelId', artikelId);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('kategori', kategori);
    formData.append('prolog', prolog);
    formData.append('image', image);
    const response = await axiosJWT.put(`${endpoint}/artikel`, formData);
    return response;
};



