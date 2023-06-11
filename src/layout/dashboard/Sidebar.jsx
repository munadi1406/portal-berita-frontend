import { Link } from "react-router-dom";


export default function Sidebar() {
  return (
    <div className='p-2 grid grid-row-5 bg-slate-600 h-full text-white grid-col-none'>
      <h1 className="text-2xl font-bold row-span-1 flex justify-center items-center">Cosmic<span className="font-normal">Admin</span></h1>
      <ul className="w-full row-span-5 font-semibold">
        <li className="max-w-full p-2">
          <Link to={'./'}>Artikel</Link>
        </li>
        <li className="border-b-white  max-w-full p-2">
        <Link to={'./statistik'}>
          Statistik
        </Link>
        </li>
        <li className="border-b-white  max-w-full p-2"><Link>Users</Link></li>
        <li className="border-b-white  max-w-full p-2"><Link to={'./kategori'}>Kategori</Link></li>
        <li className="border-b-white  max-w-full p-2"><Link to={'./pengaturan'}>Pengaturan</Link></li>
      </ul>
    </div>
  )
}
