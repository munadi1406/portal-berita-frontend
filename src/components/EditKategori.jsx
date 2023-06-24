import { useContext } from "react";
import FunctionContext from "./FunctionContext";
import { useState } from "react";

const EditKategori = () => {
  const {setUpdate,valueKategori,updateKategori,updateStatus,msg } = useContext(FunctionContext);
  const [kategoriInput, setKategoriInput] = useState('');
    const [buttonDisable,setButtonDisable] = useState(true)


    const handleChange = (e)=>{
        setKategoriInput(e.target.value)
        if(e.target.value !== valueKategori.kategori){
            return setButtonDisable(false)
        }
        setButtonDisable(true)
    }


    const handleClick = ()=>{
        updateKategori(valueKategori.id,kategoriInput)
    }


  return (
      <>
        <div className={`modal modal-open`}>
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg">Kategori</h3>
            <div className="text-xs text-red-500">{msg}</div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-full "
              defaultValue={valueKategori.kategori}
              onChange={handleChange}
            />
            <div className="modal-action">
              <button className="btn btn-info text-base-100" disabled={buttonDisable} onClick={handleClick} type="submit">
                {updateStatus ? 'loading...' :'Edit Kategori'}
              </button>
            </div>
          </div>
          <label
            className="modal-backdrop"
            htmlFor="my_modal_7"
            onClick={() => setUpdate(false)}
          >
            Close
          </label>
        </div>
      </>
  );
};

export default EditKategori;
