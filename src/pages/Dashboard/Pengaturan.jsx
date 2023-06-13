import PropTypes from 'prop-types'
import { useEffect } from 'react'

export default function Pengaturan({navbarTitle}) {
  useEffect(()=>{
    navbarTitle("Pengaturan")
  },[])
  return (
    <div>
      <h1>Pengaturan</h1>
    </div>
  )
}
Pengaturan.propTypes={
  navbarTitle:PropTypes.func.isRequired,
}