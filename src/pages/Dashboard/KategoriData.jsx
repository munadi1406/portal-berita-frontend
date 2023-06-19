import { useState } from "react";
import { deleteKategori, getKategori } from "../../api/kategori";
import { useEffect } from "react";
import AddKategori from "../../components/AddKategori";
import PropTypes from "prop-types";
import HelmetTitle from "../../utils/HelmetTitle";
import Modal from "../../components/Modal";
import FunctionContext from "../../components/FunctionContext";

export default function KategoriData({ navbarTitle }) {
  const [kategori, setKategori] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState("");

  const getKategoriData = async () => {
    try {
      const kategoriData = await getKategori();
      setKategori(kategoriData.data.data);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    getKategoriData();
    navbarTitle("Kategori");
  }, []);

  const handleHapus = async (e) => {
    try {
      const kategoriDelete = await deleteKategori(e);
      await getKategoriData();
      setShowModal(true);
      setMsg(kategoriDelete.data.msg);
    } catch (error) {
      /* empty */
    }
  };

  const handleKategoriAdded = async (msg) => {
    setMsg(msg);
    setShowModal(true);
    await getKategoriData();
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <HelmetTitle title="Kategori Data" />
      <Modal active={showModal} msg={msg} closeModal={closeModal} />
      <FunctionContext.Provider value={{ handleKategoriAdded }}>
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
                      <button className="btn btn-success">Edit</button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleHapus(e.id)}
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
      </FunctionContext.Provider>
    </div>
  );
}
KategoriData.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
