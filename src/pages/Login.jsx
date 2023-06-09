import { useEffect } from "react";
import { login } from "../api/login";


export default function Login() {
  const auth = async () => {
    try {
      const authCheck = await login("munadifathullah@gmail.com", "Munadi1406!");
      console.log(authCheck)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    auth();
  }, []);
  return <div>login</div>;
}
