import HeaderMain from "../layout/main/HeaderMain";
import FooterMain from "../layout/main/FooterMain";
import SidebarMain from "../layout/main/SidebarMain";
import Kategori from "../pages/Kategori";
import Home from "../pages/Home";
import Login from "../pages/Login";

import HeaderDashboard from "../layout/dashboard/HeaderDashboard";
import FooterDashboard from "../layout/dashboard/FooterDashboard";
import Navbar from "../layout/dashboard/Navbar";
import Sidebar from "../layout/dashboard/Sidebar";
import Statistik from "../pages/Dashboard/Statistik";
import SkeletonLoading from "../components/SkeletonLoading";
import PrivateRoute from "./PrivateRoute";
import AuthCheck from "./AuthCheck";

import ArtikelByTitle from "../pages/ArtikelByTitle";
import Pengaturan from "../pages/Dashboard/Pengaturan";

import Main from "../app/Main";
import Dashboard from "../app/Dashboard";

import Index from '../pages/Dashboard/Index'


import Carousel from "../components/Carousel";
import CollapseLoading from '../components/CollapseLoading'
import KategoriData from "../pages/Dashboard/KategoriData";
import CardDashBoard from "../components/CardDashBoard";


export {
  CardDashBoard,
  KategoriData,
  AuthCheck,
  PrivateRoute,
  CollapseLoading,
  SkeletonLoading,
  Carousel,
  HeaderMain,
  FooterMain,
  SidebarMain,
  Kategori,
  Home,
  Main,
  HeaderDashboard,
  FooterDashboard,
  Dashboard,
  Index,
  Login,
  ArtikelByTitle,
  Sidebar,
  Navbar,
  Statistik,
  Pengaturan
};
