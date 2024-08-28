import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Switch,
} from "@mui/material";

// sx={{
//   // color: "grey",
//   mr: 1,
//   mb: {
//     xs: 1,
//     sm: 0,
//     lg: 0,
//   },
//   fontSize: "1.5rem",
// }}
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";

const handleDelete = async (id) => {
  try {
    await axios.delete("http://localhost:3001/api/information/" + id);
    window.location.reload();
    console.log("Delete success");
  } catch (error) {
    console.error("Error handleDelete : ", error);
  }
};

const handleApprove = async (id) => {
  try {
    await axios.put("http://localhost:3001/api/information/" + id);
    window.location.reload();
    console.log("Approve success");
  } catch (error) {
    console.error("Error handleApprove : ", error);
  }
};

const ExTable = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [rowDialogOpen, setRowDialogOpen] = useState(false);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedId);
    handleClose();
  };

  const handleSwitchChange = (id) => (event) => {
    if (event.target.checked) {
      setSelectedId(id);
      setAlertOpen(true);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setSelectedId(null);
  };

  const handleConfirmSwitch = () => {
    handleApprove(selectedId);
    handleAlertClose();
  };

  const handleRowClick = (item) => {
    setRowData(item);
    setRowDialogOpen(true);
  };

  const handleRowDialogClose = () => {
    setRowDialogOpen(false);
    setRowData(null);
  };

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
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
                Name & Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Created By
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="textSecondary" variant="h6">
                Create Time
              </Typography>
            </TableCell>
            <TableCell align="left">
              <Typography color="textSecondary" variant="h6"></Typography>
            </TableCell>
            {props.user.data.users.role === "manager" ||
            props.user.data.users.role === "admin" ? (
              <TableCell align="left">
                <Typography color="textSecondary" variant="h6">
                  Approve
                </Typography>
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.info.data.message.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => handleRowClick(item)}
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
                        fontWeight: "500",
                      }}
                    >
                      {item.activity_relation.activity}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.category_information.map(
                        (item) => item.category_relation.category
                      )}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {item.category_information.map(
                        (item) =>
                          item.category_relation.department_relation
                            .departmentName
                      )}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {item.user_account_relation.fullname}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor:
                      item.status === "success"
                        ? "green"
                        : item.status === "pending"
                        ? "orange"
                        : "grey",
                    color: "#fff",
                  }}
                  size="small"
                  label={item.status}
                ></Chip>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">
                  {new Date(item.create_time).toLocaleString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">
                  <Fab
                    color="primary"
                    variant="extended"
                    // disabled={item.status === "success" ? true : false}
                    onClick={() => handleClickOpen(item.id)}
                    sx={{
                      mr: 1,
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
                          xs: 1,
                          sm: 0,
                          lg: 0,
                        },
                        fontSize: "1.5rem",
                      }}
                    />
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "13px",
                      }}
                    >
                      {/* Delete */}
                    </Typography>
                  </Fab>
                </Typography>
              </TableCell>
              {props.user.data.users.role === "manager" ||
              props.user.data.users.role === "admin" ? (
                <TableCell align="left">
                  <Typography variant="h6">
                    <Switch
                      checked={item.status === "success" ? true : false}
                      disabled={item.status === "success" ? true : false}
                      color="success"
                      onChange={(event) => handleSwitchChange(item.id)(event)}
                    />
                  </Typography>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enable Switch"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to enable this switch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSwitch} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={rowDialogOpen}
        onClose={handleRowDialogClose}
        aria-labelledby="row-dialog-title"
        aria-describedby="row-dialog-description"
        maxWidth={false}
        fullWidth={true}
      >
        <DialogTitle id="row-dialog-title" sx={{ fontSize: "2rem" }}>
          <FileOpenOutlinedIcon
            sx={{
              mr: 1,
              mb: {
                xs: 1,
                sm: 0,
                lg: 0,
              },
              fontSize: "2.7rem",
            }}
          />
          {"Activity Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="row-dialog-description"
            sx={{ fontSize: "1rem" }}
          >
            {console.log(rowData)}
            {rowData && (
              <>
                <p>
                  <strong>Id:</strong> {rowData.id}
                </p>
                <p>
                  <strong>Activity:</strong>{" "}
                  {rowData.activity_relation.activity}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {rowData.category_information
                    .map((item) => item.category_relation.category)
                    .join(", ")}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {rowData.category_information
                    .map(
                      (item) =>
                        item.category_relation.department_relation
                          .departmentName
                    )
                    .join(", ")}
                </p>
                <p>
                  <strong>Created By:</strong>{" "}
                  {rowData.user_account_relation.fullname}
                </p>
                <p>
                  <strong>Status:</strong> {rowData.status}
                </p>
                <p>
                  <strong>Create Time:</strong>{" "}
                  {new Date(rowData.create_time).toLocaleString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRowDialogClose}
            color="primary"
            sx={{ fontSize: "1rem" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExTable;
