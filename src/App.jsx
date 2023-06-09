import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Dashboard, Main} from './utils/imports'





function App() {
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", "light");
  }, []);
  return (
    <div className="">
        <BrowserRouter>
              <Routes>
                <Route path="*" element={<Main />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
