import React, { useEffect, useState } from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import ActivityPieChart from "./ActivityPieChart";
import ActivityNumberRun from "./ActivityNumberRun";
import CompanyUserRun from "./CompanyUserRun";
import authUtils from "../../hooks/useAuth";
import authInfo from "../../hooks/useInfo";

const Dashboard1 = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [userCompanyList, setUserCompanyList] = useState([]);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const response = await authInfo.infoActivities();
        setActivity(response.data.message);

        const approved = response.data.message.filter(
          (item) => item.status === "success"
        );
        const pending = response.data.message.filter(
          (item) => item.status === "pending"
        );

        setApprovedData(approved);
        setPendingData(pending);
      } catch (error) {
        console.error("Error loading activities: ", error);
        setLoading(false); // เพิ่มบรรทัดนี้
      }
    };

    const loadUserCompanyList = async () => {
      try {
        const users = await authUtils.userCompanyList();
        setUserCompanyList(users.data.userslist);
      } catch (error) {
        console.error("Error loading user company list: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadActivity();
    loadUserCompanyList();
  }, []);

  // console.log("activity: ", activity);
  // console.log("approvedData: ", approvedData);

  if (loading) {
    return <div>Loading....</div>;
  }

  // if (!activity.length) {
  //   return <div>No data</div>;
  // }

  return (
    <Box sx={{ padding: { xs: 2, sm: 3 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            variant="outlined"
            sx={{ paddingBottom: "0", position: "relative" }}
          >
            <CardContent sx={{ paddingBottom: "16px !important" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: "0",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  gutterBottom
                >
                  Activity Status
                </Typography>
              </Box>
              <ActivityPieChart
                approved={approvedData.length}
                pending={pendingData.length}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            variant="outlined"
            sx={{ paddingBottom: "0", position: "relative" }}
          >
            <CardContent sx={{ paddingBottom: "16px !important" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityNumberRun
                  total={activity.length}
                  approved={approvedData.length}
                  pending={pendingData.length}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            variant="outlined"
            sx={{ paddingBottom: "0", position: "relative" }}
          >
            <CardContent sx={{ paddingBottom: "16px !important" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    marginBottom: "0",
                    fontSize: "1.8rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  gutterBottom
                >
                  Company User
                </Typography>
              </Box>
              <CompanyUserRun listusers={userCompanyList.length} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
