import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeaderMain = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    document
      .querySelector("html")
      .setAttribute("data-theme", `${darkMode ? "dark" : "light"}`);
  };

  useEffect(() => {
    handleClick();
  }, [darkMode]);

  return (
    <>
      <nav className="navbar relative z-10">
        <div className="navbar-start">
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
        <div className="navbar-center hidden lg:flex">
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
                  <li>
                    <Link to={'/kategori/politik'}>Politik</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
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
          <Link to={'/Login'}className="btn btn-secondary  rounded-full">Login</Link>
        </div>
      </nav>
      {/* carousel */}
      {/* <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default HeaderMain;
