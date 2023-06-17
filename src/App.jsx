import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main, } from "./utils/imports";
import { HashRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", "mytheme");
  }, []);
  return (
    <div className="max-w-screen min-w-full">
     <HashRouter>
        <Routes>
        <Route path="/*" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
