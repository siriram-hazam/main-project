import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Box,
  Typography,
  Fab,
  Divider,
} from "@mui/material";

import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";

import authUtils from "../../../hooks/useAuth";

import ExTable from "./ExTable";

const EditProfileTable = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [userCompanyList, setUserCompanyList] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
        // console.log(user);
      } catch (error) {
        console.error("Error Activities checkUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const loadUser = async () => {
      try {
        const user = await authUtils.userProfile();
        setUser(user);
        // console.log(user.data.users.id);
        console.log("User Data : ", user);
      } catch (error) {
        console.error("Error Activities loadUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const userCompanyList = async () => {
      try {
        const users = await authUtils.userCompanyList();
        setUserCompanyList(users);
        // console.log("User Company List : ", users);
      } catch (error) {
        console.error("Error Activities userCompanyList : ", error);
      } finally {
        setLoading(false);
      }
    };

    userCompanyList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !checkUser || !userCompanyList) {
    return <div>Initializing load user data...</div>;
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
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.5rem",
                textWrap: "no-wrap",
                alignItems: "center",
              }}
            >
              <ContactPageOutlinedIcon
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
              Edit Profile
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
              mt: 2,
            }}
          >
            <ExTable userList={userCompanyList} />
            {/* <ExTable info={info} user={user} /> */}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfileTable;
