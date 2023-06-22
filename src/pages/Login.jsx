import { login } from "../api/login";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import HelmetTitle from "../utils/HelmetTitle";
import { useEffect } from "react";
import loginCheck from "../utils/loginCheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const redirect = useNavigate();
  const [loading, setLoading] = useState(false)

  const auth = async () => {
    try {
      setLoading(true)
      const data = await login(email, password);
      if (data.data.accessToken) {
        Cookies.set("at", data.data.accessToken, { httpOnly: false, secure: true, sameSite: 'strict' });
        Cookies.set("rt", data.data.refreshToken, { httpOnly: false, expires: 7, secure: true, sameSite: 'strict' });
        redirect("/dashboard");
      }
    } catch (error) {
      setMsg(error.response.data.msg);
    } finally {
      setLoading(false)
    }
  };

  useEffect(()=>{
    const login = loginCheck()
    if(login) return redirect('/dashboard')
  },[])



  return (
    <>
    <HelmetTitle title="Login"/>
      <div className="hero min-h-screen bg-slate-800 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold mb-6 font-sans">Sign in to your account</h1>
            <q className="">
              Bagaimana cara seorang mengganti bola lampu? Mereka hanya perlu mengetik <span className="text-2xl text-base-100 font-sans font-bold">lightBulb.replace(&ldquo;burned&rdquo;, &ldquo;new&rdquo;)</span> dan semuanya beres!
            </q>
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
                  <Link to={'/Register'} className="label-text-alt link link-hover">
                    Register
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-info text-base-100" onClick={() => auth()}>
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
