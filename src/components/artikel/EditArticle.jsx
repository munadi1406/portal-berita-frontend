import { useState, useEffect, useContext } from "react";
import { getKategori } from "../../api/kategori";
import FunctionContext from "../FunctionContext";
import ReactQuill from "react-quill";
import pisahKategori from "../../utils/pisahKategori";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const EditArticle = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [kategori, setKategori] = useState([]);
    const [image, setImage] = useState();
    const [prolog, setProlog] = useState("");
    const [kategoriData, setKategoriData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const [kategoriArray, setKategoriArray] = useState([])

    const { isEdit, handleEdit, dataEdit, updateArtikel, msg, setMsg } = useContext(FunctionContext)

    const insertArtikel = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true)
        try {
            await updateArtikel(dataEdit.artikelId, title, content, prolog, image, kategori)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingUpdate(false)
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
        setMsg('')
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            // Tambahkan ke kategori jika belum ada
            if (!kategoriArray.includes(value)) {
                setKategori((prevKategori) => [...prevKategori, value]);
            }
        } else {
            // Hapus dari kategori jika ada
            setKategori((prevKategori) =>
                prevKategori.filter((kategori) => kategori !== value)
            );
        }
    };

    useEffect(() => {
        setKategoriArray([])
        setKategori([])
    }, [isEdit])

    useEffect(() => {
        const dataKategori = dataEdit.kategori
        if (dataKategori) {
            const kategoriAr = pisahKategori(dataKategori).map((e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase());
            setKategoriArray(kategoriAr)
        }
        setTitle(dataEdit.title);
        setContent(dataEdit.content)
        setProlog(dataEdit.prolog)
    }, [dataEdit])

    useEffect(() => {
        setKategori(kategoriArray)
    }, [kategoriArray])
    return (
        <>
            {isEdit && (
                <div
                    className="bg-black/60 w-full absolute top-0 left-0 h-full z-20 flex justify-center p-2"
                >
                    <div className="bg-base-200 rounded-md overflow-y-auto grid grid-cols-3">
                    <div
                        className="text-lg font-bold text-right w-full cursor-pointer col-span-full"
                        onClick={handleEdit}
                    >
                        X
                    </div>

                        <form
                            encType="multipart/form-data"
                            className=" p-4  flex justify-center col-span-2 border"
                            onSubmit={(e) => insertArtikel(e)}

                        >
                            <div className="h-max w-full">
                                <h1 className="text-2xl font-bold text-center">Edit {dataEdit.title}</h1>
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
                                        className="input input-bordered input-info w-full col-span-4 bg-base-200"
                                        defaultValue={dataEdit.title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                    <div className="text-lg">Prolog</div>
                                    <textarea
                                        type="text"
                                        placeholder="Type here"
                                        className="textarea textarea-info w-full col-span-4 bg-base-200"
                                        defaultValue={dataEdit.prolog}
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
                                                        className=""
                                                        onClick={handleChange}
                                                        value={e.kategori}
                                                        name={e.kategori}
                                                        id={e.kategori}
                                                        defaultChecked={kategoriArray.find((x) => x === e.kategori.toLowerCase().charAt(0).toUpperCase() + e.kategori.toLowerCase().slice(1))}
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="text-lg">Gambar</div>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered file-input-info col-span-4 bg-base-200"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/png, image/jpeg, image/webp"
                                    />
                                    <div className="text-lg w-full col-span-full">Isi Content</div>
                                    <div className="col-span-full">
                                        <ReactQuill
                                            defaultValue={dataEdit.content}
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
                                    {loadingUpdate ? 'Loading...' : 'Update'}
                                </button>
                                <button onClick={handleEdit}
                                    className="btn btn-accent w-full mt-2 text-white"
                                    type="reset"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                        <div className="col-span-1 pt-10 pl-2 pr-2">

                            <div className="sticky top-0">
                                <div className="text-3xl font-sans">Gambar Sebelumnya</div>
                                <LazyLoadImage src={dataEdit.image} className="rounded-md" alt={dataEdit.title} effect="blur"/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditArticle