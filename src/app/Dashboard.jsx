import {
  FooterDashboard,
  Index,
  Navbar,
  Sidebar,
  Statistik,
  Pengaturan,
  KategoriData,
} from "../utils/imports";
import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import { useRef } from "react";
import Users from "../pages/Dashboard/Users";
import Log from "../pages/Dashboard/Log";
import PrivateRoute from "../components/PrivateRoute";
import { useLocation } from "react-router-dom";
import { addLog } from "../api/log";

export default function Dashboard() {
  const [sidebar, setSidebar] = useState(false);
  const [navbarTitle, setNavbarTitle] = useState("");
  const ref = useRef();
  const handleClickSidebar = () => {
    setSidebar(!sidebar);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  const handleNavbarTitle = (e) => {
    setNavbarTitle(e);
  };
  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSidebar(false);
    }
  };

  const location = useLocation()

  useEffect(()=>{
    const logAdd = async ()=>{
      await addLog(location.pathname)
    }
    return ()=> logAdd()
  },[location])

  return (
    <>
      <div className="flex h-screen transition-all duration-150 ease-out">
        <div
          className={`${
            sidebar ? "left-0 z-20" : "-left-full"
          } h-full lg:left-0 lg:relative absolute -left-full transition-all ease-in-out duration-300 z-10`}
          ref={ref}
        >
          <Sidebar close={closeSidebar} />
        </div>
        <div className="flex flex-col w-full" onClick={handleOutsideClick}>
          <div className="flex justify-between items-center px-4 py-2 bg-accent transition-all ease">
            <Navbar onClickSidebar={handleClickSidebar} title={navbarTitle} />
          </div>
          <div className="flex-grow p-2 overflow-y-auto bg-base-200 ">
            <Routes>
              <Route
                path="/"
                element={<Index navbarTitle={handleNavbarTitle} />}
              />
              <Route
                path="/statistik"
                element={<Statistik navbarTitle={handleNavbarTitle} />}
              />
              <Route
                path="/pengaturan"
                element={<Pengaturan navbarTitle={handleNavbarTitle} />}
              />
              <Route
                path="/Kategori"
                element={<PrivateRoute><KategoriData navbarTitle={handleNavbarTitle} /></PrivateRoute>}
              />
              <Route
                path="/users"
                element={<PrivateRoute><Users navbarTitle={handleNavbarTitle} /></PrivateRoute>}
              />
              <Route
                path="/log"
                element={<PrivateRoute><Log navbarTitle={handleNavbarTitle} /></PrivateRoute>}
              />
            </Routes>
          </div>
          <div className="bg-accent px-4 py-2">
            <FooterDashboard />
          </div>
        </div>
      </div>
    </>
  );
}
