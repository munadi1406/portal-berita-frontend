import { Link } from "react-router-dom";
import jwtDecodeId from "../../utils/jwtDecodeId";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {

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
    <div className="p-2 h-full bg-gray-800 flex justify-between items-center flex-col">
      <div className="h-1/4 flex justify-start items-center flex-col">
        <h1 className="text-3xl text-center text-white font-semibold">Cosmic admin</h1>
        <div className="badge badge-success text-white font-bold">{username}</div>
      </div>
      <ul className="flex-grow box-border w-60 text-white text-lg rounded-md">
        <li className="p-2 rounded-md hover:bg-slate-600">
          <Link to={"./"}>Artikel</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600">
          <Link to={"./statistik"}>Statistik</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600">
          <Link>Users</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600">
          <Link to={"./kategori"}>Kategori</Link>
        </li>
        <li className="p-2 rounded-md hover:bg-slate-600">
          <Link to={"./pengaturan"}>Pengaturan</Link>
        </li>
      </ul>
      
    </div>
  );
}
