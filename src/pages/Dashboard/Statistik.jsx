import PropTypes from 'prop-types'
import { useEffect } from 'react'
import HelmetTitle from '../../utils/HelmetTitle'


export default function Statistik({navbarTitle}) {
  useEffect(()=>{
navbarTitle("Statistik")
  },[])
  return (
    <div>
     <HelmetTitle title="Statistik"/>
      <h1>Statistik</h1>
    </div>
  )
}



Statistik.propTypes={
  navbarTitle:PropTypes.func.isRequired,
}