// import Card from "../components/card";
import { getArtikel } from "../api/api";
import { useState, useEffect, Suspense, lazy } from "react";
import Loader from "../utils/loader";

const Card = lazy(() => import("../components/card"));

const Home = () => {
  const [data, setData] = useState([]);


  const getArtikelData = async () => {
    try {
      const datas = await getArtikel();
      setData(datas.data.data);
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
      <div className="p-2 grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1">
        <Suspense fallback={<Loader/>}>
          {data.map((e) => (
            <div key={e.artikelId}>
              <Card title={e.title} content={e.content} kategori={e.kategori}/>
            </div>
          ))}
        </Suspense>
      </div>
    </>
  );
};

export default Home;
