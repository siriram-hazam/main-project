import React from "react";
import { useSpring, animated } from "react-spring";
import { Box, Typography } from "@mui/material";

const AnimatedNumbers = ({ total, approve, pending }) => {
  //   console.log("AnimatedNumbers props: ", total);
  // Animation for the first number (0 to 300)
  const props1 = useSpring({
    from: { value: 0 },
    to: { value: approve },
    config: { duration: 2000 }, // ระยะเวลาในการเคลื่อนไหว
  });

  // Animation for the second number (0 to 200)
  const props2 = useSpring({
    from: { value: 0 },
    to: { value: pending },
    config: { duration: 2000 }, // ระยะเวลาในการเคลื่อนไหว
  });

  // Animation for the third number (0 to 300)
  const props3 = useSpring({
    from: { value: 0 },
    to: { value: total },
    config: { duration: 2000 }, // ระยะเวลาในการเคลื่อนไหว
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // จัดตำแหน่งให้อยู่กลาง
        justifyContent: "center",
        // height: "100vh", // ความสูงของ Box
      }}
    >
      {/* Third animated number */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        {" "}
        {/* ใช้ margin-bottom เพื่อสร้างพื้นที่ระหว่างตัวเลข */}
        <animated.div
          style={{ fontSize: "3rem", fontWeight: "bold", color: "#5dade2" }}
        >
          {props3.value.to((val) => Math.floor(val))}
        </animated.div>
        <Typography variant="h6">Total Activities</Typography>
      </Box>

      {/* Box for First and Second animated numbers */}
      <Box
        sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}
      >
        {/* First animated number */}
        <Box sx={{ textAlign: "center", pr: "1rem" }}>
          <animated.div
            style={{ fontSize: "3rem", fontWeight: "bold", color: "#4CAF50" }}
          >
            {props1.value.to((val) => Math.floor(val))}
          </animated.div>
          <Typography variant="h6">Approve</Typography>
        </Box>
        {/* Second animated number */}
        <Box sx={{ textAlign: "center", pr: "1rem" }}>
          <animated.div
            style={{ fontSize: "3rem", fontWeight: "bold", color: "#F44336" }}
          >
            {props2.value.to((val) => Math.floor(val))}
          </animated.div>
          <Typography variant="h6">Pending</Typography>
        </Box>
        {/* {users.role === "admin" && (
          <Box sx={{ textAlign: "center", pr: "1rem" }}>
            <animated.div
              style={{ fontSize: "3rem", fontWeight: "bold", color: "#F44336" }}
            >
              {props2.value.to((val) => Math.floor(val))}
            </animated.div>
            <Typography variant="h6">Pending</Typography>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default AnimatedNumbers;
