import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getKategori } from "../../api/kategori";


const HeaderMain = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [kategoriData, setKategoriData] = useState([]);

  const getKategoriData = async ()=>{
    try {
      const data = await getKategori();
      // console.log(data)
      setKategoriData(data.data.data)
    } catch (error) { /* empty */ }
  }

  const handleClick = () => {
    document
      .querySelector("body")
      .setAttribute("data-theme", `${darkMode ? "dark" : "light"}`);
  };


  useEffect(()=>{
    getKategoriData()
  },[])


  useEffect(() => {
    handleClick();
  }, [darkMode]);

  return (
      <nav className="navbar relative z-10 w-full flex justify-between pr-10 pl-10 items-center flex-row min-w-screen">
        <div className="navbar-start w-1/2">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/"} className="text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <a>Kategori</a>
                <ul className="p-2">
                  <li>
                    <Link to={"/kategori/belajar"}>Submenu 1</Link>
                  </li>
                  <li>
                    <Link to={"/kategori/mengaji"}>Submenu 2</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost normal-case text-xl">
            Cosmic
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"} className="">
                Home
              </Link>
            </li>
            <li>
              <details className="dropdown">
                <summary className="">Kategori</summary>
                <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                {kategoriData.map((e)=>(
                  <li key={e.id}>
                    <Link to={`/kategori/${e.kategori}`}>{e.kategori}</Link>
                  </li>
                ))}
                  
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end w-1/2 space-x-2 ">
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle"
                onChange={() => setDarkMode(!darkMode)}
                checked={darkMode}
              />
            </label>
          </div>
          <Link to={'/Login'} className="bg-blue-500 hover:bg-blue-500/50 active:scale-95 h-10 w-36 text-white text-lg flex justify-center items-center  rounded-full">Login</Link>
        </div>
      </nav>
  );
};

export default HeaderMain;
