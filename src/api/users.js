import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getUsers = async () => {
  const auth = await axios.get(`${endpoint}/users`);
  return auth;
};


export const deleteUsers = async (id)=>{
    const auth = await axios.delete(`${endpoint}/users/${id}`);
    return auth;
}