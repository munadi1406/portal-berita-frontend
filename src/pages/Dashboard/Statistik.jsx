import PropTypes from "prop-types";
import { useEffect } from "react";
import HelmetTitle from "../../utils/HelmetTitle";
import { getViewGroupById } from "../../api/view";
import FunctionContext from "../../components/FunctionContext";
import TableStatistik from "../../components/TableStatistik";
import { useState } from "react";
import jwtDecodeId from '../../utils/jwtDecodeId'
import { useCallback } from "react";

export default function Statistik({ navbarTitle }) {

  const [dataById,setDataById] = useState([]);


  const getStatistikGroupId =  useCallback( async()=>{
    try {
      const {idUsers} = jwtDecodeId()
      const data = await getViewGroupById(idUsers);
      setDataById(data.data.data)
    } catch (error) {
      console.log(error)
    }
  },[])

  useEffect(() => {
    navbarTitle("Statistik");
    return ()=>{
      getStatistikGroupId()
      navbarTitle("Statistik")
    }
  }, []);
  return (
    <div>
      <HelmetTitle title="Statistik" />
      <h1>Statistik</h1>
      <FunctionContext.Provider value={{dataById}}>
        <TableStatistik />
      </FunctionContext.Provider>
    </div>
  );
}

Statistik.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
