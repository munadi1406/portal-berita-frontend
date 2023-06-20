import { Chart, LineController, LinearScale, PointElement, LineElement ,CategoryScale} from 'chart.js';
import { Line } from 'react-chartjs-2';
import FunctionContext from './FunctionContext';
import { useContext } from 'react';
// Registrasikan elemen-elemen khusus ke dalam Chart.js
Chart.register(LineController, LinearScale, PointElement, LineElement,CategoryScale);





const ChartByMonth = () => {
  const {data,options} = useContext(FunctionContext)

  // Data dan opsi chart
  

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartByMonth;

