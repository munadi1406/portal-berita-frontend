import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getLog = async () => {
  const auth = await axios.get(`${endpoint}/log`);
  return auth;
};


export const addLog = async (ipAddres,browser,currentPage) => {
  const auth = await axios.post(`${endpoint}/log`,{
    ipAddres,
    browser,
    currentPage
  });
  return auth;
};