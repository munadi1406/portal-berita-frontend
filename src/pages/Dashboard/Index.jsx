import { Suspense, lazy } from "react";
import Loader from "../../utils/loader";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecodeId from "./../../utils/jwtDecodeId";
import PropTypes from "prop-types";
import StatistikCound from "../../components/StatistikCound";
import { getArtikelById } from "../../api/artikel";

const AddArtikel = lazy(() => import("../../components/AddArtikel"));
const CardDashBoard = lazy(()=>import('../../components/CardDashBoard'))

const Index = ({ navbarTitle }) => {
  const [status, setStatus] = useState(false);
  const [dataArtikel,setDataArtikel] = useState([])
  const handleStatus = (e) => {
    setStatus(e);
  };

  const getArtikelPostById = async () => {
    try {
      const {idUsers} = jwtDecodeId();
      const data = await getArtikelById(idUsers, 1);
      setDataArtikel(data.data.data)
    } catch (error) {console.log(error)}
  };

  useEffect(() => {
    navbarTitle("Artikel");
    getArtikelPostById();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl text-white">Data Article</h1>
        {status && <h1>Data Berhasil Di Tambahakan</h1>}
      
        <StatistikCound />
        <Suspense fallback={<Loader />}>
          <AddArtikel onAdded={handleStatus} />
        </Suspense>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 space-x-1 space-y-1">
            {dataArtikel.map((e,i)=>(
              <CardDashBoard key={i} title={e.title} image={e.image} prolog={e.prolog}/>
            ))}
          </div>
    </div>
  );
};

export default Index;
Index.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
