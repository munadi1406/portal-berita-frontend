import axios from "axios";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT

export const getUsers = async () => {
  const auth = await axios.get(`${endpoint}/users`);
  return auth;
};


export const deleteUsers = async (id)=>{
    const auth = await axios.delete(`${endpoint}/users/${id}`);
    return auth;
}



export const updateUsernameUsers = async (idUsers,username)=>{
    const auth = await axios.put(`${endpoint}/usersupdateusername`,{
      idUsers,
      username,
    });
    return auth;
}


export const updatePasswordUsers = async (idUsers,password)=>{
    const auth = await axios.put(`${endpoint}/usersupdatepassword`,{
      idUsers,
      password,
    });
    return auth;
}