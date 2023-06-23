import PropTypes from "prop-types";
import { useEffect } from "react";
import HelmetTitle from "../../utils/HelmetTitle";
import {
  getViewGroupById,
  getViewByMonth,
  getViewByWeek,
} from "../../api/view";
import TableStatistik from "../../components/TableStatistik";
import { useState } from "react";
import jwtDecodeId from "../../utils/jwtDecodeId";
import ChartByMonth from "../../components/ChartByMonth";
import Loader from "../../utils/loader";

export default function Statistik({ navbarTitle }) {
  const [dataById, setDataById] = useState([]);
  const [viewByMonth, setViewByMonth] = useState([]);
  const [viewByWeek, setViewByWeek] = useState([]);
  const [totalViewWeek, setTotalViewWeek] = useState([]);
  const [totalView, setTotalView] = useState([]);
  const [monthName, setMonthName] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStatistikGroupId = async () => {
    setLoading(true);
    try {
      const { idUsers } = jwtDecodeId();
      const datas = await getViewGroupById(idUsers);
      const { data } = await getViewByMonth(idUsers);
      const dataByWeek = await getViewByWeek(idUsers);
      setViewByWeek(dataByWeek.data.data);
      setDataById(datas.data.data);
      setViewByMonth(data.data);
      setLoading(false);
    } catch (error) {
      /* empty */
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

  const dayName = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  useEffect(() => {
    const totalViews = viewByMonth.map((e) => e.jumlah_view);
    const bulan = viewByMonth.map((e) => bulanNames[e.bulan - 1]);
    const minggu = viewByWeek.map((e) => dayName[e.hari - 1]);
    const viewWeek = viewByWeek.map((e) => e.jumlah_view);
    setTotalView(totalViews.reverse());
    setMonthName(bulan.reverse());
    setViewByWeek(minggu.reverse());
    setTotalViewWeek(viewWeek);
  }, [viewByMonth]);

  const dataByMonth = {
    labels: monthName,
    datasets: [
      {
        label: "Total View",
        data: totalView,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const dataByWeek = {
    labels: viewByWeek,
    datasets: [
      {
        label: "Total View",
        data: totalViewWeek,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
          <TableStatistik dataById={dataById} />
          <div className="w-full grid lg:grid-cols-2 grid-cols-1">
          <ChartByMonth
              data={dataByWeek}
              options={options}
              title={"Statistik Per Hari"}
            />
            <ChartByMonth
              data={dataByMonth}
              options={options}
              title={"Statistik Per Bulan"}
            />
          </div>
        </>
      )}
    </div>
  );
}

Statistik.propTypes = {
  navbarTitle: PropTypes.func.isRequired,
};
