import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import authUtils from "../../../hooks/useAuth";
import ExTable from "./ExTable";
import axios from "axios";

const EditProfileTable = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [userCompanyList, setUserCompanyList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    role: "user",
    company_id: "",
  });
  const [errors, setErrors] = useState({});

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
        setUser(user);
        // console.log("user", user);
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
      } catch (error) {
        console.error("Error Activities userCompanyList : ", error);
      } finally {
        setLoading(false);
      }
    };

    userCompanyList();
  }, []);

  useEffect(() => {
    if (user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        company_id: user.data.users.company_id,
      }));
    }
  }, [user]);

  const handleOpenDialog = () => {
    setFormValues({
      username: "",
      password: "",
      fullname: "",
      email: "",
      role: "user",
      company_id: user.data.users.company_id,
    });
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (value.length < 4) {
          error = "Username must be at least 4 characters long.";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters long.";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          error = "Invalid email address.";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      formValues.username &&
      formValues.password &&
      formValues.fullname &&
      formValues.email &&
      formValues.role &&
      !errors.username &&
      !errors.password &&
      !errors.email
    );
  };

  const handleSave = async () => {
    try {
      console.log(formValues);
      const response = await axios.post(
        "http://localhost:3001/api/user/",
        formValues
      );
      console.log("User added successfully:", response.data);

      if (response.data.status === 200) {
        alert("User added successfully");
        window.location.reload();
      }

      handleCloseDialog();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

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
              <AccessibilityNewOutlinedIcon
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
              User List (Admin)
            </Typography>
            <Typography variant="h3">
              <Fab
                color="primary"
                variant="extended"
                sx={{
                  mr: 1,
                  mb: {
                    xs: 1,
                    sm: 0,
                    lg: 0,
                  },
                }}
                onClick={handleOpenDialog}
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
                  Add User
                </Typography>
              </Fab>
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
            <ExTable userList={userCompanyList.data} />
          </Box>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true}>
        <DialogTitle sx={{ fontSize: "2rem" }}>Add User</DialogTitle>
        <DialogContent>
          <Divider />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Full Name"
            name="fullname"
            value={formValues.fullname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 3 }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={formValues.role}
              onChange={handleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            sx={{ fontSize: "1rem" }}
            disabled={!isFormValid()}
          >
            Create User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProfileTable;
