import PropTypes from "prop-types";
import { useEffect } from "react";
import HelmetTitle from "../../utils/HelmetTitle";
import { getViewGroupById ,getViewByMonth} from "../../api/view";
import FunctionContext from "../../components/FunctionContext";
import TableStatistik from "../../components/TableStatistik";
import { useState } from "react";
import jwtDecodeId from "../../utils/jwtDecodeId";
import ChartByMonth from "../../components/ChartByMonth";

export default function Statistik({ navbarTitle }) {
  const [dataById, setDataById] = useState([]);
  // const [dataViewByMonth,setDataViewByMonth] = useState([])

  const getStatistikGroupId = async () => {
    try {
      const { idUsers } = jwtDecodeId();
      const data = await getViewGroupById(idUsers);
      // const datasViewByMonth = await getViewByMonth(idUsers)
      // console.log(datasViewByMonth)
      setDataById(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navbarTitle("Statistik");
    getStatistikGroupId();
  }, []);


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div>
      <HelmetTitle title="Statistik" />
      <h1>Statistik</h1>
      <FunctionContext.Provider value={{ dataById ,data,options}}>
        <TableStatistik />
        <ChartByMonth/>
      </FunctionContext.Provider>
    </div>
  );
}

Statistik.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
