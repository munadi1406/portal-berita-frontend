import PropTypes from "prop-types";
import { useEffect,useState,lazy,Suspense } from "react";
import { getLog } from "../../api/log";
import FunctionContext from "../../components/FunctionContext";
import HelmetTitle from "../../utils/HelmetTitle";
import Loader from '../../utils/loader'

const TableLog = lazy(()=>import('../../components/TableLog'));

const Log = ({ navbarTitle }) => {
  const [dataLog, setDataLog] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPage] = useState()

  const getLogData = async (page) => {
    try {
      const { data } = await getLog(page);
      setDataLog(dataLog.concat(data.data))
      setTotalPage(data.totalPages)
    } catch (error) {
      /* empty */
    }
  };

  useEffect(() => {
    navbarTitle("Log");
    getLogData(page);
  }, [page]);


  return (
    <div>
      <HelmetTitle title="Log" />
        <FunctionContext.Provider value={{ dataLog,setPage,page,totalPage}}>
        <Suspense fallback={<Loader/>}>
          <TableLog />
        </Suspense>
        </FunctionContext.Provider>
    
    </div>
  );
};

Log.propTypes = {
  navbarTitle: PropTypes.func,
};

export default Log;
