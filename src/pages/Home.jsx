import Card from "../components/card";
import { getArtikel } from "../api/api";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);

  const getArtikelData = async () => {
    try {
      const datas = await getArtikel();
      setData(datas.data.data);
      setLoading(false)
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
      <h1 className={`${loading?'':'hidden'} text-center`}>Loading...</h1>
        {data.map((e) => (
          <div key={e.artikelId}>
            <Card title={e.title} content={e.content} kategori={e.kategori}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
