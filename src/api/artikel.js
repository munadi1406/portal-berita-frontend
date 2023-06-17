import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getArtikel = async (page) => {
  const data = await axios.get(`${endpoint}/artikelpost/${page}`);
  return data;
};

export const getArtikelById = async (id,page) => {
  const data = await axios.get(`${endpoint}/artikelById/${id}/${page}`);
  return data;
};

export const artikelByTitle = async (title) => {
  const data = await axios.get(`${endpoint}/artikel/${title}`);

  return data;
};


export const artikelByKategori = async (kategori,page) => {
  const data = await axios.get(`${endpoint}/artikelByKategori/${kategori}/${page}`);

  return data;
};

export const deleteArtikel = async (id) => {
  const data = await axios.delete(`${endpoint}/artikel/${id}`);

  return data;
};

export const insertArticle = async (id,title, content,prolog, kategori, image) => {
    const formData = new FormData();
    formData.append('publisherId', id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('kategori', kategori);
    formData.append('prolog', prolog);
    formData.append('image', image);
    const response = await axios.post(`${endpoint}/artikel`, formData);
    return response;
};



