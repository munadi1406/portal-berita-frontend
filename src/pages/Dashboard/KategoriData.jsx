import { useState } from "react"
import { addKategori, deleteKategori, getKategori } from "../../api/kategori"
import { useEffect } from "react"


export default function KategoriData() {
  const [kategori, setKategori] = useState([])
  const [showModal,setShowModal] = useState(false)

  const getKategoriData = async () => {
    try {
      const kategoriData = await getKategori()
      setKategori(kategoriData.data.data);
    } catch (error) { /* empty */ }
  }

  const [KategoriInput, setKategoriInput] = useState("")
  const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            await addKategori(KategoriInput);
            setShowModal(false)
            getKategoriData()
            // console.log(data)
        } catch (error) {
            // console.log(error)
        }
    }

  useEffect(() => {
    getKategoriData()
  }, [])

  const handleHapus = async(e)=>{
    try {
      const hapus = await deleteKategori(e)
      console.log(hapus)
      getKategoriData()
    } catch (error) { /* empty */ }
  }

  return (
    <div>
      {/* <AddKategori/> */}
      
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



      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              kategori.map((e,i) => (
                <tr className="hover" key={e.id}>
                  <th>{i + 1}</th>
                  <td>{e.kategori}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-success">Edit</button>
                      <button className="btn btn-warning" onClick={()=>handleHapus(e.id)}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
