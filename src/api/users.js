import axios from "axios";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT

export const getUsers = async () => {
  const auth = await axios.get(`${endpoint}/users`);
  return auth;
};

export const logout = async (id) => {
  const data = await axios.post(`${endpoint}/logout`,{
    id
  });
  return data;
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

export const updateRole = async (idUsers,role)=>{
    const data = await axios.put(`${endpoint}/usersrole`,{
      idUsers,
      role
    });
    return data;
}
