import axios from "axios";
import Cookies from "js-cookie";

const endpoint = import.meta.env.VITE_SOME_ENDPOINT;


export const newAccessToken = async () => {
  const rt = Cookies.get("rt");
  const { data } = await axios.post(`${endpoint}/newaccesstoken`, {
    refreshToken: rt,
  });
  Cookies.set("at", data.accessToken);
};

const axiosJWT = axios.create();
axiosJWT.interceptors.request.use(
  function (config) {
    const at = Cookies.get("at");
    config.headers["Authorization"] = `Bearer ${at}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosJWT.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 403) {
      await newAccessToken();
      const originalRequest = error.config;
      return await axiosJWT(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getUsers = async () => {
  const auth = await axiosJWT.get(`${endpoint}/users`);
  return auth;
};

export const logout = async (id) => {
  const data = await axiosJWT.post(`${endpoint}/logout`, {
    id,
  });
  return data;
};

export const deleteUsers = async (id) => {
  const auth = await axiosJWT.delete(`${endpoint}/users/${id}`);
  return auth;
};

export const updateUsernameUsers = async (idUsers, username) => {
  const auth = await axiosJWT.put(`${endpoint}/usersupdateusername`, {
    idUsers,
    username,
  });
  return auth;
};

export const updatePasswordUsers = async (idUsers, password) => {
  const auth = await axiosJWT.put(`${endpoint}/usersupdatepassword`, {
    idUsers,
    password,
  });
  return auth;
};

export const updateRole = async (idUsers, role) => {
  const data = await axiosJWT.put(`${endpoint}/usersrole`, {
    idUsers,
    role,
  });
  return data;
};
