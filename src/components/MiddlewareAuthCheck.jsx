import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'


const MiddlewareAuthCheck = ({children}) => {
  const rf = Cookies.get("rt");
  const localtion = useNavigate()

  useEffect(()=>{
    try {
      if(!rf) localtion('/Login')
      jwtDecode(rf)
    } catch (error) {
      localtion('/Login')
    }
  },[])


  return <>{children}</>


};
MiddlewareAuthCheck.propTypes = {
  children:PropTypes.element
}

export default MiddlewareAuthCheck;