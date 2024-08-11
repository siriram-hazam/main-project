import React, { useState, useEffect } from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";

import ExTable from "../../tables/Activities/ExTable";

import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";

import authUtils from "../../../hooks/useAuth";

import infoUtils from "../../../hooks/useInfo";

const BasicTable = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);

  const [info, setInfo] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
        // console.log(user);
      } catch (error) {
        console.error("Error Dashboard checkUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const loadUser = async () => {
      try {
        const user = await authUtils.userProfile();
        setUser(user);
        // console.log(user);
      } catch (error) {
        console.error("Error Dashboard loadUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

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

  if (!user || !checkUser) {
    return <div>Failed to load user data</div>;
  }

  if (!info) {
    return <div>Failed to load info data</div>;
  }

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">
            <AllInboxOutlinedIcon
              sx={{ color: "grey" }}
              className="mb-1 mr-2"
            />
            Activities Table
          </Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTable info={info} user={user} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BasicTable;
