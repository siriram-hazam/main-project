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
  Autocomplete,
} from "@mui/material";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import authUtils from "../../../hooks/useAuth";
import ExTable from "./ExTable";
import axios from "axios";

const CompanyUserSuper = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [companyList, setCompanyList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    role: "admin", // Fixed role
    company_id: 0,
  });
  const [errors, setErrors] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [companyAdmin, setCompanyAdmin] = useState(null);

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

    const companyList2 = async () => {
      try {
        const company = await authUtils.companyList();
        setCompanyList(company);
        // console.log("Company List : ", company.data.data);
      } catch (error) {
        console.error("Error Activities companyList : ", error);
      } finally {
        setLoading(false);
      }
    };

    companyList2();

    const fetchCompanyAdmin = async () => {
      try {
        const company = await authUtils.companyAdmin();
        // console.log("Company Admin : ", company.data.data);
        setCompanyAdmin(company);
      } catch (error) {
        console.error("Error Activities fetchCompanyAdmin : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyAdmin();
  }, []);

  // console.log("companyList", companyList);
  // console.log("companyAdmin", companyAdmin);

  const handleOpenDialog = () => {
    setFormValues({
      username: "",
      password: "",
      fullname: "",
      email: "",
      role: "admin", // Fixed role
      company_id: 0,
    });
    setSelectedOption(null);
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
      !errors.username &&
      !errors.password &&
      !errors.email &&
      formValues.company_id !== 0
    );
  };

  const handleSave = async () => {
    // console.log(formValues); // Log formValues to check the values before sending
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/",
        formValues
      );
      console.log("User added successfully:", response.data);

      if (response.data.status === 200) {
        // alert("User added successfully");
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

  if (!user || !checkUser || !companyList || !companyAdmin) {
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
              User Admin : Company (Super Admin)
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
                  Add User Admin
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
            <ExTable
              company={companyList.data}
              companyAdmin={companyAdmin.data}
            />
          </Box>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true}>
        <DialogTitle sx={{ fontSize: "2rem" }}>Add User Admin</DialogTitle>
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
            sx={{ mb: 1 }}
          />
          <Autocomplete
            options={companyList.data.data}
            getOptionLabel={(option) => option.companyName}
            value={selectedOption}
            onChange={(event, newValue) => {
              setSelectedOption(newValue);
              setFormValues((prevValues) => ({
                ...prevValues,
                company_id: newValue ? newValue.id : 0,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Company"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            )}
          />
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

export default CompanyUserSuper;
