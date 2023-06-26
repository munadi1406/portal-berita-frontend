import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { artikelByKategori } from "../api/artikel";
import SkeletonLoading from "../components/SkeletonLoading";
import HelmetTitle from "../utils/HelmetTitle";
import Error from "../components/Error";

const Card = lazy(() => import("../components/card"));

const Kategori = () => {
  const { kategori } = useParams();
  const [dataBykategori, setDataByKategori] = useState([]);
  const [notFound, setNotFound] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState();
  const [msg, setMsg] = useState();
  const [previousKategori, setPreviousKategori] = useState("");
  const [currentPage,setCurrentPage] = useState()
  const [loading,setLoading] = useState(false);

  const getDataByKategori = async () => {
    setLoading(true);
    try {
      const data = await artikelByKategori(kategori, page);
      if (data.data.data.length > 0) {
        if (previousKategori === kategori) {
          setDataByKategori((prevDataByKategori) =>
            prevDataByKategori.concat(data.data.data)
          );
        } else {
          setDataByKategori(data.data.data);
        }
        setTotalPage(data.data.totalPages);
        setCurrentPage(data.data.currentPage)
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    } catch (error) {
     
      if (error.response.status === 429) {
        setError(true);
        setMsg(error.response.data);
      }
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    setPreviousKategori(kategori);
    setPage(1)
    setDataByKategori([]);
    getDataByKategori();
  }, [kategori]);

  useEffect(() => {
    getDataByKategori();
  }, [page]);
  return (
    <>
      <HelmetTitle title={kategori} />
      <div className="text-3xl uppercase">Kategori : {kategori}</div>
      {notFound ? (
        <div className="text-3xl">{kategori} Not Found</div>
      ) : error ? (
        <Error msg={msg} />
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
              className={`btn btn-info col-span-full w-full text-white ${
                currentPage >= totalPage || !dataBykategori.length ? "hidden" : ""
              }`}
              onClick={() => setPage(page + 1)}
              disabled={loading}
            >
              {loading ? 'Loading...' :'Load More'}
            </button>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Kategori;
