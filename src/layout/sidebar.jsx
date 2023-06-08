import { useEffect, useState, Suspense, lazy } from "react";
import { getArtikel } from "../api/api";
import PropTypes from "prop-types";
import Loader from "../utils/loader";

const Collapse = lazy(() => import("../components/collapse"));

const Sidebar = () => {
  const [data, setData] = useState([]);


  const getArtikelData = async () => {
    try {
      const datas = await getArtikel();
      setData(datas.data.data);
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
        <Suspense fallback={<Loader />}>
          {data.map((e) => (
            <div key={e.artikelId}>
              <Collapse title={e.title} content={e.content} />
            </div>
          ))}
        </Suspense>
      </div>
    </>
  );
};
Sidebar.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
export default Sidebar;
