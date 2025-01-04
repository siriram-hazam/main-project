import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fab,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const ExTable = (userList) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setInitialValues({ ...selectedItem });
      setFormValues({ ...selectedItem });
    }
  }, [selectedItem]);

  useEffect(() => {
    setIsSaveDisabled(
      JSON.stringify(initialValues) === JSON.stringify(formValues)
    );
  }, [formValues, initialValues]);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setFormValues((prevValues) => ({ ...prevValues, role: newRole }));
  };

  const openResetPasswordDialog = () => {
    setIsResetPasswordDialogOpen(true);
  };

  const closeResetPasswordDialog = () => {
    setIsResetPasswordDialogOpen(false);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Validate password
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSavePassword = async () => {
    if (passwordError) return;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/user/${selectedItem.id}`,
        {
          password: password,
        }
      );

      if (response.data.status === 200) {
        // console.log("Password reset successfully:", response.data);
        toast.success("Password reset successfully!");
        closeResetPasswordDialog();
      } else {
        toast.error("Failed to reset password. Please try again.");
      }

      // console.log(response);
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      console.error("Error resetting password:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/user/${selectedItem.id}`,
        formValues
      );
      handleClose();
      if (response.data.status === 200) {
        toast.success("User updated successfully!");
        // console.log("User updated successfully:", response.data);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Failed to update user. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
      console.error("Error saving user data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_SIDE}/user/${itemToDelete.id}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully!");
        setTimeout(() => {
          closeDeleteDialog();
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Failed to delete. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to delete. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  const openDeleteDialog = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Asia/Bangkok",
    }).format(date);
  };

  return (
    <>
      <ToastContainer />
      <Table
        aria-label="simple table"
        sx={{
          // whiteSpace: "nowrap",
          overflowX: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">No.</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Role</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">User ID</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.userList.userslist
            .filter(
              // (item) => item.role !== "admin" && item.role !== "superadmin"
              (item) => item.role !== "superadmin"
            )
            .map((item) => (
              <TableRow
                key={item.id}
                onClick={() => handleRowClick(item)}
                style={{ cursor: "pointer" }}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {item.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{item.fullname}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">{item.role}</Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {item.username}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {formatDate(item.create_time)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">
                    <Fab
                      color="primary"
                      variant="extended"
                      onClick={(event) => {
                        event.stopPropagation();
                        openDeleteDialog(item);
                      }}
                      sx={{
                        mb: {
                          xs: 1,
                          sm: 0,
                          lg: 0,
                        },
                        backgroundColor: "red",
                        p: 1,
                      }}
                    >
                      <DeleteForeverOutlinedIcon
                        sx={{
                          mb: {
                            xs: 0,
                            sm: 0,
                            lg: 0,
                          },
                          fontSize: "1.5rem",
                        }}
                      />
                    </Fab>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle sx={{ fontSize: "2rem" }}>User Details</DialogTitle>
        <DialogContent>
          <Divider />
        </DialogContent>
        <DialogContent>
          {selectedItem && (
            <DialogContentText
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <>
                <Typography
                  variant="h6"
                  sx={{
                    color: "black",
                    fontSize: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    mb: 2,
                  }}
                >
                  Created : {formatDate(selectedItem.create_time)}
                </Typography>

                <TextField
                  label="ID"
                  name="id"
                  value={formValues.id}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="User ID"
                  name="username"
                  value={formValues.username}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Full Name"
                  name="fullname"
                  value={formValues.fullname}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formValues.email}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <FormControl variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    name="role"
                    value={formValues.role || ""}
                    onChange={handleRoleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  onClick={openResetPasswordDialog}
                  color="primary"
                  sx={{ fontSize: "1rem", mb: 2 }}
                >
                  Reset Password
                </Button>
              </>
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Close
          </Button>

          <Button
            onClick={handleSave}
            color="primary"
            sx={{ fontSize: "1rem" }}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isResetPasswordDialogOpen}
        onClose={closeResetPasswordDialog}
      >
        <DialogTitle sx={{ fontSize: "1.5rem" }}>Reset Password</DialogTitle>
        <DialogContent>
          <Divider />
        </DialogContent>
        <DialogContent>
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            sx={{ fontSize: "1rem" }}
            error={!!passwordError}
            helperText={passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeResetPasswordDialog}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSavePassword}
            color="primary"
            sx={{ fontSize: "1rem" }}
            disabled={!!passwordError}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDeleteDialog}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExTable;
