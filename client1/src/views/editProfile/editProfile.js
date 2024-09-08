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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

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

  const handlePasswordChange = () => {
    // Password change logic
    console.log("Passwords:", passwords);
    setPasswordDialogOpen(false);
    resetPasswordFields();
  };

  const handlePasswordDialogChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => {
      const updatedPasswords = {
        ...prevPasswords,
        [name]: value,
      };
      validatePasswords(updatedPasswords);
      return updatedPasswords;
    });
  };

  const validatePasswords = (passwords) => {
    const { oldPassword, newPassword, confirmNewPassword } = passwords;
    const isValid =
      oldPassword &&
      newPassword &&
      confirmNewPassword &&
      newPassword === confirmNewPassword;
    setIsSaveEnabled(isValid);
  };

  const resetPasswordFields = () => {
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setIsSaveEnabled(false);
  };

  const openPasswordDialog = () => {
    resetPasswordFields();
    setPasswordDialogOpen(true);
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
              <Box sx={{ display: "flex", flexDirection: "column", mb: "2" }}>
                <DialogContentText sx={{ mb: 2 }}>
                  Personal Information
                </DialogContentText>
                <TextField
                  label="User Id"
                  name="user_id"
                  value={user.id}
                  onChange={handleChange}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="User Name"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
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
                <Button
                  onClick={openPasswordDialog}
                  color="primary"
                  sx={{ fontSize: "1rem", mb: 2 }}
                >
                  Change Password
                </Button>

                <DialogContentText sx={{ mb: 2 }}>
                  Company Information
                </DialogContentText>
                <TextField
                  label="Company Id"
                  name="company_id"
                  value={user.company_id}
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
                  sx={{ fontSize: "1rem" }}
                  disabled={!isChanged}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={passwordDialogOpen}
        onClose={() => {
          setPasswordDialogOpen(false);
          resetPasswordFields();
        }}
      >
        <DialogTitle sx={{ fontSize: "1.25rem" }}>Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1.2 }}>
            Please enter your old password and new password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="oldPassword"
            label="Old Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwords.oldPassword}
            onChange={handlePasswordDialogChange}
          />
          <TextField
            margin="dense"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwords.newPassword}
            onChange={handlePasswordDialogChange}
          />
          <TextField
            margin="dense"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwords.confirmNewPassword}
            onChange={handlePasswordDialogChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPasswordDialogOpen(false);
              resetPasswordFields();
            }}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handlePasswordChange}
            color="primary"
            sx={{ fontSize: "1rem" }}
            disabled={!isSaveEnabled}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProfile;
