import { login } from "../api/login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import AuthCheck from "../utils/AuthCheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const redirect = useNavigate();

  const auth = async () => {
    try {
      const data = await login(email, password);
      if (data.data.accessToken) {
        Cookies.set("at", data.data.accessToken, {});
        Cookies.set("rt", data.data.refreshToken, { expires: 7 });
        redirect("/dashboard");
      }
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    const isAuthenticated = AuthCheck();
    if (!isAuthenticated) {
      redirect("/Login");
    } else {
      redirect("/dashboard");
    }
  }, []);

  return (
    <>
      <div className="border border-black h-screen w-screen flex justify-center items-center bg-gray-800">
        <div className="grid grid-cols-4 w-96 h-max p-4 shadow-md rounded-md bg-white gap-2">
          <h1 className="col-span-4 text-center text-bold text-3xl">Login</h1>
          <h1 className="text-center text-xs text-red-500 col-span-4">{msg}</h1>
          <div className="col-span-4">Username</div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full col-span-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="col-span-4">Password</div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full col-span-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="col-span-4 btn btn-primary" onClick={() => auth()}>
            Login
          </button>
        </div>
      </div>
    </>
  );
}
