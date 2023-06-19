import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const login = async (email, password) => {
  const auth = await axios.post(`${endpoint}/login`, {
      email,
      password,
  });
  return auth;
};


export const register = async (username,email,password,confirmPassword) => {
  const registerHit = await axios.post(`${endpoint}/register`, {
      username,
      email,
      password,
      confirmPassword
  });
  return registerHit;
};


