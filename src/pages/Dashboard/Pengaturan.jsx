import PropTypes from "prop-types";
import { useEffect,useState } from "react";
import HelmetTitle from "../../utils/HelmetTitle";
import UpdateUsername from "../../components/user/UpdateUsername";
import UpdatePassword from "../../components/user/UpdatePassword";
import { updatePasswordUsers, updateUsernameUsers } from "../../api/users";
import jwtDecodeId from '../../utils/jwtDecodeId'
import FunctionContext from '../../components/FunctionContext'
import logoutClearCookie from "../../utils/LogoutClearCookie";
import { useNavigate } from "react-router-dom";


export default function Pengaturan({ navbarTitle }) {
  useEffect(() => {
    navbarTitle("Pengaturan");
  }, []);

  const [loading,setLoading] = useState(false)
  const [loadingPass,setLoadingPass]=useState(false)
  const [msg,setMsg] = useState('')
  const [msgPass,setMsgPass] = useState('')
  const navigate = useNavigate()

  const updateUsername = async (username) => {
    setLoading(true)
    setMsg('')
    try {
      const { idUsers } = jwtDecodeId();
      await updateUsernameUsers(idUsers, username);
      if(logoutClearCookie()) return navigate('/login')
    } catch (error) {
      setMsg(error.response.data.msg)
    }finally{
      setLoading(false)
    }
  };

  const updatePassword = async (username) => {
    setLoadingPass(true)
    setMsgPass('')
    try {
      const { idUsers } = jwtDecodeId();
      await updatePasswordUsers(idUsers, username);
      if(logoutClearCookie()) return navigate('/login')
    } catch (error) {
      setMsgPass(error.response.data.msg)
    }finally{
      setLoadingPass(false)
    }
  };

  return (
    <div>
      <HelmetTitle title="Pengaturan" />
      <div className="grid grid-cols-2 grid-rows-1 space-x-2">
        <FunctionContext.Provider value={{updateUsername,msg,loading,updatePassword,loadingPass,msgPass}}>
          <UpdateUsername />
          <UpdatePassword />
        </FunctionContext.Provider>
      </div>
    </div>
  );
}
Pengaturan.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
