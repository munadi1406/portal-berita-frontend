import { Suspense, lazy } from "react";
import Loader from "../../utils/loader";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecodeId from "./../../utils/jwtDecodeId";
import PropTypes from "prop-types";
import StatistikCound from "../../components/StatistikCound";
import { deleteArtikel, getArtikelById } from "../../api/artikel";
import HelmetTitle from "../../utils/HelmetTitle";
import Modal from "../../components/Modal";

const AddArtikel = lazy(() => import("../../components/AddArtikel"));
const TableArtikell = lazy(() => import("../../components/TableArtikell"));

const Index = ({ navbarTitle }) => {
  const [status, setStatus] = useState(false);
  const [dataArtikel, setDataArtikel] = useState([]);
  const [statusHapus,setStatusHapus] = useState();
  const [msg,setMsg] = useState();

  const handleStatus = (e) => {
    setStatus(e);
  };
  const getArtikelPostById = async () => {
    try {
      const { idUsers } = jwtDecodeId();
      const data = await getArtikelById(idUsers);
      setDataArtikel(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArtikelPost = async (id) => {
    try {
      const deletePost = await deleteArtikel(id);
      setStatusHapus(true)
      setMsg(deletePost.data.message)
      await getArtikelPostById();
    } catch (error) { /* empty */ }
  };

  useEffect(() => {
    navbarTitle("Artikel");
    getArtikelPostById();
  }, []);

  // const columns = [
  //   {
  //     name: "Publisher",
  //     selector: (row) => row.user.username,
  //   },
  //   {
  //     name: "Title",
  //     selector: (row) => row.title,
  //     sortable: true,
  //   },
  //   {
  //     name: "Kategori",
  //     selector: (row) => row.kategori,
  //   },
  //   {
  //     name: "Created At",
  //     selector: (row) => row.createdAt,
  //     sortable: true,
  //   },
  //   {
  //     name: "Image",
  //     selector: (row) => <img src={row.image} width={50} />,
  //   },
  //   {
  //     name: "Action",
  //     selector: () => (
  //       <div className="space-x-1">
  //         <button className="btn btn-info">Edit</button>
  //         <button className="btn btn-danger">Hapus</button>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="w-full grid grid-cols-1 space-y-1">
      <HelmetTitle title="Artikel Data" />
      <Modal status={statusHapus} changeStatus={setStatusHapus} msg={msg}/>
      <h1 className="text-2xl">Data Article</h1>
      {status && <h1>Data Berhasil Di Tambahakan</h1>}
      <StatistikCound />
      <Suspense fallback={<Loader />}>
        <AddArtikel onAdded={handleStatus} />
        <TableArtikell
          data={dataArtikel}
          deleteArtikel={deleteArtikelPost}
        />
      </Suspense>
    </div>
  );
};

export default Index;
Index.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
