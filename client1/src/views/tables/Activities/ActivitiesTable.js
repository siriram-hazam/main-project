import React, { useState, useEffect } from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import ExTable from "../../tables/Activities/ExTable";

import infoUtils from "../../../hooks/useInfo";

const BasicTable = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await infoUtils.infoActivities();
        setInfo(res);
        // console.log(res);
      } catch (error) {
        console.error("Error BasicTable getInfo : ", error);
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!info) {
    return <div>Failed to load user data</div>;
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Activities Table</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTable info={info} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasicTable;
