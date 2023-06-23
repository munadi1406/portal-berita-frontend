import { useEffect } from "react";
import { Route, Routes,HashRouter } from "react-router-dom";
import { Dashboard, Login, Main, MiddlewareAuthCheck } from "./utils/imports";
import Register from "./pages/Register";


function App() {

  useEffect(() => {
    document.querySelector("body").setAttribute("data-theme", "mytheme");
  }, []);


  

  return (
    <div className="max-w-screen min-w-full bg-base-200">
      <HashRouter>
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<MiddlewareAuthCheck><Dashboard/></MiddlewareAuthCheck>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
