import Cookies from "js-cookie";

export default function logoutClearCookie() {
  Cookies.remove("rt");
  Cookies.remove("at");
  return true
}
