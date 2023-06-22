import PropTypes from "prop-types";
import { useEffect } from "react";
import HelmetTitle from "../../utils/HelmetTitle";
import { getViewGroupById, getViewByMonth } from "../../api/view";
import FunctionContext from "../../components/FunctionContext";
import TableStatistik from "../../components/TableStatistik";
import { useState } from "react";
import jwtDecodeId from "../../utils/jwtDecodeId";
import ChartByMonth from "../../components/ChartByMonth";
import Loader from "../../utils/loader";

export default function Statistik({ navbarTitle }) {
  const [dataById, setDataById] = useState([]);
  const [viewByMonth, setViewByMonth] = useState([]);
  const [totalView, setTotalView] = useState([]);
  const [monthName, setMonthName] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStatistikGroupId = async () => {
    setLoading(true);
    try {
      const { idUsers } = jwtDecodeId();
      const datas = await getViewGroupById(idUsers);
      const { data } = await getViewByMonth(idUsers);
      setDataById(datas.data.data);
      setViewByMonth(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navbarTitle("Statistik");
    getStatistikGroupId();
  }, []);

  const bulanNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  useEffect(() => {
    const totalViews = viewByMonth.map((e) => e.jumlah_view);
    const bulan = viewByMonth.map((e) => bulanNames[e.bulan - 1]);
    setTotalView(totalViews.reverse());
    setMonthName(bulan.reverse());
  }, [viewByMonth]);

  const data = {
    labels: monthName,
    datasets: [
      {
        label: "Table Statistik berdasarkan bulan",
        data: totalView,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 space-y-10">
      <HelmetTitle title="Statistik" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <FunctionContext.Provider value={{ dataById, data, options }}>
            <TableStatistik />
            <div className="w-full grid lg:grid-cols-2 grid-cols-1">
            <ChartByMonth />
            <ChartByMonth />
            </div>
          </FunctionContext.Provider>
        </>
      )}
    </div>
  );
}

Statistik.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
