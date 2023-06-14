import { useEffect, useState, Suspense, lazy } from "react";
import { getArtikel } from "../../api/artikel";
import PropTypes from "prop-types";
import Loader from "../../utils/loader";
import {CollapseLoading} from "../../utils/imports";

const Collapse = lazy(() => import("../../components/collapse"));

const SidebarMain = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getArtikelData = async () => {
    try {
      const datas = await getArtikel(1);
      setData(datas.data.data);
      setLoading(false);
      // console.log(datas);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getArtikelData();
  }, []);
  return (
    <>
      <div className="space-y-2">
        <h1 className="font-bold text-xl">Recent</h1>
        {loading ? (
          <Loader />
        ) : (
          <Suspense fallback={<CollapseLoading />}>
            {data.map((e) => (
              <Collapse title={e.title} key={e.artikelId} />
            ))}
          </Suspense>
        )}
      </div>
    </>
  );
};
SidebarMain.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
export default SidebarMain;
