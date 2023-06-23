import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getLog = async (page) => {
  const data = await axios.get(`${endpoint}/log/${page}`);
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
