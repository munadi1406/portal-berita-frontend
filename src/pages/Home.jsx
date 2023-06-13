// import Card from "../components/card";
import { getArtikel } from "../api/artikel";
import { useState, useEffect, Suspense, lazy } from "react";
import Loader from "../utils/loader";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SkeletonLoading ,Carousel } from "../utils/imports";
import Error from "../components/Error";

const Card = lazy(() => import("../components/card"));

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [error, setError] = useState();
  const [msg, setMsg] = useState();

  const getArtikelData = async () => {
    try {
      const datas = await getArtikel(page);
      const newData = datas.data.data;
      setData(data.concat(newData));
      setTotalPage(datas.data.totalPages);
      setLoading(false);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getArtikelData();
  }, []);

  useEffect(() => {
    getArtikelData();
  }, [page]);

  const [dataCarousel, setDataCarousel] = useState([]);

  const getDataCarousel = async () => {
    try {
      const data = await getArtikel(1);
      setDataCarousel(data.data.data);
    } catch (error) {
      if (error.response.status === 429) {
        setError(true);
        setMsg(error.response.data);
      }
    }
  };

  useEffect(() => {
    getDataCarousel();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Cosmic | Ayo Baca Lurr</title>
        </Helmet>
          <Carousel data={dataCarousel} />
        <div className="p-2 grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1 min-h-screen">
          {loading ? (
            error ? (
              <Error msg={msg} />
            ) : (
              <Loader />
            )
          ) : (
            <>
              <Suspense fallback={<SkeletonLoading />}>
                {data.map((e) => (
                  <Card
                    title={e.title}
                    prolog={e.prolog}
                    kategori={e.kategori}
                    key={e.artikelId}
                    image={e.image}
                    createdAt={e.createdAt}
                  />
                ))}
              </Suspense>
              <button
                className={`btn btn-success col-span-full w-full  ${
                  page >= totalPage ? "hidden" : ""
                }`}
                onClick={() => setPage(page + 1)}
              >
                Load More
              </button>
            </>
          )}
        </div>
      </HelmetProvider>
    </>
  );
};

export default Home;
