import { useEffect } from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Kategori from "./pages/Kategori";
import Sidebar from "./layout/sidebar";

function App() {
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", "light");
  }, []);
  return (
    <>
      
        <BrowserRouter>
          <Header />
          <div className="flex flex-wrap pl-6 pr-6 w-full">
            <main className="min-h-screen lg:w-3/4 sm:w-full relative z-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/kategori/:kategori" element={<Kategori />} />
              </Routes>
            </main>
            <aside className="lg:w-1/4 sm:w-full p-4">
              <div className="top-0 sticky ">
                <Sidebar />
              </div>
            </aside>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}

export default App;
