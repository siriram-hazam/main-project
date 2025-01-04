import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyPieChart = ({ approved, pending }) => {
  // Add minimum value to prevent empty chart
  const minValue = 0.1;
  const data = {
    labels: ["Approve", "Pending"],
    datasets: [
      {
        data: [
          approved === 0 ? minValue : approved,
          pending === 0 ? minValue : pending,
        ],
        backgroundColor: ["#28b463", "#e74c3c"],
        hoverBackgroundColor: ["#2ecc71", "#ec7063"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            // Show actual values (0) in tooltip instead of minValue
            const actualValues = [approved, pending];
            return `${context.label}: ${actualValues[context.dataIndex]}`;
          },
        },
      },
    },
  };

  // Show message when no data
  if (approved === 0 && pending === 0) {
    return (
      <Box
        sx={{
          height: { xs: "16rem", sm: "19rem" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No data available
        </Typography>
      </Box>
    );
  }

  // ... rest of your existing code ...
  return (
    <Box
      sx={{
        marginTop: { xs: "20px", sm: "25px" },
        width: { xs: "16rem", sm: "19rem" },
        height: { xs: "16rem", sm: "19rem" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Pie data={data} options={options} />
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "5px", sm: "10px" },
          right: { xs: "5px", sm: "10px" },
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "8px",
          padding: "5px",
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {data.labels.map((label, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Box
              sx={{
                backgroundColor: data.datasets[0].backgroundColor[index],
                borderRadius: "50%",
                height: "10px",
                width: "10px",
                marginRight: "5px",
              }}
            />
            <Typography variant="body2">
              {label}: {[approved, pending][index]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyPieChart;
