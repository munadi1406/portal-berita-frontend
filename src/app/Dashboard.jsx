import { HeaderDashboard, FooterDashboard,Index,Post } from "../utils/imports";
import { Routes,Route } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <HeaderDashboard />
      
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/post" element={<Post/>}/>
        </Routes>


      <FooterDashboard />
    </>
  );
}
