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

export default function Dashboard() {
  const redirect = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [navbarTitle,setNavbarTitle] = useState("")

  useEffect(() => {
    const isAuthenticated = AuthCheck();
    if (!isAuthenticated) {
      redirect("/Login");
    }
  }, []);

  const handleClickSidebar = () => {
    setSidebar(!sidebar);
    console.log(sidebar)
  };

  const handleNavbarTitle = (e)=>{
    setNavbarTitle(e)
  }

  return (
    <>
      <div className="flex h-screen transition-all duration-150 ease-out">
        <div
          className={`${
            sidebar ? "left-0 relative" : "-left-full"
          } h-full lg:left-0 lg:relative absolute -left-full `}
        >
          <Sidebar show={sidebar}/>
        </div>
        <div className="flex-grow w-full relative ">
          <div className="flex justify-between items-center px-4 py-2 bg-blue-500 transition-all ease">
            <Navbar onClickSidebar={handleClickSidebar} title={navbarTitle}/>
          </div>
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Index navbarTitle={handleNavbarTitle}/>} />
              <Route path="/statistik" element={<Statistik navbarTitle={handleNavbarTitle}/>} />
              <Route path="/pengaturan" element={<Pengaturan navbarTitle={handleNavbarTitle}/>} />
              <Route path="/Kategori" element={<KategoriData navbarTitle={handleNavbarTitle}/>} />
            </Routes>
          </div>
          <div className="bg-slate-600 px-4 py-2 absolute bottom-0 w-full left-0">
            <FooterDashboard />
          </div>
        </div>
      </div>
    </>
  );
}
