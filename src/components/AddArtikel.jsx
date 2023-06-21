import { useState, useRef, useEffect, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { insertArticle } from "../api/artikel";
import { getKategori } from "../api/kategori";
import jwtDecodeId from "./../utils/jwtDecodeId";
import FunctionContext from "./FunctionContext";

export default function AddArtikel() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [kategori, setKategori] = useState([]);
  const [image, setImage] = useState();
  const [prolog, setProlog] = useState("");
  const [kategoriData, setKategoriData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState();
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();
  const { idUsers } = jwtDecodeId();
  const { onAddedArtikel } = useContext(FunctionContext);
  const [insertLoading,setInsertLoading] = useState(false);
  

  const insertArtikel = async (e) => {
    e.preventDefault();
    setInsertLoading(true)
    const formatKategori = kategori.join(",");
    try {
      const addArtikel = await insertArticle(
        idUsers,
        title,
        content,
        prolog,
        formatKategori,
        image
      );
      console.log(addArtikel);
      onAddedArtikel(addArtikel.data.msg);
      setShowModal(false);
    } catch (error) {
      setMsg(error.response.data.msg);
      onAddedArtikel(error.response.data.message);
    }finally{
        setInsertLoading(false)
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

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setKategori((prevKategori) => [...prevKategori, value]);
    } else {
      setKategori((prevKategori) =>
        prevKategori.filter((kategori) => kategori !== value)
      );
    }
  };

  const clear = () => {
    setContent("");
    setTitle("");
    setKategori([]);
    setImage("");
    setProlog("");
  };

  return (
    <>
      <button
        className="btn btn-info text-white"
        onClick={() => {
          setShowModal(true);
          clear();
          setMsg("");
        }}
      >
        Add Article
      </button>
      {showModal && (
        <div
          className="bg-black/60 w-full absolute top-0 left-0 h-full z-20 flex justify-center p-2"
          onClick={handleOutsideClick}
        >
          <form
            encType="multipart/form-data"
            className="bg-white w-3/4 rounded-md p-4 overflow-y-auto flex justify-center "
            onSubmit={(e) => insertArtikel(e)}
            ref={modalRef}
          >
            <div className="h-max w-full">
              <div
                className="text-lg font-bold text-right w-full cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                X
              </div>
              <h1 className="text-2xl font-bold text-center">Add Artikel</h1>
              {msg && (
                <div className="text-xs w-full text-red-500 text-center">
                  {msg}
                </div>
              )}
              <div className="grid grid-cols-4 space-y-2">
                <div className="text-lg">Judul</div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered input-info w-full col-span-4"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <div className="text-lg">Prolog</div>
                <textarea
                  type="text"
                  placeholder="Type here"
                  className="textarea textarea-info w-full col-span-4"
                  value={prolog}
                  onChange={(e) => setProlog(e.target.value)}
                  required
                />
                <div className="col-span-4 text-lg">Kategori</div>
                <div className="col-span-4 flex flex-wrap">
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    kategoriData.map((e) => (
                      <div
                        key={e.id}
                        className="w-1/4 flex justify-between border"
                      >
                        <label htmlFor={e.kategori}>{e.kategori}</label>
                        <input
                          type="checkbox"
                          className="default:ring-2 ..."
                          onChange={handleChange}
                          value={e.kategori}
                          name={e.kategori}
                          id={e.kategori}
                        />
                      </div>
                    ))
                  )}
                </div>
                <div className="text-lg">Gambar</div>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-info  col-span-4"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                  accept="image/png, image/jpeg, image/webp"
                />
                <div className="text-lg w-full col-span-full">Isi Content</div>
                <div className="col-span-full">
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
              </div>
              <button
                className="btn btn-info w-full mt-2 text-white"
                disabled={kategoriData.length <= 0}
                type="submit"
              >
               {insertLoading ? "Loading...": "Posting"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
