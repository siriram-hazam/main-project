import React from "react";
import { useSpring, animated } from "react-spring";
import { Box, Typography } from "@mui/material";

const AnimatedNumbers2 = ({ listusers }) => {
  // Animation for the first number (0 to 150)
  const props1 = useSpring({
    from: { value: 0 },
    to: { value: listusers },
    config: { duration: 2000 }, // ระยะเวลาในการเคลื่อนไหว
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {/* First animated number */}
      <Box sx={{ textAlign: "center" }}>
        <animated.div
          style={{ fontSize: "3rem", fontWeight: "bold", color: "#5dade2" }}
        >
          {props1.value.to((val) => Math.floor(val))}
        </animated.div>

        {/* <Typography variant="h6">Total Users In Company</Typography> */}
      </Box>
    </Box>
  );
};

export default AnimatedNumbers2;
