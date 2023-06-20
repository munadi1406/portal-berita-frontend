import PropTypes from 'prop-types'
import { useEffect } from 'react'

const Log = ({navbarTitle}) => {

    useEffect(()=>{
        navbarTitle('Log')
    },[])

  return (
    <div>Log</div>
  )
}

Log.propTypes = {
    navbarTitle:PropTypes.func
}

export default Log