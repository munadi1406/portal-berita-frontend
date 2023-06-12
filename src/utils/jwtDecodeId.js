import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"

export default function jwtDecodeId() {
  try {
    const rt = Cookies.get('rt')
    const decode = jwtDecode(rt)
    return decode
  } catch (error) {
    // console.log(error)
  }
   
}
