import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function logoutClearCookie() {
  Cookies.remove("rt");
  Cookies.remove("at");
}
