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

const ExTable = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [password, setPassword] = useState("");

  const validRoles = ["admin", "user", "manager"];

  useEffect(() => {
    if (selectedItem) {
      const role = validRoles.includes(selectedItem.role)
        ? selectedItem.role
        : "user";
      setInitialValues({ ...selectedItem, role });
      setFormValues({ ...selectedItem, role });
    }
  }, [selectedItem]);

  useEffect(() => {
    setIsSaveDisabled(
      JSON.stringify(initialValues) === JSON.stringify(formValues)
    );
  }, [formValues, initialValues]);

  const handleRowClick = (item) => {
    const role = validRoles.includes(item.role) ? item.role : "user";
    setSelectedItem({ ...item, role });
    setFormValues({ ...item, role });
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
              <Typography variant="h6">Id</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Role</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Company</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.companyAdmin.data.map((company) =>
            company.user_account
              .filter((user) => user.role === "admin")
              .map((admin) => (
                <TableRow
                  key={admin.id}
                  onClick={() => handleRowClick(admin)}
                  style={{ cursor: "pointer" }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="h6">{admin.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{admin.fullname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{admin.role}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{company.companyName}</Typography>
                  </TableCell>
                </TableRow>
              ))
          )}
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
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
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
