import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

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
export const deleteKategori = async (id) => {
  const data = await axios.delete(`${endpoint}/kategori/${id}`);
  return data;
};