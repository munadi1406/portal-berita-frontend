import Loader from "../../utils/loader";
import { useState, useEffect, Suspense, lazy } from "react";
import jwtDecodeId from "./../../utils/jwtDecodeId";
import PropTypes from "prop-types";
import StatistikCound from "../../components/StatistikCound";
import { deleteArtikel, getArtikelById } from "../../api/artikel";
import HelmetTitle from "../../utils/HelmetTitle";
import Modal from "../../components/Modal";
import FunctionContext from "../../components/FunctionContext";
import { totalPostAndView } from "../../api/view";

const AddArtikel = lazy(() => import("../../components/AddArtikel"));
const TableArtikell = lazy(() => import("../../components/TableArtikell"));

const Index = ({ navbarTitle }) => {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [modal, setModal] = useState();
  const [msg, setMsg] = useState();
  const [totalPostView, setTotalPostView] = useState([]);

  const getArtikelPostById = async () => {
    try {
      const { idUsers } = jwtDecodeId();
      const datas = await getArtikelById(idUsers);
      const { data } = await totalPostAndView(idUsers);
      setTotalPostView(data.data);
      setDataArtikel(datas.data.data);
      console.log(datas)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArtikelPost = async (id,e) => {
    try {
      e.target.innerHTML = "Loading..."
      const deletePost = await deleteArtikel(id);
      setMsg(deletePost.data.message);
      await getArtikelPostById();
    } catch (error) {
      setMsg(error.response.data.error);
    } finally {
      e.target.innerHTML = "Hapus"
      setModal(true);
    }
  };

  const onAddedArtikel = async (msg) => {
    setModal(true);
    setMsg(msg);
    await getArtikelPostById();
  };

  useEffect(() => {
    navbarTitle("Artikel");
    getArtikelPostById();
  }, []);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="w-full grid grid-cols-1 space-y-1">
      <HelmetTitle title="Artikel Data" />
      <Modal active={modal} msg={msg} closeModal={closeModal} />
      <h1 className="text-2xl col-span-1 ">Data Article</h1>
      <FunctionContext.Provider
        value={{
          dataArtikel,
          deleteArtikelPost,
          onAddedArtikel,
          totalPostView,
        }}
      >
        <StatistikCound />
        <Suspense fallback={<Loader />}>
          <AddArtikel />
          <TableArtikell />
        </Suspense>
      </FunctionContext.Provider>
    </div>
  );
};

export default Index;
Index.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
