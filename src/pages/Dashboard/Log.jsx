import PropTypes from 'prop-types'
import { useEffect } from 'react'
import {getLog} from '../../api/log'
import { useState } from 'react'
import FunctionContext from '../../components/FunctionContext'
import TableLog from '../../components/TableLog'
import Loader from '../../utils/loader'
import HelmetTitle from '../../utils/HelmetTitle'

const Log = ({navbarTitle}) => {

  const [loading,setLoading] = useState(false)
  const [dataLog,setDataLog] = useState([])

  const getLogData = async ()=>{
    setLoading(true);
    try {
      const {data} = await getLog()
      setDataLog(data.data)
      setLoading(false)
    } catch (error) { /* empty */ }
  }

    useEffect(()=>{
        navbarTitle('Log')
        getLogData()
    },[])

  return (
    <div>
    <HelmetTitle title='Log'/>
    {loading ? (<Loader/>)
    :(
      <FunctionContext.Provider value={{dataLog}}>
        <TableLog/>
      </FunctionContext.Provider>
    )}
    </div>
  )
}

Log.propTypes = {
    navbarTitle:PropTypes.func
}

export default Log