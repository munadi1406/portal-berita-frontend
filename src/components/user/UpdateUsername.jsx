import { useState } from "react";
import FunctionContext from "../FunctionContext";
import { useContext } from "react";

const UpdateUsername = () => {
  const { updateUsername, msg, loading } = useContext(FunctionContext);
  const [username, setUsername] = useState("");

  const handleClick = (e) => {
    e.preventDefault()
    updateUsername(username)
  };

  return (
    <div className="grid grid-cols-1 bg-base-200 p-4 rounded-md space-y-3">
      <div className="text-3xl font-sans">Ganti Username</div>
      <form className="flex flex-col space-y-4" onSubmit={handleClick}>
        <label htmlFor="username">Username Baru</label>
        <div className="text-red-500 text-xs font-semibold">{msg}</div>
        <input
          type="text"
          placeholder="Type here"
          id="username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          className="input input-bordered input-info w-full"
        />
        <button
          className="btn btn-info text-base-200"
          type="submit"
        >{loading ? 'Loading...':'Update'}</button>
      </form>
    </div>
  );
};

export default UpdateUsername;
