import { useState } from "react";
import { register } from "../api/login";
import { Link } from "react-router-dom";
import HelmetTitle from "../utils/HelmetTitle";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await register(username, email, password, confirmPassword);
      setMsg(data.data.msg);
      setRegisterStatus(true);
    } catch (error) {
      setMsg(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <HelmetTitle title="Register"/>
      {registerStatus && (
        <div className="modal modal-open" id="my_modal_8">
          <div className="modal-box">
            <h3 className="font-bold text-3xl text-info">Message</h3>
            <div className="py-4 uppercase text-lg ">{msg}</div>
            <div className="modal-action">
              <Link to={'/Login'} className="btn btn-info text-base-100">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="hero min-h-screen bg-slate-800 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Unlock Your Journey!</h1>
            <q className="py-6 text-base-100 ">
            Mengapa seseorang suka <span className="font-bold text-2xl font-sans">infinite loop?</span> Karena mereka <span className="font-bold text-2xl font-sans">menikmati ketika sesuatu berjalan selamanya!</span>
            </q>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center text-xs text-red-500 col-span-4">
                  {msg}
                </h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Konfirmasi Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Konfirmasi Password"
                      className="input input-bordered"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <label className="label">
                    <Link
                      to={"/Login"}
                      className="label-text-alt link link-hover"
                    >
                      Login
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-info text-base-100" type="submit">
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
