import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const ActivityCircle = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={percentage} size={100} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="textSecondary">
          {`${value}/${max}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivityCircle;
