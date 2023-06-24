import axios from "axios";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT

export const getKategori = async () => {
  const data = await axios.get(`${endpoint}/kategori`);
  return data;
};


export const addKategori = async (kategori) => {
  const data = await axios.post(`${endpoint}/kategori`,{
    kategori
  });
  return data;
};

export const editKategori = async (id,kategori) => {

  const data = await axios.put(`${endpoint}/kategori`,{
    id,
    kategori
  });
  return data;
};


export const deleteKategori = async (id) => {
  const data = await axios.delete(`${endpoint}/kategori/${id}`);
  return data;
};