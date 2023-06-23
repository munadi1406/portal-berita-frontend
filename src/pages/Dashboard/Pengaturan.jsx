import PropTypes from 'prop-types'
import { useEffect } from 'react'
import HelmetTitle from '../../utils/HelmetTitle'
import UpdateUsername from '../../components/UpdateUsername'
import UpdatePassword from '../../components/UpdatePassword'

export default function Pengaturan({navbarTitle}) {
  useEffect(()=>{
    navbarTitle("Pengaturan")
  },[])
  return (
    <div>
     <HelmetTitle title="Pengaturan"/>
     <div className='grid grid-cols-2 grid-rows-1 space-x-2'>
      <UpdateUsername/>
      <UpdatePassword/>
     </div>
    </div>
  )
}
Pengaturan.propTypes={
  navbarTitle:PropTypes.func.isRequired,
}