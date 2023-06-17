import { useState } from "react";
import { addKategori, deleteKategori, getKategori } from "../../api/kategori";
import { useEffect } from "react";
import AddKategori from "../../components/AddKategori";
import PropTypes from "prop-types";
import HelmetTitle from "../../utils/HelmetTitle";

export default function KategoriData({ navbarTitle }) {
  const [kategori, setKategori] = useState([]);
  const [isKategoriAdded, setIsKategoriAdded] = useState();

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
      await deleteKategori(e);
      await getKategoriData();
    } catch (error) {
      /* empty */
    }
  };

  const handleKategoriAdded = async (isAdded) => {
    setIsKategoriAdded(isAdded);
    if (isAdded) {
      await getKategoriData();
    }
  };

  const Message = ({msg})=>(
    <>
    <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{msg}</span>
    </>
  )

  return (
    <div>
     <HelmetTitle title="Kategori Data"/>
      <AddKategori onKategoriAdded={handleKategoriAdded} />
      <div className="alert alert-success">
        {isKategoriAdded && (
         <Message msg={"Berhasil Di Tambahkan"}/>
        )}
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
    </div>
  );
}
KategoriData.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
