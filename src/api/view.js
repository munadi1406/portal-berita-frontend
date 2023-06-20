import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getViewGroupById = async (id) => {
  const data = await axios.get(`${endpoint}/view/${id}`);
  return data;
};


export const getViewByMonth = async () => {
  const data = await axios.get(`${endpoint}/viewbymonth`);
  return data;
};



export const postView = async (artikelId,date) => {
  const data = await axios.post(`${endpoint}/view`,{
    artikelId,
    date
  });
  return data;
};