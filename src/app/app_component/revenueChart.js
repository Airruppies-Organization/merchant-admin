// components/BarChart.js
"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
    datasets: [
      {
        label: "My Dataset",
        backgroundColor: "#61088E",
        barThickness: "flex",
        categoryPercentage: 0.9,
        barPercentage: 0.5,
        borderRadius: 10,
        data: [2, 20, 45, 15, 42, 33, 12, 22],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += context.parsed.y + "M";
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value + " " + "M"; // Add 'M' suffix to each tick value
          },
        },
      },
    },
  };

  return (
    <div className="w-[100%]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
