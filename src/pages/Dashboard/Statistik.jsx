import PropTypes from 'prop-types'
import { useEffect } from 'react'


export default function Statistik({navbarTitle}) {
  useEffect(()=>{
navbarTitle("Statistik")
  },[])
  return (
    <div>
      <h1>Statistik</h1>
    </div>
  )
}



Statistik.propTypes={
  navbarTitle:PropTypes.func.isRequired,
}