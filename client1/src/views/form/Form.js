import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

function Form() {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">
            <InsertDriveFileIcon
              sx={{
                color: "grey",
                mr: 1,
                mb: {
                  xs: 1,
                  sm: 0,
                  lg: 0,
                },
                fontSize: "2rem",
              }}
            />
            ประเมินการใช้งานระบบ Record of Processing Activities (ROPA)
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              position: "relative",
              paddingTop: "56.25%", // อัตราส่วน 16:9
              overflow: "hidden",
            }}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdF_LsFIDd20jl8JailuWaYWUJNi5tl8vyHgnOw5qRFhQPQfA/viewform?embedded=true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none", // ไม่มีกรอบ
              }}
              allowFullScreen
            >
              Loading…
            </iframe>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Form;
