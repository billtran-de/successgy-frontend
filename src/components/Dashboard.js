import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';

ChartJS.register(
  Title, Legend, LineElement, CategoryScale, LinearScale, PointElement
);

export function Dashboard() {
  const data = {
    labels: ["May 12", "May 13", "May 14", "May 15", "May 16"],
    datasets: [{
      data: [8,7,8,5,6],
      backgroundColor: "transparent",
      borderColor: "#DB1E1E",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    },{
      data: [2,3,4,2,9],
      backgroundColor: "transparent",
      borderColor: "#225BAE",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    },{
      data: [4,5,6,1,3],
      backgroundColor: "transparent",
      borderColor: "#C0BC5B",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    },{
      data: [2,4,5,6,7],
      backgroundColor: "transparent",
      borderColor: "#3E882B",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    }]
  };
  const options = {scales: {x: {grid :{display :false}}}, y:{min: 0, max: 10, ticks: {stepSize: 2}}, 
                    legend: {position: "bottom",align: "center",display:true}};

  return (
    <>
      <h1>Dashboard</h1>
      <div style={{width: "1000px", height: "1000px", marginLeft:"20px"}}>
        <Line data={data} options={options}></Line>
      </div>
    </>
  
  );
}