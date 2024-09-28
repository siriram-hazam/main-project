// ExTable.js

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
  DialogTitle,
  Divider,
  Button,
  Switch,
  TextField,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import axios from "axios";
axios.defaults.withCredentials = true;

const ExTable = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [rowDialogOpen, setRowDialogOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_SIDE}/information/` + id
      );

      if (response.status === 200) {
        toast.success("Delete success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete failed");
      console.error("Error handleDelete : ", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/information/` + id
      );

      if (response.status === 200) {
        toast.success("Approve success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Approve failed");
      }
    } catch (error) {
      toast.error("Approve failed");
      console.error("Error handleApprove : ", error);
    }
  };

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
    setEditData(JSON.parse(JSON.stringify(item))); // Deep copy for editing
    setRowDialogOpen(true);
  };

  const handleRowDialogClose = () => {
    setRowDialogOpen(false);
    setRowData(null);
    setEditData(null);
  };

  const handleDownload = async (item) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_SIDE}/information/downloadexcel`,
        item,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Excel_Activity_${item.id}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/information/update/${rowData.id}`,
        editData
      );

      if (response.status === 200) {
        toast.success("Update success");
        setRowDialogOpen(false);
        window.location.reload();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
      console.error("Error updating the information:", error);
    }
  };

  return (
    <>
      <Box sx={{ overflowX: "auto" }}>
        <Table aria-label="Activity Table" sx={{ mt: 3 }}>
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
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography color="textSecondary" variant="h6">
                  Create Time
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6"></Typography>
              </TableCell>
              {props.user.data.users.role === "manager" ||
              props.user.data.users.role === "admin" ? (
                <>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Excel File
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="h6">
                      Approve
                    </Typography>
                  </TableCell>
                </>
              ) : null}
              {props.user.data.users.role === "superadmin" ? (
                <>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      Company
                    </Typography>
                  </TableCell>
                </>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.info.data.message.map((item) => (
              <TableRow
                key={item.id}
                onClick={(event) => {
                  if (event.target.type !== "checkbox") {
                    handleRowClick(item);
                  }
                }}
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
                        {(item.category_information || [])
                          .map((item) => item.category_relation.category)
                          .join(", ")}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {(item.category_information || [])
                          .map(
                            (item) =>
                              item.category_relation.department_relation
                                .departmentName
                          )
                          .join(", ")}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {item.user_account_relation.fullname}
                  </Typography>
                </TableCell>
                <TableCell align="center">
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
                <TableCell align="center">
                  <Typography variant="h6">
                    <Fab
                      color="primary"
                      variant="extended"
                      disabled={item.status === "success" ? true : false}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClickOpen(item.id);
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
                {props.user.data.users.role === "manager" ||
                props.user.data.users.role === "admin" ? (
                  <>
                    <TableCell align="center">
                      <Typography variant="h6">
                        <Fab
                          color="success"
                          variant="extended"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDownload(item);
                          }}
                          sx={{
                            mb: {
                              xs: 0,
                              sm: 0,
                              lg: 0,
                            },
                            backgroundColor: "green",
                            p: 1,
                          }}
                        >
                          <TableChartOutlinedIcon
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
                    <TableCell align="center">
                      <Typography variant="h6">
                        <Switch
                          checked={item.status === "success" ? true : false}
                          disabled={item.status === "success" ? true : false}
                          color="success"
                          onChange={(event) => {
                            event.stopPropagation();
                            handleSwitchChange(item.id)(event);
                          }}
                        />
                      </Typography>
                    </TableCell>
                  </>
                ) : null}
                {props.user.data.users.role === "superadmin" ? (
                  <TableCell>
                    <Typography variant="h6">
                      {item.company_relation.companyName}
                    </Typography>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <ToastContainer />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="primary"
            autoFocus
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Approve Confirmation Dialog */}
      <Dialog
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Enable Switch"}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Do you want to enable this switch?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAlertClose}
            color="primary"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmSwitch}
            color="primary"
            autoFocus
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Activity Details Dialog */}
      <Dialog
        open={rowDialogOpen}
        onClose={handleRowDialogClose}
        aria-labelledby="row-dialog-title"
        aria-describedby="row-dialog-description"
        maxWidth={false}
        fullWidth={true}
      >
        <DialogTitle
          id="row-dialog-title"
          style={{ paddingLeft: "2rem" }}
          sx={{ fontSize: "2rem" }}
        >
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
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            เอกสารที่ 1
          </Typography>
          <div
            id="row-dialog-description"
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {editData && (
              <>
                {/* General Information */}
                <TextField
                  label="Id"
                  value={editData.id}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Activity"
                  value={editData.activity_relation.activity}
                  InputProps={{
                    readOnly: editData.status !== "pending",
                  }}
                  onChange={(e) => {
                    const updatedData = { ...editData };
                    updatedData.activity_relation.activity = e.target.value;
                    setEditData(updatedData);
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Status"
                  value={editData.status}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Create Time"
                  value={new Date(editData.create_time).toLocaleString(
                    "th-TH",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }
                  )}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Created By"
                  value={editData.user_account_relation.fullname}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Company"
                  value={editData.company_relation.companyName}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />

                {/* Categories and POI Relations */}
                {(editData.category_information || []).map(
                  (categoryInfo, categoryIndex) => (
                    <div key={categoryIndex}>
                      <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                        Category: {categoryInfo.category_relation.category}
                      </Typography>

                      {/* Filter POIs for this category */}
                      {(
                        editData.poi_information.filter(
                          (poiInfo) =>
                            poiInfo.poi_relation.category_id ===
                            categoryInfo.category_id
                        ) || []
                      ).map((poiInfo, poiIndex) => (
                        <div key={poiIndex} style={{ paddingLeft: "2rem" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginTop: "1rem" }}
                          >
                            POI Information Set {poiIndex + 1}
                          </Typography>
                          {/* POI Info */}
                          <TextField
                            label={`POI Info ${poiIndex + 1}`}
                            value={(poiInfo.poi_relation.poi_info || [])
                              .map((info) => info.info_relation.info_)
                              .join(", ")}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) => {
                              const updatedData = { ...editData };
                              updatedData.poi_information[
                                poiIndex
                              ].poi_relation.poi_info[0].info_relation.info_ =
                                e.target.value;
                              setEditData(updatedData);
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                          />
                          {/* POI Owner */}
                          <TextField
                            label={`POI Owner ${poiIndex + 1}`}
                            value={(poiInfo.poi_relation.poi_info_owner || [])
                              .map((owner) => owner.info_owner_relation.owner_)
                              .join(", ")}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) => {
                              const updatedData = { ...editData };
                              updatedData.poi_information[
                                poiIndex
                              ].poi_relation.poi_info_owner[0].info_owner_relation.owner_ =
                                e.target.value;
                              setEditData(updatedData);
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                          />
                          {/* POI From */}
                          <TextField
                            label={`POI From ${poiIndex + 1}`}
                            value={(poiInfo.poi_relation.poi_info_from || [])
                              .map((from) => from.info_from_relation.from_)
                              .join(", ")}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) => {
                              const updatedData = { ...editData };
                              updatedData.poi_information[
                                poiIndex
                              ].poi_relation.poi_info_from[0].info_from_relation.from_ =
                                e.target.value;
                              setEditData(updatedData);
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                          />
                          {/* POI Format */}
                          <TextField
                            label={`POI Format ${poiIndex + 1}`}
                            value={(poiInfo.poi_relation.poi_info_format || [])
                              .map(
                                (format) => format.info_format_relation.format_
                              )
                              .join(", ")}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) => {
                              const updatedData = { ...editData };
                              updatedData.poi_information[
                                poiIndex
                              ].poi_relation.poi_info_format[0].info_format_relation.format_ =
                                e.target.value;
                              setEditData(updatedData);
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                          />
                          {/* POI Type */}
                          <TextField
                            label={`POI Type ${poiIndex + 1}`}
                            value={(poiInfo.poi_relation.poi_info_type || [])
                              .map((type) => type.info_type_relation.type_)
                              .join(", ")}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) => {
                              const updatedData = { ...editData };
                              updatedData.poi_information[
                                poiIndex
                              ].poi_relation.poi_info_type[0].info_type_relation.type_ =
                                e.target.value;
                              setEditData(updatedData);
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                          />
                          {/* POI Objective */}
                          <TextField
                            label={`POI Objective ${poiIndex + 1}`}
                            value={(
                              poiInfo.poi_relation.poi_info_objective || []
                            )
                              .map(
                                (objective) =>
                                  objective.info_objective_relation.objective_
                              )
                              .join(", ")}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) => {
                              const updatedData = { ...editData };
                              updatedData.poi_information[
                                poiIndex
                              ].poi_relation.poi_info_objective[0].info_objective_relation.objective_ =
                                e.target.value;
                              setEditData(updatedData);
                            }}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                          />
                          {/* POI Lawbase */}
                          {(poiInfo.poi_relation.poi_info_lawbase || []).map(
                            (lawbaseItem, lawbaseIndex) => (
                              <TextField
                                key={lawbaseIndex}
                                label={`POI Lawbase ${poiIndex + 1} - Lawbase ${
                                  lawbaseIndex + 1
                                }`}
                                value={
                                  lawbaseItem.info_lawbase_relation.lawBase_
                                }
                                InputProps={{
                                  readOnly: editData.status !== "pending",
                                }}
                                onChange={(e) => {
                                  const updatedData = { ...editData };
                                  updatedData.poi_information[
                                    poiIndex
                                  ].poi_relation.poi_info_lawbase[
                                    lawbaseIndex
                                  ].info_lawbase_relation.lawBase_ =
                                    e.target.value;
                                  setEditData(updatedData);
                                }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                              />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )
                )}

                {/* Other Information Sections */}
                {(editData.information_info_stored_period || []).map(
                  (period, index) => (
                    <TextField
                      key={index}
                      label={`Stored Period ${index + 1}`}
                      value={period.info_stored_period_relation.period_}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_stored_period[
                          index
                        ].info_stored_period_relation.period_ = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_placed || []).map(
                  (placed, index) => (
                    <TextField
                      key={index}
                      label={`Info Placed ${index + 1}`}
                      value={placed.info_placed_relation.placed_}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_placed[
                          index
                        ].info_placed_relation.placed_ = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_allowed_ps || []).map(
                  (allowedPs, index) => (
                    <TextField
                      key={index}
                      label={`Allowed PS ${index + 1}`}
                      value={allowedPs.info_allowed_ps_relation.allowed_ps_}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_allowed_ps[
                          index
                        ].info_allowed_ps_relation.allowed_ps_ = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_allowed_ps_condition || []).map(
                  (condition, index) => (
                    <TextField
                      key={index}
                      label={`Allowed PS Condition ${index + 1}`}
                      value={
                        condition.info_allowed_ps_condition_relation
                          .allowed_ps_condition_
                      }
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_allowed_ps_condition[
                          index
                        ].info_allowed_ps_condition_relation.allowed_ps_condition_ =
                          e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_access || []).map(
                  (access, index) => (
                    <TextField
                      key={index}
                      label={`Info Access ${index + 1}`}
                      value={access.info_access_relation.access_}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_access[
                          index
                        ].info_access_relation.access_ = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_access_condition || []).map(
                  (accessCondition, index) => (
                    <TextField
                      key={index}
                      label={`Access Condition ${index + 1}`}
                      value={
                        accessCondition.info_access_condition_relation
                          .access_condition_
                      }
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_access_condition[
                          index
                        ].info_access_condition_relation.access_condition_ =
                          e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_ps_usedbyrole_inside || []).map(
                  (usedByRole, index) => (
                    <TextField
                      key={index}
                      label={`Used by Role Inside ${index + 1}`}
                      value={
                        usedByRole.info_ps_usedbyrole_inside_relation
                          .use_by_role_
                      }
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_ps_usedbyrole_inside[
                          index
                        ].info_ps_usedbyrole_inside_relation.use_by_role_ =
                          e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_ps_sendto_outside || []).map(
                  (sendToOutside, index) => (
                    <TextField
                      key={index}
                      label={`Send to Outside ${index + 1}`}
                      value={
                        sendToOutside.info_ps_sendto_outside_relation.sendto_
                      }
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_ps_sendto_outside[
                          index
                        ].info_ps_sendto_outside_relation.sendto_ =
                          e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_ps_destroying || []).map(
                  (destroying, index) => (
                    <TextField
                      key={index}
                      label={`Destroying ${index + 1}`}
                      value={destroying.info_ps_destroying_relation.destroying_}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_ps_destroying[
                          index
                        ].info_ps_destroying_relation.destroying_ =
                          e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_info_ps_destroyer || []).map(
                  (destroyer, index) => (
                    <TextField
                      key={index}
                      label={`Destroyer ${index + 1}`}
                      value={destroyer.info_ps_destroyer_relation.destroyer_}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_info_ps_destroyer[
                          index
                        ].info_ps_destroyer_relation.destroyer_ =
                          e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_m_organization || []).map(
                  (organization, index) => (
                    <TextField
                      key={index}
                      label={`Organization ${index + 1}`}
                      value={organization.m_organization_relation.organization}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_m_organization[
                          index
                        ].m_organization_relation.organization = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_m_technical || []).map(
                  (technical, index) => (
                    <TextField
                      key={index}
                      label={`Technical ${index + 1}`}
                      value={technical.m_technical_relation.technical}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_m_technical[
                          index
                        ].m_technical_relation.technical = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {(editData.information_m_physical || []).map(
                  (physical, index) => (
                    <TextField
                      key={index}
                      label={`Physical ${index + 1}`}
                      value={physical.m_physical_relation.physical}
                      InputProps={{
                        readOnly: editData.status !== "pending",
                      }}
                      onChange={(e) => {
                        const updatedData = { ...editData };
                        updatedData.information_m_physical[
                          index
                        ].m_physical_relation.physical = e.target.value;
                        setEditData(updatedData);
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {editData && editData.status === "pending" && (
            <Button
              onClick={handleSave}
              color="primary"
              sx={{ fontSize: "1rem" }}
            >
              Save
            </Button>
          )}
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
