import { useEffect, useState } from "react";
import Collapse from "../components/collapse";
import { getArtikel } from "../api/api";
import PropTypes from 'prop-types'

const Sidebar = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);

  const getArtikelData = async () => {
    try {
      const datas = await getArtikel();
      setData(datas.data.data);
      setLoading(false)
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
      <h1 className={`${loading?'':'hidden'} text-center`}>Loading...</h1>
    {data.map((e)=>(
      <div key={e.artikelId}>
        <Collapse title={e.title} content={e.content}/>
      </div>
    ))}
      </div>
    </>
  );
};
Sidebar.propTypes = {
  title:PropTypes.string,
  content:PropTypes.string,
}
export default Sidebar;
