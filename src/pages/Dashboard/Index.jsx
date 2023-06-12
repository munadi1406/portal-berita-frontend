import {  Suspense, lazy } from "react";
import Loader from "../../utils/loader";
import { useState } from "react";


const  AddArtikel = lazy(()=>import('../../components/AddArtikel'));

const Index = () => {
  const [status,setStatus] = useState(false);

  const handleStatus = (e)=>{
    setStatus(e)
  }

  return (
    <div>
      <h1>Data Article</h1>
        <Suspense fallback={<Loader/>}>
          <AddArtikel onAdded={handleStatus}/>
        </Suspense>
        {status && <h1>Data Berhasil Di Tambahakan</h1>}
    </div>
  );
};

export default Index;
