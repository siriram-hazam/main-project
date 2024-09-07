import React, { useEffect, useState } from "react";

import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";

import authUtils from "../../hooks/useAuth";

const EditProfile = () => {
  const [user1, setUser1] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
  });

  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save user data logic here
    console.log("User data saved:", user);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  cursor: "pointer",
                }}
                onClick={handleClickOpen}
              >
                <Typography variant="h6">
                  User: {user.firstName} {user.lastName}
                </Typography>
              </Box>

              {/* <Box>
                <Typography variant="h6" sx={{ fontSize: "1.45rem" }}>
                  First Name: {user.firstName}
                </Typography>
              </Box> */}

              <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth={true}
              >
                <DialogTitle sx={{ fontSize: "2rem" }}>
                  Edit Profile
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <Box
                    component="form"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      label="Email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      label="Phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                    <TextField
                      label="Address"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    color="secondary"
                    sx={{ fontSize: "1rem" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    sx={{ fontSize: "1rem" }}
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;
