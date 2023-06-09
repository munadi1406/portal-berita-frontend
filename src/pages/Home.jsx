// import Card from "../components/card";
import { getArtikel } from "../api/artikel";
import { useState, useEffect, Suspense, lazy } from "react";
import Loader from "../utils/loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Card = lazy(() => import("../components/card"));

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArtikelData = async () => {
    try {
      const datas = await getArtikel();
      setData(datas.data.data);
      setLoading(false);
      // console.log(datas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtikelData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Cosmic | Ayo Baca Lurr</title>
        </Helmet>
        <div className="p-2 grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1">
          {loading ? (
            <Loader />
          ) : (
            <Suspense fallback={<Loader />}>
              {data.map((e) => (
                <Card
                  title={e.title}
                  content={e.content}
                  kategori={e.kategori}
                  key={e.artikelId}
                />
              ))}
            </Suspense>
          )}
        </div>
      </HelmetProvider>
    </>
  );
};

export default Home;
