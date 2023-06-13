import {  Suspense, lazy } from "react";
import Loader from "../../utils/loader";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecodeId from './../../utils/jwtDecodeId'
import PropTypes from 'prop-types'
import StatistikCound from "../../components/StatistikCound";


const  AddArtikel = lazy(()=>import('../../components/AddArtikel'));

const Index = ({navbarTitle}) => {
  const [status,setStatus] = useState(false);

  const handleStatus = (e)=>{
    setStatus(e)
  }
  useEffect(()=>{
    navbarTitle("Artikel")
    jwtDecodeId()
  },[])

  return (
    <div>
      <h1>Data Article</h1>
      <div className="flex flex-col">
        <StatistikCound/>
        <Suspense fallback={<Loader/>}>
          <AddArtikel onAdded={handleStatus}/>
        </Suspense>
        {status && <h1>Data Berhasil Di Tambahakan</h1>}
      </div>
    </div>
  );
};

export default Index;
Index.propTypes={
  navbarTitle:PropTypes.func.isRequired,
}
