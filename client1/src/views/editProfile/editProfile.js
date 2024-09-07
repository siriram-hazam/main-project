import React, { useEffect, useState } from "react";

import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";

import authUtils from "../../hooks/useAuth";

const EditProfile = () => {
  const [initialUser, setInitialUser] = useState(null);
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authUtils.checkUser();
        setCheckUser(user);
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
        setUser(user.data.users);
        setInitialUser(user.data.users); // Store the initial user data
        console.log("User Data : ", user.data.users);
      } catch (error) {
        console.error("Error Activities loadUser : ", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        [name]: value,
      };
      setIsChanged(JSON.stringify(updatedUser) !== JSON.stringify(initialUser));
      return updatedUser;
    });
  };

  const handleSave = () => {
    // Save user data logic here
    console.log("User data saved:", user);
    setInitialUser(user); // Update the initial user data after saving
    setIsChanged(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !checkUser) {
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "1.25rem",
                    fontWeight: "regular",
                    display: "flex",
                    flexDirection: {
                      xs: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                    },
                    columns: "2",
                    justifyContent: "space-between",
                  }}
                >
                  <div>User Name : {user.username}</div>
                  <div>User Id : {user.id}</div>
                  <div>Role : {user.role}</div>
                  <div>Company Id : {user.company_id}</div>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", mb: "2" }}>
                <TextField
                  label="Full Name"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Company Name"
                  name="company_name"
                  value={user.company_relation.companyName}
                  onChange={handleChange}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Company Address"
                  name="company_address"
                  value={user.company_relation.address}
                  onChange={handleChange}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  onClick={handleSave}
                  color="primary"
                  sx={{ fontSize: "1rem", mt: 2 }}
                >
                  Change Password
                </Button>
                <Button
                  onClick={handleSave}
                  color="primary"
                  sx={{ fontSize: "1rem", mt: 2 }}
                  disabled={!isChanged}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;
