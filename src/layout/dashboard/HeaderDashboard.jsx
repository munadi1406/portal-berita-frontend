import { Link } from "react-router-dom"

export default function HeaderDashboard() {
  return (
    <div>
      <Link to={'/dashboard'} className="btn btn-primary">Home</Link>
      <Link to={'/dashboard/post'} className="btn btn-primary">Post</Link>
      <Link to={'/'} className="btn btn-primary">Lihat website</Link>
    </div>
  )
}
