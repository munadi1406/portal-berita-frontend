import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from "chart.js";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

// Registrasikan elemen-elemen khusus ke dalam Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartByMonth = ({ data, options, title }) => {
  return (
    <div className="max-w-full">
      <h2 className="text-3xl">{title}</h2>
      <Line data={data} options={options} />
    </div>
  );
};

ChartByMonth.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  title: PropTypes.string,
};

export default ChartByMonth;
