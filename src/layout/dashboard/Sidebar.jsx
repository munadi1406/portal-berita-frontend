import { Link } from "react-router-dom";
import jwtDecodeId from "../../utils/jwtDecodeId";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar({close}) {

  const [username,setUsername]  = useState("")

  const handleUsername =()=>{
    try {
      setUsername(jwtDecodeId().username)
    } catch (error) { /* empty */ }
  }

  useEffect(()=>{
    handleUsername()
  },[])

  

  return (
    <div className="p-2 h-full bg-gray-800 flex justify-between items-center flex-col" >
      <div className="h-1/4 flex justify-start items-center flex-col">
        <h1 className="text-3xl text-center text-white font-semibold">Cosmic admin</h1>
        <div className="badge badge-success text-white font-bold">{username}</div>
      </div>
      <ul className="flex-grow box-border w-60 text-white text-lg rounded-md">
        <li className="p-2 rounded-md hover:bg-slate-600" onClick={close}>
          <Link to={"./"} className="w-full block">Artikel</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600" onClick={close}>
          <Link to={"./statistik"} className="w-full block">Statistik</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600" onClick={close}>
          <Link className="w-full block">Users</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600" onClick={close}>
          <Link to={"./kategori"} className="w-full block">Kategori</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600" onClick={close}>
          <Link to={"./pengaturan"} className="w-full block">Pengaturan</Link>
        </li>
      </ul>
      
    </div>
  );
}
