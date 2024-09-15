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
} from "@mui/material";

const ExTable = (company) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [password, setPassword] = useState("");

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
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSavePassword = async () => {
    try {
      await axios.post("/api/reset-password", {
        userId: selectedItem.id,
        newPassword: password,
      });
      closeResetPasswordDialog();
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${selectedItem.id}`, formValues);
      handleClose();
    } catch (error) {
      console.error("Error saving user data:", error);
    }
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
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          overflowX: "auto",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="textSecondary" variant="h6">
                Role
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                User ID
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {userList.userList.userslist.map((item) => (
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
                <Typography color="textSecondary" variant="h6">
                  {item.fullname}
                </Typography>
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
            </TableRow>
          ))} */}
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
                    value={formValues.role}
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
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExTable;
