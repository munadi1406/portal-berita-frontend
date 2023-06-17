import PropTypes from 'prop-types'
import { useEffect } from 'react'
import HelmetTitle from '../../utils/HelmetTitle'

export default function Pengaturan({navbarTitle}) {
  useEffect(()=>{
    navbarTitle("Pengaturan")
  },[])
  return (
    <div>
     <HelmetTitle title="Pengaturan"/>
      <h1>Pengaturan</h1>
    </div>
  )
}
Pengaturan.propTypes={
  navbarTitle:PropTypes.func.isRequired,
}