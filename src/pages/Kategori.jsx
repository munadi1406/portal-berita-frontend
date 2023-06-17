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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  const getDataByKategori = async () => {
    try {
      const data = await artikelByKategori(kategori, page);
      if (data.data.data.length > 0) {
        const newData = data.data.data;
        setDataByKategori(dataBykategori.concat(newData));
        setTotalPage(data.data.totalPages);
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
  }, [location.pathname,page]);

 

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
            <button
                className={`btn btn-secondary col-span-full w-full  ${page >= totalPage ? "hidden" : ""
                  }`}
                onClick={() => setPage(page + 1)}
              >
               Load More
              </button>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Kategori;
