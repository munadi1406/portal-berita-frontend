import { FooterDashboard, Index, Post, Navbar, Sidebar, Statistik, Pengaturan } from "../utils/imports";
import { Routes, Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <div className="w-full border-black grid grid-cols-12 min-h-screen">
  <div className=" col-span-2 h-full relative z-10">
    <Sidebar />
  </div>
  <div className="col-span-10">
    <div className="flex justify-between items-center px-4 py-2 bg-blue-500 ">
      <h1 className="text-white text-2xl font-bold">Dashboard</h1>
      <Navbar />
    </div>
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/post" element={<Post />} />
        <Route path="/statistik" element={<Statistik />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </div>
    <div className="bg-slate-600 px-4 py-2 absolute bottom-0 w-full left-0 z-0">
      <FooterDashboard />
    </div>
  </div>
</div>

    </>
  );
}
