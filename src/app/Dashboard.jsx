import { useEffect } from "react";
import {
  FooterDashboard,
  Index,
  Navbar,
  Sidebar,
  Statistik,
  Pengaturan,
  AuthCheck,
  KategoriData,
} from "../utils/imports";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import Users from "../pages/Dashboard/Users";
import Log from "../pages/Dashboard/Log";

export default function Dashboard() {
  const redirect = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [navbarTitle,setNavbarTitle] = useState("")
  const ref = useRef()

  useEffect(() => {
    const isAuthenticated = AuthCheck();
    if (!isAuthenticated) {
      redirect("/Login");
    }
  }, []);

  
  const handleClickSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = ()=>{
    setSidebar(false);
  }

  const handleNavbarTitle = (e)=>{
    setNavbarTitle(e)
  }
  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
        setSidebar(false)
    }
};

  return (
    <>
     <div className="flex h-screen transition-all duration-150 ease-out" >
  <div
    className={`${
      sidebar ? "left-0 z-20" : "-left-full"
    } h-full lg:left-0 lg:relative absolute -left-full transition-all ease-in-out duration-300 `}
    ref={ref} >
    <Sidebar close={closeSidebar}/>
  </div>
  <div className="flex flex-col w-full" onClick={handleOutsideClick}>
    <div className="flex justify-between items-center px-4 py-2 bg-blue-500 transition-all ease" >
      <Navbar onClickSidebar={handleClickSidebar} title={navbarTitle}/>
    </div>
    <div className="flex-grow p-2 overflow-y-auto bg-base-100 ">
      <Routes>
        <Route path="/" element={<Index navbarTitle={handleNavbarTitle}/>} />
        <Route path="/statistik" element={<Statistik navbarTitle={handleNavbarTitle}/>} />
        <Route path="/pengaturan" element={<Pengaturan navbarTitle={handleNavbarTitle}/>} />
        <Route path="/Kategori" element={<KategoriData navbarTitle={handleNavbarTitle}/>} />
        <Route path="/users" element={<Users navbarTitle={handleNavbarTitle}/>} />
        <Route path="/log" element={<Log navbarTitle={handleNavbarTitle}/>} />
      </Routes>
    </div>
    <div className="bg-slate-600 px-4 py-2">
      <FooterDashboard />
    </div>
  </div>
</div>

    </>
  );
}
