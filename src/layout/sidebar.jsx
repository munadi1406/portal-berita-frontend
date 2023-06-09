import { useEffect, useState, Suspense, lazy } from "react";
import { getArtikel } from "../api/api";
import PropTypes from "prop-types";
import Loader from "../utils/loader";

const Collapse = lazy(() => import("../components/collapse"));

const Sidebar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArtikelData = async () => {
    try {
      const datas = await getArtikel();
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
          <Suspense fallback={<Loader />}>
            {data.map((e) => (
              <Collapse title={e.title} content={e.content} key={e.artikelId} />
            ))}
          </Suspense>
        )}
      </div>
    </>
  );
};
Sidebar.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
export default Sidebar;
