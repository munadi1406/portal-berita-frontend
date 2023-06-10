import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getKategori = async () => {
  const data = await axios.get(`${endpoint}/kategori`);
  return data;
};

