import PropTypes from "prop-types";
import { logout } from "../../api/users";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecodeId from "../../utils/jwtDecodeId";


export default function Navbar({ onClickSidebar, title }) {
  const redirect = useNavigate();
  const handleLogout = async () => {
    try {
      const {idUsers} = jwtDecodeId()
      await logout(idUsers)      
      Cookies.remove("rt");
       Cookies.remove("at");
      redirect("/Login");
    } catch (error) { /* empty */ }
  };
  return (
    <div className="flex justify-between items-center w-full">
      <div className=" w-max h-max flex justify-center items-center">
        <label className="swap swap-rotate lg:hidden ">
          <input type="checkbox" onChange={onClickSidebar} />
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <button className="btn btn-accent text-base-100" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

Navbar.propTypes = {
  onClickSidebar: PropTypes.func.isRequired,
  title: PropTypes.string,
};
