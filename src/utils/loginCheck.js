import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";


export default function loginCheck() {
    try {
      const rt = Cookies.get("rt");
      jwtDecode(rt);
      return true
    } catch (error) {
      return false
    }
}
