import { Link } from "react-router-dom";
import jwtDecodeId from "../../utils/jwtDecodeId";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function Sidebar({ close }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const location = useLocation();

  const handleUsername = () => {
    try {
      setUsername(jwtDecodeId().username);
      setRole(jwtDecodeId().role);
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    handleUsername();
  }, []);

  const style =
    "p-2 space-x-1 rounded-md flex justify-start items-center hover:bg-slate-600  hover:scale-x-105 transition-all transform ease-in-out duration-300";

  return (
    <div className="p-2 h-full bg-gray-800 flex justify-between items-center flex-col">
      <div className="h-1/4 flex justify-start items-center flex-col">
        <h1 className="text-3xl text-center text-white font-semibold">
          Cosmic admin
        </h1>
        <div className="flex flex-col w-full justify-center items-center space-y-1">
          <div className="badge badge-success text-white font-bold">
            {username}
          </div>
          <div className="badge badge-info text-white font-bold text-xs">
            {role}
          </div>
        </div>
      </div>
      <ul className="flex-grow box-border w-60 text-white text-lg rounded-md ">
        <li className={`${style} ${location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === '' ? 'scale-x-105 transform bg-blue-600':''}}`} onClick={close}>
          <span className="material-symbols-outlined">post_add</span>
          <Link to={"./"} className="w-full block">
            Artikel
          </Link>
        </li>
        <li className={`${style}  ${location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'statistik' ? 'scale-x-105 transform bg-blue-600':''}}`} onClick={close}>
          <span className="material-symbols-outlined">bar_chart</span>
          <Link to={"./statistik"} className="w-full block">
            Statistik
          </Link>
        </li>
        <li
          className={`${style}  ${location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'users' ? 'scale-x-105 transform bg-blue-600':''}} ${role !== "admin" ? "hidden" : ""}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">group_remove</span>
          <Link to={"./users"} className="w-full block">
            Users
          </Link>
        </li>
        <li
          className={`${style}  ${location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'log' ? 'scale-x-105 transform bg-blue-600':''}} ${role !== "admin" ? "hidden" : ""}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">web_stories</span>
          <Link to={"./log"} className="w-full block">
            Log
          </Link>
        </li>
        <li
          className={`${style}  ${location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'kategori' ? 'scale-x-105 transform bg-blue-600':''}} ${role !== "admin" ? "hidden" : ""}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">news</span>
          <Link to={"./kategori"} className="w-full block">
            Kategori
          </Link>
        </li>
        <li className={`${style}  ${location.pathname.substring(location.pathname.lastIndexOf("/") + 1) === 'pengaturan' ? 'scale-x-105 transform bg-blue-600':''}}`} onClick={close}>
          <span className="material-symbols-outlined">settings</span>
          <Link to={"./pengaturan"} className="w-full block">
            Pengaturan
          </Link>
        </li>
      </ul>
    </div>
  );
}
Sidebar.propTypes = {
  close: PropTypes.func,
};
