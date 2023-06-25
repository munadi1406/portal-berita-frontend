import Loader from "../../utils/loader";
import { useState, useEffect, Suspense, lazy } from "react";
import jwtDecodeId from "./../../utils/jwtDecodeId";
import PropTypes from "prop-types";
import StatistikCound from "../../components/statistik/StatistikCound";
import { deleteArtikel, getArtikelById, updateArticle } from "../../api/artikel";
import HelmetTitle from "../../utils/HelmetTitle";
import Modal from "../../components/Modal";
import FunctionContext from "../../components/FunctionContext";
import { totalPostAndView } from "../../api/view";

const EditArticle = lazy(()=>import ( "../../components/artikel/EditArticle"));
const AddArtikel = lazy(() => import("../../components/artikel/AddArtikel"));
const TableArtikell = lazy(() => import("../../components/artikel/TableArtikell"));

const Index = ({ navbarTitle }) => {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [modal, setModal] = useState();
  const [msg, setMsg] = useState();
  const [totalPostView, setTotalPostView] = useState([]);
  const [isEdit,setIsEdit] = useState(false);
  const [dataEdit,setDataEdit] = useState([])
  const [loading,setLoading] = useState(false)
  const [loadingDelete,setLoadingDelete] = useState(false)

  const getArtikelPostById = async () => {
    setLoading(true)
    try {
      const { idUsers } = jwtDecodeId();
      const datas = await getArtikelById(idUsers);
      const { data } = await totalPostAndView(idUsers);
      setTotalPostView(data.data);
      setDataArtikel(datas.data.data);
    } catch (error) { /* empty */ }finally{
      setLoading(false);
    }
  };

  const deleteArtikelPost = async (id,e) => {
    setLoadingDelete(true)
    try {
      e.target.innerHTML = "Loading..."
      const deletePost = await deleteArtikel(id);
      setMsg(deletePost.data.message);
      await getArtikelPostById();
    } catch (error) {
      setMsg(error.response.data.error);
    } finally {
      e.target.innerHTML = "Hapus"
      setLoadingDelete(false)
      setModal(true);
    }
  };

  const onAddedArtikel = async (msg) => {
    setModal(true);
    setMsg(msg);
    await getArtikelPostById();
  };

  const updateArtikel = async (artikelId,title,content,prolog,image,kategori) => {
    const formatKategori = kategori.join(",");
    try {
      const update = await updateArticle(
        artikelId,
        title,
        content, 
        prolog,
        formatKategori,
        image
      );
      setIsEdit(false)
      setMsg(update.data.msg)
      setModal(true)
      await getArtikelPostById()
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    navbarTitle("Artikel");
    getArtikelPostById();
  }, []);



  // function ini dikirim ke table artikel
  const handleEdit = ()=>{
    setIsEdit(!isEdit)
  }

  // function ini dikirim ke table artikel untuk set data edit
  const handleSetDataEdit = (e)=>{
    setDataEdit(e)
  }

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="w-full grid grid-cols-1 space-y-1">
      <HelmetTitle title="Artikel Data" />
      <Modal active={modal} msg={msg} closeModal={closeModal} />
      <div className="text-2xl col-span-full w-full">Data Article</div>
      <FunctionContext.Provider
        value={{
          dataArtikel,
          deleteArtikelPost,
          onAddedArtikel,
          totalPostView,
          handleEdit,
          isEdit,
          handleSetDataEdit,
          dataEdit,
          updateArtikel,
          msg,
          setMsg,
          loadingDelete
        
        }}
      >
        <StatistikCound />
        <Suspense fallback={<Loader />}>
          <AddArtikel />
          <TableArtikell />
          <EditArticle/>
        </Suspense>
      </FunctionContext.Provider>
      <div className="col-span-full">
          {loading && <Loader/>}
      </div>
    </div>
  );
};

export default Index;
Index.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
