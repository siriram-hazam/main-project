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
} from "@mui/material";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import authUtils from "../../../hooks/useAuth";
import ExTable from "./ExTable";

const EditProfileTable = () => {
  const [user, setUser] = useState(null);
  const [checkUser, setCheckUser] = useState(null);
  const [userCompanyList, setUserCompanyList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          {/* Add your form or content here */}
          <Typography>Form content goes here...</Typography>
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
            onClick={handleCloseDialog}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProfileTable;
