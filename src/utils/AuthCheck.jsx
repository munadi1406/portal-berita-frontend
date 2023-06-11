import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";


const AuthCheck = () => {
  const rf = Cookies.get("rt");
try {
  if (!rf) return false
  jwtDecode(rf)
  return true
} catch (error) {
  return false
}

};

export default AuthCheck;