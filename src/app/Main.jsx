import { useEffect } from 'react'
import {HeaderMain,SidebarMain,FooterMain, Home, Kategori, ArtikelByTitle} from '../utils/imports'
import { Routes ,Route,useLocation} from 'react-router-dom'
import { addLog } from '../api/log'




export default function Main() {
  const location = useLocation()

  useEffect(()=>{
    const logAdd = async ()=>{
      await addLog(location.pathname)
    }
    return ()=> logAdd()
  },[location])


  return (
    <>
          <HeaderMain />
          <div className="flex flex-wrap pl-6 pr-6 max-w-6xl m-auto">
            <main className="min-h-screen lg:w-3/4 sm:w-full relative z-0 w-full">
              <Routes >
                <Route  path="/" element={<Home />} />
                <Route path="/kategori/:kategori" element={<Kategori />} />
                <Route path="/article/:title" element={<ArtikelByTitle />} />
              </Routes>
            </main>
            <aside className="lg:w-1/4 sm:w-full p-4">
              <div className="top-0 sticky ">
                <SidebarMain />
              </div>
            </aside>
          </div>
          <FooterMain />
    </>
  )
}
