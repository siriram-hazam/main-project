import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the ArcElement and other required components
ChartJS.register(ArcElement, Tooltip, Legend);

const MyPieChart = ({ approve, pending }) => {
  const data = {
    labels: ["Approve", "Pending"],
    datasets: [
      {
        data: [approve, pending],
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
        display: false, // ซ่อน legend ที่ด้านบน
      },
    },
  };

  return (
    <Box
      sx={{
        marginTop: { xs: "20px", sm: "25px" }, // ปรับ margin ตามขนาดหน้าจอ
        width: { xs: "16rem", sm: "19rem" }, // ขนาดที่ปรับสำหรับมือถือ
        height: { xs: "16rem", sm: "19rem" }, // ขนาดที่ปรับสำหรับมือถือ
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Pie data={data} options={options} />
      {/* Legend Box */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "5px", sm: "10px" }, // ปรับตำแหน่งตามขนาดหน้าจอ
          right: { xs: "5px", sm: "10px" }, // ปรับตำแหน่งตามขนาดหน้าจอ
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
              {label}: {data.datasets[0].data[index]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MyPieChart;
