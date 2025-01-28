import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Departments',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(60, 179, 113, 0.2)',
          'rgba(255, 140, 0, 0.2)',
          'rgba(255, 215, 0, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(201, 203, 207, 1)',
          'rgba(255, 99, 71, 1)',
          'rgba(60, 179, 113, 1)',
          'rgba(255, 140, 0, 1)',
          'rgba(255, 215, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/alumni/branches", {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        // Process the data for chart labels and values
        const labels = data.map(item => item.branch || "Unknown");
        const counts = data.map(item => item.count);

        // Update chartData state with fetched data
        setChartData(prevData => ({
          ...prevData,
          labels: labels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: counts,
            },
          ],
        }));
      } catch (error) {
        console.error("Failed to fetch alumni data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Departments wise Alumnus',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutC;
