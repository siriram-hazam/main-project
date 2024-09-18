import React from "react";
import { Box, Typography } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ p: 3, textAlign: "center" }}>
      {/* <Typography>© 2023 All rights reserved by <Link href="https://www.wrappixel.com">Wrappixel.com</Link> </Typography> */}
      <Typography>
        © 2023 All rights reserved by Siriram Hazam & Thanakorn Sittikorn
        {/* <Link href="https://www.wrappixel.com">Wrappixel.com</Link>{" "} */}
      </Typography>
    </Box>
  );
};

export default Footer;
