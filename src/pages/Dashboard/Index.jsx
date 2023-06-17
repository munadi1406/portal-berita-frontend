import { Suspense, lazy } from "react";
import Loader from "../../utils/loader";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecodeId from "./../../utils/jwtDecodeId";
import PropTypes from "prop-types";
import StatistikCound from "../../components/StatistikCound";
import { deleteArtikel, getArtikelById } from "../../api/artikel";
import HelmetTitle from '../../utils/HelmetTitle'
import TableArtikel from "../../components/TableArtikel";

const AddArtikel = lazy(() => import("../../components/AddArtikel"));

const Index = ({ navbarTitle }) => {
  const [status, setStatus] = useState(false);
  const [dataArtikel,setDataArtikel] = useState([])
  const handleStatus = (e) => {
    setStatus(e);
  };
  const getArtikelPostById = async () => {
    try {
      const {idUsers} = jwtDecodeId();
      const data = await getArtikelById(idUsers);
      setDataArtikel(data.data.data)
    } catch (error) {console.log(error)}
  };

  const deleteArtikelPost = async(id)=>{
    try {
        await deleteArtikel(id)
        await getArtikelPostById()
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    navbarTitle("Artikel");
    getArtikelPostById();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 space-y-1">
    <HelmetTitle title="Artikel Data"/>
      <h1 className="text-2xl">Data Article</h1>
        {status && <h1>Data Berhasil Di Tambahakan</h1>}
        <StatistikCound />
        <Suspense fallback={<Loader />}>
          <AddArtikel onAdded={handleStatus} />
        </Suspense>
          <TableArtikel dataArtikel={dataArtikel} deleteArtikel={deleteArtikelPost}/>
    </div>
  );
};

export default Index;
Index.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
