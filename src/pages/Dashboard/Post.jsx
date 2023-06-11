import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { insertArticle } from "../../api/artikel";
import { useEffect } from "react";
import { getKategori } from "../../api/kategori";


const Post = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [kategori, setKategori] = useState("");
  const [image, setImage] = useState();
  const [prolog, setProlog] = useState("");
  const [kategoriData, setKategoriData] = useState([]);
  const [loading, setLoading] = useState(true);

  const insertArtikel = async (e) => {
    e.preventDefault();
    try {
      await insertArticle(title, content, kategori, image);
      // console.log(data)
    } catch (error) {
      // console.log(error)
    }
  };

  // Fungsi untuk menangani perubahan konten editor
  const handleContentChange = (value) => {
    setContent(value);
  };

  const getKategoriData = async () => {
    try {
      const dataKategori = await getKategori();
      setKategoriData(dataKategori.data.data);
      setLoading(false);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    getKategoriData();
  }, []);



  return (
    <>
      <div className="grid grid-cols-1 pl-4 pr-4 h-3/4">
        <form
          action="#"
          encType="multipart/form-data"
          onSubmit={(e) => insertArtikel(e)}
        >
          <div className="grid grid-cols-4 space-y-3">
            <div>Judul</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full col-span-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>Prolog</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full col-span-4"
              value={prolog}
              onChange={(e) => setProlog(e.target.value)}
              required
            />
            <div className="cols-span-full">Kategori</div>
            <select
              name=""
              id=""
              className="select select-primary w-full  col-span-4"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)} required
            >
              {loading ? (
                <option>Loading...</option>
              ) : (
                <>
                  <option>Pilih Kategori...</option>
                  {kategoriData.map((e) => (
                    <option value={e.kategori} key={e.id}>
                      {e.kategori}
                    </option>
                  ))}
                </>
              )}
            </select>
            <div>Gambar</div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary  col-span-4"
              onChange={(e) => setImage(e.target.files[0])}
              required
              multiple
            />
          </div>
          <div>Isi Content</div>
          <div>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, 4, false] }], // Format judul (h1, h2, h3, h4)
                  ["bold", "italic", "underline"], // Format teks (bold, italic, underline, strike)
                  [{ list: "ordered" }, { list: "bullet" }], // Format list (ordered, bullet)
                  ["link"], // Tambahkan tautan
                  ["clean"], // Hapus semua format
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "list",
                "bullet",
                "link",
              ]}
            />
          </div>
          <button className="btn btn-primary w-full mt-2" type="submit">
            Posting
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
