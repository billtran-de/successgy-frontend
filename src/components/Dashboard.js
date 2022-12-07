import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Title } from 'chart.js';

import { Snapshot } from './Snapshot'


ChartJS.register(
  Title, Legend, LineElement, CategoryScale, LinearScale, PointElement
);

export function Dashboard() {
  const [gas, setGas] = useState([]);
  const [diesol, setDiesol] = useState([]);
  const [propane, setPropane] = useState([]);
  const [electricity, setElectricity] = useState([]);

  const labelArr = []; 

  const [data, setData] = useState({ 
    labels: labelArr,
    datasets: [{
      label: "Gas",
      data: [2,3,4,2,9],
      backgroundColor: "transparent",
      borderColor: "#DB1E1E",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    },{
      label: "Propane",
      data: [2,2,4,5,9],
      backgroundColor: "transparent",
      borderColor: "#225BAE",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    },{
      label: "Diesol",
      data: [4,5,6,1,3],
      backgroundColor: "transparent",
      borderColor: "#C0BC5B",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    },{
      label: "Electricity",
      data: [2,4,5,6,7],
      backgroundColor: "transparent",
      borderColor: "#3E882B",
      pointBorderColor: "transparent",
      pointBorderWidth: 4
    }]
  });
  
  const options = {scales: {x: {grid :{display :false}}}, y:{min: 0, max: 400000}, 
                    legend: {position: "bottom",align: "end",display:true}, 
                    plugins: { title: {display: true, text: "Carbon Emission by Source"}, datalabels: {
      display: true,
      color: "black"
    }}};

  const getEmission = (array, type) => {
    const result = []
    array.forEach(record => {
        if (record['emission_source'] === type) {
          result.push(record["carbon_emission"])
        }
    })
    return result;
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/emission`)
      .then((res) => res.json())
      .then((data) => { 
        setGas(getEmission(data.data, 'gas'))
        setDiesol(getEmission(data.data, 'diesol'))
        setPropane(getEmission(data.data, 'propane'))
        setElectricity(getEmission(data.data, 'electricity'))
           
        data.data.map((item, index) => {
          if (labelArr.includes(item.date) === false) {
            labelArr.push(item.date);
          }
        })
        setData({ 
          labels: labelArr,
          datasets: [{
            label: "Gas",
            data: gas,
            backgroundColor: "transparent",
            borderColor: "#3E882B",
            pointBorderColor: "transparent",
            pointBorderWidth: 4
          },{
            label: "Diesol",
            data: diesol,
            backgroundColor: "transparent",
            borderColor: "#225BAE",
            pointBorderColor: "transparent",
            pointBorderWidth: 4
          },{
            label: "Propane",
            data: propane,
            backgroundColor: "transparent",
            borderColor: "#C0BC5B",
            pointBorderColor: "transparent",
            pointBorderWidth: 4
          },{
            label: "Electricity",
            data: electricity,
            backgroundColor: "transparent", 
            borderColor: "#DB1E1E",
            pointBorderColor: "transparent",
            pointBorderWidth: 4
          }]
        })
      }) 
      .catch((err) => { console.log(err)})
  },[gas, diesol, propane, electricity, labelArr]);
    
  return (
    <>
      <Typography.Text style={{color: "green", fontSize:24, fontWeight:'bold'}}>Dashboard</Typography.Text>
      <Snapshot />
      <div style={{width: "1000px", height: "1000px", marginLeft:"20px"}}>
        <Line data={data} options={options}></Line>
      </div>
    </>
  
  );
}