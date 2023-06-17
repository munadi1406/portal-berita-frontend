import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { artikelByKategori } from "../api/artikel";
import SkeletonLoading from "../components/SkeletonLoading";
import HelmetTitle from "../utils/HelmetTitle";
import { useLocation } from "react-router-dom";

const Card = lazy(() => import("../components/card"));

const Kategori = () => {
  const location = useLocation();
  const { kategori } = useParams();
  const [dataBykategori, setDataByKategori] = useState([]);
  const [notFound, setNotFound] = useState();

  const getDataByKategori = async () => {
    try {
      const data = await artikelByKategori(kategori, 1);
      if (data.data.data.length > 0) {
        setDataByKategori(data.data.data);
        setNotFound(false)
      } else {
        setNotFound(true);
      }
      console.log(data.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataByKategori();
    console.log(location);
  }, [location.pathname]);

  return (
    <>
      <HelmetTitle title={kategori} />
      <div className="text-3xl uppercase">Kategori : {kategori}</div>
      {notFound ? (
        <div className="text-3xl">{kategori} Not Found</div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 space-x-1 space-y-1 ">
          <Suspense fallback={<SkeletonLoading />}>
            {dataBykategori.map((e) => (
              <Card
                key={e.artikelId}
                title={e.title}
                prolog={e.prolog}
                kategori={e.kategori}
                image={e.image}
                createdAt={e.createdAt}
              />
            ))}
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Kategori;
