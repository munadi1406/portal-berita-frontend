import axios from "axios";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT

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


