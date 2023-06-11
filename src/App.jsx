import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main, } from "./utils/imports";

function App() {
  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", "light");
  }, []);
  return (
    <div className="min-h-max">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
