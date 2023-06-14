import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getKategori } from "../../api/kategori";

const HeaderMain = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [kategoriData, setKategoriData] = useState([]);

  const getKategoriData = async () => {
    try {
      const data = await getKategori();
      // console.log(data)
      setKategoriData(data.data.data);
    } catch (error) {
      /* empty */
    }
  };

  const handleClick = () => {
    document
      .querySelector("body")
      .setAttribute("data-theme", `${darkMode ? "dark" : "light"}`);
  };

  useEffect(() => {
    getKategoriData();
  }, []);

  useEffect(() => {
    handleClick();
  }, [darkMode]);

  return (
    // <nav className="navbar relative z-10 w-full flex justify-between pr-10 pl-10 items-center flex-row min-w-screen">
    //   <div className="navbar-start w-1/2">
    //     <div className="dropdown">
    //       <label tabIndex={0} className="btn btn-ghost lg:hidden">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="h-5 w-5"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h8m-8 6h16"
    //           />
    //         </svg>
    //       </label>
    //       <ul
    //         tabIndex={0}
    //         className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    //       >
    //         <li>
    //           <Link to={"/"} className="text-blue-500">
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <a>Kategori</a>
    //           <ul className="p-2">
    //             <li>
    //               <Link to={"/kategori/belajar"}>Submenu 1</Link>
    //             </li>
    //             <li>
    //               <Link to={"/kategori/mengaji"}>Submenu 2</Link>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>
    //     </div>
    //     <Link to={"/"} className="btn btn-ghost normal-case text-xl">
    //       Cosmic
    //     </Link>
    //   </div>
    //   <div className="navbar-center hidden lg:flex ">
    //     <ul className="menu menu-horizontal px-1">
    //       <li>
    //         <Link to={"/"} className="">
    //           Home
    //         </Link>
    //       </li>
    //       <li>

    //       </li>
    //     </ul>
    //   </div>
    //   <div className="navbar-end w-1/2 space-x-2 ">

    //     <Link to={'/Login'} className="bg-blue-500 hover:bg-blue-500/50 active:scale-95 h-10 w-36 text-white text-lg flex justify-center items-center  rounded-full">Login</Link>
    //   </div>
    // </nav>
    <div className="drawer relative z-20 ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-2xl text-semibold">Cosmic</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <a>Home</a>
              </li>
              <li>
                <details className="dropdown">
                  <summary className="">Kategori</summary>
                  <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                    {kategoriData.map((e) => (
                      <li key={e.id}>
                        <Link to={`/kategori/${e.kategori}`}>{e.kategori}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="flex-grow justify-end items-center flex">
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
            <Link to={'/Login'} className="bg-blue-500 hover:bg-blue-500/50 active:scale-95 h-10 w-1/3  text-white text-lg flex justify-center items-center  rounded-full">Login</Link>
          </div>
        </div>
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu w-56 bg-white min-h-screen">
          <li>
            <a>Home</a>
          </li>
          <li>
            <details open>
              <summary>Kategori</summary>
              <ul>
                {kategoriData.map((e) => (
                  <li key={e.id} className="uppercase">
                    <Link to={`/kategori/${e.kategori}`}>{e.kategori}</Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderMain;
