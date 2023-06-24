import { useState ,useContext} from "react";
import { addKategori } from "../api/kategori";
import FunctionContext from "./FunctionContext";

export default function AddKategori() {
  const [showModal, setShowModal] = useState(false);
  const [KategoriInput, setKategoriInput] = useState("");
  const [msg,setMsg] = useState('')
  const {handleKategoriAdded} = useContext(FunctionContext)
  const [loading,setLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const insertKategrori = await addKategori(KategoriInput);
      setShowModal(false);
      handleKategoriAdded(insertKategrori.data.msg);
    } catch (error) {
      setMsg(error.response.data.msg)
    }finally{
      setLoading(false)
    }
  };


  const handleClick = () => {
    setKategoriInput('')
    setMsg('')
    setShowModal(!showModal);
  };

  return (
    <>
      <label htmlFor="my_modal_7" className="btn btn-info text-base-100" onClick={handleClick}>
        Add Kategori
      </label>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />
      <div className="modal">
        <div className="modal-box space-y-4">
          <h3 className="font-bold text-lg">Kategori</h3>
          <div className="text-xs text-red-500">{msg}</div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full "
            value={KategoriInput}
            onChange={(e) => setKategoriInput(e.target.value)}
          />
          <div className="modal-action">
            <button
              className="btn btn-info text-base-100"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              {loading?'Loading...':'Tambah Kategori'}
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7" onClick={handleClick}>
          Close
        </label>
      </div>
    </>
  );
}
