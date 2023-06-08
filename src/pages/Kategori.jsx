import { useParams } from "react-router-dom"

const Kategori = () => {
  const {kategori} = useParams()
  return (
    <div>Kategori : {kategori}</div>
  )
}

export default Kategori