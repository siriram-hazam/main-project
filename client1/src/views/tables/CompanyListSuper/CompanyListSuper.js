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
} from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import authUtils from "../../../hooks/useAuth";
import ExTable from "./ExTable";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompanyListSuper = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [companyList, setCompanyList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    companyName: "",
    address: "",
    phone_number: "",
    email: "",
    dpo: "",
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

    const companyList = async () => {
      try {
        const company = await authUtils.companyList();

        setCompanyList(company);
      } catch (error) {
        console.error("Error Activities companyList : ", error);
      } finally {
        setLoading(false);
      }
    };

    companyList();
  }, []);

  const handleOpenDialog = () => {
    setFormValues({
      companyName: "",
      address: "",
      phone_number: "",
      email: "",
      dpo: "",
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
      case "companyName":
        if (value.length < 1) {
          error = "Company name is required.";
        }
        break;
      case "address":
        if (value.length < 1) {
          error = "Address is required.";
        }
        break;
      case "phone_number":
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(value)) {
          error = "Invalid phone number.";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "dpo":
        if (value.length < 1) {
          error = "DPO is required.";
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
      formValues.companyName &&
      formValues.address &&
      formValues.phone_number &&
      formValues.email &&
      formValues.dpo &&
      !errors.companyName &&
      !errors.address &&
      !errors.phone_number &&
      !errors.email &&
      !errors.dpo
    );
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_SIDE}/company`,
        formValues
      );
      // console.log("Company added successfully:", response.data);
      if (response.data.status === 200) {
        toast.success("Company added successfully!");
        setTimeout(() => {
          handleCloseDialog();
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Failed to add company. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to add company. Please try again.");
      console.error("Error adding company:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !checkUser || !companyList) {
    return <div>Initializing load user data...</div>;
  }

  return (
    <>
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
                <BusinessOutlinedIcon
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
                Company List (Super Admin)
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
                    Add Company
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
              <ExTable company={companyList.data} />
            </Box>
          </CardContent>
        </Card>
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth={true}>
          <DialogTitle sx={{ fontSize: "2rem" }}>Add Company</DialogTitle>
          <DialogContent>
            <Divider />
          </DialogContent>
          <DialogContent>
            <TextField
              label="Company Name"
              name="companyName"
              value={formValues.companyName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.companyName}
              helperText={errors.companyName}
            />
            <TextField
              label="Address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="Phone Number"
              name="phone_number"
              value={formValues.phone_number}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.phone_number}
              helperText={errors.phone_number}
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
            />
            <TextField
              label="DPO"
              name="dpo"
              value={formValues.dpo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              error={!!errors.dpo}
              helperText={errors.dpo}
              sx={{ mb: 3 }}
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
              Create Company
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <ToastContainer />
    </>
  );
};

export default CompanyListSuper;
