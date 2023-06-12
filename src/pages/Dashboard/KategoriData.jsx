import { useState } from "react"
import { deleteKategori, getKategori } from "../../api/kategori"
import { useEffect } from "react"
import AddKategori from "../../components/AddKategori"


export default function KategoriData() {
  const [kategori, setKategori] = useState([])
  const [isKategoriAdded, setIsKategoriAdded] = useState(false);

  const getKategoriData = async () => {
    try {
      const kategoriData = await getKategori()
      setKategori(kategoriData.data.data);
    } catch (error) { /* empty */ }
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

  const handleKategoriAdded = (isAdded) => {
    setIsKategoriAdded(isAdded);
  };

  useEffect(()=>{
    getKategoriData()
  },[isKategoriAdded])

  return (
    <div>
    <AddKategori onKategoriAdded={handleKategoriAdded}/>

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
