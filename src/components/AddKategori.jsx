import { useState } from "react";
import { addKategori } from "../api/kategori";
import PropTypes from 'prop-types';

export default function AddKategori({onKategoriAdded}) {
    const [showModal,setShowModal] = useState(false)
    const [KategoriInput, setKategoriInput] = useState("")
    const handleSubmit = async (e)=>{
          e.preventDefault()
          try {
              await addKategori(KategoriInput);
              setShowModal(false)
              onKategoriAdded(true)
              // console.log(data)
            } catch (error) {
              onKategoriAdded(false)
              // console.log(error)
          }
      }
  return (
    <>
     <button className="btn btn-primary" onClick={()=>{setShowModal(true); setKategoriInput("")}}>Add Kategori</button>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={showModal}/>
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Kategori</h3>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full " value={KategoriInput} onChange={(e) => setKategoriInput(e.target.value)} />
          <div className="modal-action">
            <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Tambah Kategori</button>
            <button className="btn" onClick={()=>setShowModal(false)}>Close</button>
          </div>
        </div>
      </div>
 
    </>
  )
}
AddKategori.propTypes = {
    onKategoriAdded: PropTypes.func.isRequired
  };
