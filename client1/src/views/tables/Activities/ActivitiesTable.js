import React, { useState, useEffect } from "react";

import { Card, CardContent, Box, Typography, Fab } from "@mui/material";

import ExTable from "../../tables/Activities/ExTable";

import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";

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
        console.error("Error ActivitiesTable checkUser : ", error);
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
        console.error("Error ActivitiesTable loadUser : ", error);
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
        // console.log("Activities Info : ", res);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.5rem",
                textWrap: "no-wrap",
              }}
            >
              <AllInboxOutlinedIcon
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
              Activities Table
            </Typography>
            <Typography variant="h3">
              <Fab
                color="primary"
                href={"/activities/add"}
                variant="extended"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
              >
                <AddToPhotosOutlinedIcon
                  sx={{
                    fontSize: "1.3rem",
                  }}
                />
                <Typography
                  sx={{
                    ml: 1,
                    textTransform: "capitalize",
                  }}
                >
                  Add Activity
                </Typography>
              </Fab>
            </Typography>
          </Box>
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
