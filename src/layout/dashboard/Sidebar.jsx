import { Link } from "react-router-dom";
import jwtDecodeId from "../../utils/jwtDecodeId";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function Sidebar({ close }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const loc = useLocation();
  const [location, setLocaction] = useState("");

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
    setLocaction(loc.pathname);
  }, []);

  useEffect(() => {
    setLocaction(loc.pathname);
  }, [loc.pathname]);

  const style =
    "p-2 space-x-1 text-info rounded-md flex justify-start items-center hover:bg-info hover:text-white  hover:scale-x-105 transition-all transform ease-in-out duration-300";

  return (
    <div className="p-2 h-full flex justify-between items-center flex-col space-y-2 bg-base-100">
      <div className="h-1/4 flex justify-center items-center flex-col w-full">
        <h1 className="text-3xl text-center text-info font-semibold">
          Cosmic admin
        </h1>
        <div className="flex flex-col w-full justify-center items-center space-y-1 text-info font-semibold">
          {username}
          <div className="badge badge-accent text-white font-bold text-xs">
            {role}
          </div>
        </div>
      </div>
      <ul className="flex-grow box-border w-60 text-slate-700 text-lg  p-2">
        <li
          className={`${style} ${
            location.substring(location.lastIndexOf("/") + 1) === ""
              ? "bg-info text-white block"
              : ""
          }}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">post_add</span>
          <Link to={"./"} className="w-full block">
            Artikel
          </Link>
        </li>
        <li
          className={`${style}  ${
            location.substring(location.lastIndexOf("/") + 1) === "statistik"
              ? "bg-info text-white block"
              : ""
          }}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">bar_chart</span>
          <Link to={"./statistik"} className="w-full block">
            Statistik
          </Link>
        </li>
        <li
          className={`${style}  ${
            location.substring(location.lastIndexOf("/") + 1) === "users"
              ? "bg-info text-white block"
              : ""
          }} ${role !== "admin" ? "hidden" : ""}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">group_remove</span>
          <Link to={"./users"} className="w-full block">
            Users
          </Link>
        </li>
        <li
          className={`${style}  ${
            location.substring(location.lastIndexOf("/") + 1) === "log"
              ? "bg-info text-white block"
              : ""
          }} ${role !== "admin" ? "hidden" : ""}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">web_stories</span>
          <Link to={"./log"} className="w-full block">
            Log
          </Link>
        </li>
        <li
          className={`${style}  ${
            location.substring(location.lastIndexOf("/") + 1) === "kategori"
              ? "bg-info text-white block"
              : ""
          }} ${role !== "admin" ? "hidden" : ""}`}
          onClick={close}
        >
          <span className="material-symbols-outlined">news</span>
          <Link to={"./kategori"} className="w-full block">
            Kategori
          </Link>
        </li>
        <li
          className={`${style}  ${
            location.substring(location.lastIndexOf("/") + 1) === "pengaturan"
              ? "bg-info text-white block"
              : ""
          }}`}
          onClick={close}
        >
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
