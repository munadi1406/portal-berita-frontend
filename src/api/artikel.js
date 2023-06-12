import axios from "axios";

const endpoint = "https://portal-berita-backend.fathullahmunadi.repl.co";

export const getArtikel = async (page) => {
  const data = await axios.get(`${endpoint}/artikelpost/${page}`);
  return data;
};

export const artikelByTitle = async (title) => {
  const data = await axios.get(`${endpoint}/artikel/${title}`);

  return data;
};

export const insertArticle = async (title, content,prolog, kategori, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('kategori', kategori);
    formData.append('prolog', prolog);
    formData.append('image', image);

    const response = await axios.post(`${endpoint}/artikel`, formData);
    return response;
};
