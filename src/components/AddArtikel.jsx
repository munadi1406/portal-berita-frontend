import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { insertArticle } from "../api/artikel";
import { useEffect } from "react";
import { getKategori } from "../api/kategori";
import PropTypes from "prop-types";
import { useRef } from "react";


export default function AddArtikel({ onAdded }) {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [kategori, setKategori] = useState([]);
    const [image, setImage] = useState();
    const [prolog, setProlog] = useState("");
    const [kategoriData, setKategoriData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState()
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef()

    const insertArtikel = async (e) => {
        e.preventDefault();
        // const formatKategori = kategori.join(',')
        try {
            await insertArticle(title, content, prolog, kategori, image);
            setShowModal(false)
            onAdded(true);
        } catch (error) {
            setMsg(error.response.data.msg)
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
        setTitle('')
        setKategori('')
        setProlog('')
        setImage(null)
        setContent('')
    }, []);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false)
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setKategori((prevKategori) => [...prevKategori, value]);
        } else {
            setKategori((prevKategori) => prevKategori.filter((kategori) => kategori !== value));
        }
    };
    return (
        <>
            <button className="btn btn-info" onClick={() => setShowModal(true)}>Add Article</button>

            {showModal && (
                <div className="bg-black/30 w-screen absolute top-0 left-0 h-screen z-20 flex justify-center p-2" onClick={handleOutsideClick}>
                    <form
                        encType="multipart/form-data"
                        className="bg-white w-3/4 rounded-md p-4 overflow-y-auto flex justify-center "
                        onSubmit={(e) => insertArtikel(e)}
                        ref={modalRef}
                    >
                        <div className="h-max w-full">
                            <div className="text-lg font-bold text-right w-full cursor-pointer" onClick={() => setShowModal(false)}>X</div>
                            <h1 className="text-2xl font-bold text-center">Add Artikel</h1>
                            {msg && <div className="text-xs w-full text-red-500 text-center">{msg}</div>}
                            <div className="grid grid-cols-4 space-y-2">
                                <div className="text-lg">Judul</div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-primary w-full col-span-4"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <div className="text-lg">Prolog</div>
                                <textarea
                                    type="text"
                                    placeholder="Type here"
                                    className="textarea textarea-primary w-full col-span-4"
                                    value={prolog}
                                    onChange={(e) => setProlog(e.target.value)}
                                    required
                                />
                                <div className="col-span-4 text-lg">Kategori</div>
                                <div className="col-span-4">
                                    {loading ? (
                                        <option>Loading...</option>
                                    ) : (
                                        kategoriData.map((e) => (
                                            <div key={e.id} className="w-1/4 flex justify-between">
                                                <label htmlFor={e.kategori}>{e.kategori}</label>
                                                <input type="checkbox" className="default:ring-2 ..." onChange={handleChange} value={e.kategori} name={e.kategori} id={e.kategori}/>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="text-lg">Gambar</div>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-primary  col-span-4"
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
                            <button className="btn btn-primary w-full mt-2" type="submit">
                                Posting
                            </button>
                        </div>
                    </form>
                </div>
            )
            }
        </>
    );
}
AddArtikel.propTypes = {
    onAdded: PropTypes.func.isRequired,
};
