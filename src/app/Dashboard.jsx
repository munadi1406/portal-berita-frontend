import { HeaderDashboard, FooterDashboard,Index,Post } from "../utils/imports";
import { Routes,Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <HeaderDashboard />      
        <div className="w-full h-screen">
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/post" element={<Post/>}/>
        </Routes>
        </div>
      <FooterDashboard />
    </>
  );
}
