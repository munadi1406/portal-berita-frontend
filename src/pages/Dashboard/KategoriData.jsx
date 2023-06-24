import { useState, useEffect ,useRef} from "react";
import { deleteKategori, editKategori, getKategori } from "../../api/kategori";
import AddKategori from "../../components/AddKategori";
import PropTypes from "prop-types";
import HelmetTitle from "../../utils/HelmetTitle";
import Modal from "../../components/Modal";
import FunctionContext from "../../components/FunctionContext";
import Loader from "../../utils/loader";
import EditKategori from "../../components/EditKategori";

export default function KategoriData({ navbarTitle }) {
  const [kategori, setKategori] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState();
  const [valueKategori, setValueKategori] = useState([]);
  const [updateStatus,setUpdateStatus] = useState(false)
  const buttonDelete = useRef()


  const getKategoriData = async () => {
    setLoading(true);
    try {
      const kategoriData = await getKategori();
      setKategori(kategoriData.data.data);
      setLoading(false);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    getKategoriData();
    navbarTitle("Kategori");
  }, []);

  const handleHapus = async (e,x) => {
   x.target.innerHTML = "Loading..."
    setMsg('')
    try {
      const kategoriDelete = await deleteKategori(e);
      await getKategoriData();
      setShowModal(true);
      setMsg(kategoriDelete.data.msg);
    } catch (error) {
      setMsg(error.response.data.msg)
    }finally{ x.target.innerHTML = "Hapus" }
  };

  const handleKategoriAdded = async (msg) => {
    setMsg(msg);
    setShowModal(true);
    await getKategoriData();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = (e) => {
    setMsg('')
    setUpdate(true);
    setValueKategori(e);
  };

  const updateKategori= async (id,kategori)=>{
    setUpdateStatus(true);
    try {
      const update = await editKategori(id,kategori);
      setUpdate(false);
      setMsg(update.data.msg)
      setShowModal(true)
      getKategoriData()
    } catch (error) {
      setMsg(error.response.data.msg)
    }finally{
      setUpdateStatus(false)
    }
  }


  return (
    <div>
      <HelmetTitle title="Kategori Data" />
      <Modal active={showModal} msg={msg} closeModal={closeModal} />
      <FunctionContext.Provider
        value={{ handleKategoriAdded,msg, setUpdate, valueKategori,updateKategori,updateStatus }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <AddKategori />
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Kategori</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kategori.map((e, i) => (
                    <tr className="hover" key={e.id}>
                      <th>{i + 1}</th>
                      <td>{e.kategori}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-info text-base-200"
                            onClick={() => handleEdit(e)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={(x) => handleHapus(e.id,x)}
                            ref={buttonDelete}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {update && <EditKategori valueKategori={valueKategori} />}
          </>
        )}
      </FunctionContext.Provider>
    </div>
  );
}
KategoriData.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
