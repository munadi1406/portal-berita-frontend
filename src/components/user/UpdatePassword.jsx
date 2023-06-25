import { useState } from "react";
import FunctionContext from "../FunctionContext";
import { useContext } from "react";

const UpdatePassword = () => {
  const { updatePassword, msgPass, loadingPass } = useContext(FunctionContext);
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault()
    updatePassword(password)
  };

  return (
    <div className="grid grid-cols-1 bg-base-200 p-4 rounded-md space-y-3">
      <div className="text-3xl font-sans">Ganti Password</div>
      <form className="flex flex-col space-y-4" onSubmit={handleClick}>
        <label htmlFor="username">Password Baru</label>
        <div className="text-red-500 text-xs font-semibold">{msgPass}</div>
        <input
          type="text"
          placeholder="Type here"
          id="username"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          className="input input-bordered input-info w-full"
        />
        <button
          className="btn btn-info text-base-200"
          type="submit"
        >{loadingPass ? 'Loading...':'Update Password'}</button>
      </form>
    </div>
  );
};

export default UpdatePassword;
