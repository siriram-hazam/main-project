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
  Fab,
} from "@mui/material";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const ExTable = (comapany) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  console.log(comapany.company.data);

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

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/company/${selectedItem.id}`,
        formValues
      );
      if (response.status === 200) {
        window.location.reload();
      }
      handleClose();
    } catch (error) {
      console.error("Error saving user data:", error);
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

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/company/${itemToDelete.id}`
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      closeDeleteDialog();
    }
  };

  return (
    <>
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
              <Typography variant="h6">Id</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Address</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">DPO</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6"></Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comapany.company.data.map((item) => (
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
                    fontWeight: "500",
                  }}
                >
                  {item.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "600",
                  }}
                >
                  {item.companyName}
                </Typography>
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
                      {item.address}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.phone_number}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">{item.dpo}</Typography>
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
        <DialogTitle sx={{ fontSize: "2rem" }}>Company Details</DialogTitle>
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
                <TextField
                  label="ID"
                  name="id"
                  value={formValues.id}
                  disabled
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Name"
                  name="companyName"
                  value={formValues.companyName}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="DPO"
                  name="dpo"
                  value={formValues.dpo}
                  onChange={handleInputChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
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
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle sx={{ fontSize: "1.5rem" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company?
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
