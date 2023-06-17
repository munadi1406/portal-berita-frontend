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
        Cookies.set("at", data.data.accessToken,{ httpOnly: false, secure: true, sameSite: 'strict' });
        Cookies.set("rt", data.data.refreshToken, { httpOnly:false ,expires: 7 ,secure: true, sameSite: 'strict' });
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
      <div className="hero min-h-screen bg-slate-800 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
            <h1 className="text-center text-xs text-red-500 col-span-4">{msg}</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-info" onClick={() => auth()}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
