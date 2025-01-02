// ExTable.jsx

import React, { useState, useEffect } from "react";
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
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import axios from "axios";
axios.defaults.withCredentials = true;

const ExTable = (props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [openRowDialog, setOpenRowDialog] = useState(false);
  const [categoryToPois, setCategoryToPois] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false);

  // Map categories to their POI relations for display
  useEffect(() => {
    if (editData && editData.poi_information) {
      const mapping = {};
      editData.poi_information.forEach((poiInfo, poiIndex) => {
        const categoryName = poiInfo.category_relation?.category || "Unknown";
        if (!mapping[categoryName]) {
          mapping[categoryName] = [];
        }
        mapping[categoryName].push({
          ...poiInfo,
          poiGlobalIndex: poiIndex,
        });
      });
      setCategoryToPois(mapping);
    }
  }, [editData]);

  // Helper function to set nested values immutably
  const setNestedValue = (obj, path, value) => {
    const keys = path
      .replace(/\[(\w+)\]/g, ".$1") // Convert indexes to properties
      .split(".")
      .filter(Boolean);

    const updatedObj = { ...obj };
    let current = updatedObj;

    keys.slice(0, -1).forEach((key) => {
      if (!current[key]) {
        current[key] = isNaN(parseInt(key)) ? {} : [];
      } else {
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };
      }
      current = current[key];
    });

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current)) {
      current[parseInt(lastKey)] = value;
    } else {
      current[lastKey] = value;
    }

    return updatedObj;
  };

  // Delete an activity
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_SIDE}/information/${id}`
      );

      if (response.status === 200) {
        toast.success("Activity deleted successfully!");
        setTimeout(() => {
          window.location.reload(); // Refresh the page or update the data
        }, 2000);
      } else {
        toast.error("Failed to delete activity. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to delete activity. Please try again.");
      console.error("Error in handleDelete:", error);
    }
  };

  // Approve an activity
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/information/${id}` // Adjust endpoint if needed
      );

      if (response.status === 200) {
        toast.success("Activity approve successfully!");
        setTimeout(() => {
          window.location.reload(); // Refresh the page or update the data
        }, 2000);
      } else {
        toast.error("Failed to delete activity. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to delete activity. Please try again.");
      console.error("Error in handleApprove:", error);
    }
  };

  // Open Delete Confirmation Dialog
  const handleOpenDeleteDialog = (id) => {
    setSelectedId(id);
    setOpenDeleteDialog(true);
  };

  // Close Delete Confirmation Dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedId(null);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    handleDelete(selectedId);
    handleCloseDeleteDialog();
  };

  // Open Approve Confirmation Dialog
  const handleOpenApproveDialog = (id) => {
    setSelectedId(id);
    setOpenApproveDialog(true);
  };

  // Close Approve Confirmation Dialog
  const handleCloseApproveDialog = () => {
    setOpenApproveDialog(false);
    setSelectedId(null);
  };

  // Confirm Approve
  const handleConfirmApprove = () => {
    handleApprove(selectedId);
    handleCloseApproveDialog();
  };

  // Open Row Dialog for Details
  const handleRowClick = (item) => {
    setRowData(item);
    setEditData(JSON.parse(JSON.stringify(item))); // Deep copy for editing
    setIsDataChanged(false);
    setOpenRowDialog(true);
  };

  // Close Row Dialog
  const handleCloseRowDialog = () => {
    setOpenRowDialog(false);
    setRowData(null);
    setEditData(null);
    setCategoryToPois({});
    setIsDataChanged(false);
  };

  // Handle Input Changes in Dialog
  const handleInputChange = (e, fieldPath) => {
    const value = e.target.value;
    const updatedData = setNestedValue(editData, fieldPath, value);
    setEditData(updatedData);
    setIsDataChanged(true);
  };

  // Download Excel File
  const handleDownload = async (item, user) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_SIDE}/information/downloadexcel`,
        // { id: item.id }, // Send only the necessary data
        { item, user }, // Send the whole item object
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Item:", item);
      // console.log("User:", user);

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `Excel_Activity_${item.id}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up the URL object
      toast.success("Your download has started.");
    } catch (error) {
      toast.error("Failed to download file. Please try again.");
      console.error("Error downloading the file:", error);
    }
  };

  const handleSave = async () => {
    try {
      // console.log("Updating information with data:", editData);
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/information/updateInfo/${editData.id}`,
        {
          ...editData,
          // category_information: editData.category_information.map(
          //   (category) => ({
          //     where: {
          //       information_id_category_id: {
          //         information_id: editData.id,
          //         category_id: category.category_id,
          //       },
          //     },
          //     create: {
          //       category_relation: {
          //         connectOrCreate: {
          //           where: { id: category.category_relation.id },
          //           create: {
          //             category: category.category_relation.category,
          //             department_relation: {
          //               connect: {
          //                 id: category.category_relation.department_relation.id,
          //               },
          //             },
          //           },
          //         },
          //       },
          //     },
          //   })
          // ),
          // poi_information: editData.poi_information.map((poi) => ({
          //   poi_relation: {
          //     connectOrCreate: {
          //       where: { id: poi.poi_relation.id },
          //       create: {
          //         name: poi.poi_relation.name || "Default Name",
          //         poi_info: poi.poi_relation.poi_info.map((info) => ({
          //           info_relation: {
          //             connectOrCreate: {
          //               where: { id: info.info_relation.id },
          //               create: { info_: info.info_relation.info_ },
          //             },
          //           },
          //         })),
          //         poi_info_owner: poi.poi_relation.poi_info_owner.map(
          //           (owner) => ({
          //             info_owner_relation: {
          //               connectOrCreate: {
          //                 where: { id: owner.info_owner_relation.id },
          //                 create: { owner_: owner.info_owner_relation.owner_ },
          //               },
          //             },
          //           })
          //         ),
          //         poi_info_from: poi.poi_relation.poi_info_from.map((from) => ({
          //           info_from_relation: {
          //             connectOrCreate: {
          //               where: { id: from.info_from_relation.id },
          //               create: { from_: from.info_from_relation.from_ },
          //             },
          //           },
          //         })),
          //         poi_info_format: poi.poi_relation.poi_info_format.map(
          //           (format) => ({
          //             info_format_relation: {
          //               connectOrCreate: {
          //                 where: { id: format.info_format_relation.id },
          //                 create: {
          //                   format_: format.info_format_relation.format_,
          //                 },
          //               },
          //             },
          //           })
          //         ),
          //         poi_info_type: poi.poi_relation.poi_info_type.map((type) => ({
          //           info_type_relation: {
          //             connectOrCreate: {
          //               where: { id: type.info_type_relation.id },
          //               create: { type_: type.info_type_relation.type_ },
          //             },
          //           },
          //         })),
          //         poi_info_objective: poi.poi_relation.poi_info_objective.map(
          //           (objective) => ({
          //             info_objective_relation: {
          //               connectOrCreate: {
          //                 where: { id: objective.info_objective_relation.id },
          //                 create: {
          //                   objective_:
          //                     objective.info_objective_relation.objective_,
          //                 },
          //               },
          //             },
          //           })
          //         ),
          //         poi_info_lawbase: poi.poi_relation.poi_info_lawbase.map(
          //           (lawbase) => ({
          //             info_lawbase_relation: {
          //               connectOrCreate: {
          //                 where: { id: lawbase.info_lawbase_relation.id },
          //                 create: {
          //                   lawBase_: lawbase.info_lawbase_relation.lawBase_,
          //                 },
          //               },
          //             },
          //           })
          //         ),
          //       },
          //     },
          //   },
          // })),
        }
      );
      if (response.status === 200) {
        setIsDataChanged(false);
        toast.success("Changes to the activity have been updated.");
        setTimeout(() => {
          // window.location.reload();
        }, 2000);

        // อัปเดตข้อมูลในตารางหรือทำการแจ้งเตือนผู้ใช้
      } else {
        toast.error("Failed to update the activity. Please try again.");
        console.error("Error saving data:", response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update the activity. Please try again.");
      console.error("Error saving data:", error);
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
              {["manager", "admin"].includes(props.user.data.users.role) && (
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
              )}
              {props.user.data.users.role === "superadmin" && (
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    Company
                  </Typography>
                </TableCell>
              )}
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
                          .map(
                            (categoryItem) =>
                              categoryItem.category_relation.category
                          )
                          .join(", ")}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {item.category_information[0]?.category_relation
                          ?.department_relation?.departmentName || "Unknown"}
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
                  />
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
                  <Fab
                    color="primary"
                    variant="extended"
                    disabled={item.status === "success"}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleOpenDeleteDialog(item.id);
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
                        fontSize: "1.5rem",
                      }}
                    />
                  </Fab>
                </TableCell>
                {["manager", "admin"].includes(props.user.data.users.role) && (
                  <>
                    <TableCell align="center">
                      <Fab
                        color="success"
                        variant="extended"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDownload(item, props.user.data.users);
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
                            fontSize: "1.5rem",
                          }}
                        />
                      </Fab>
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        checked={item.status === "success"}
                        disabled={item.status === "success"}
                        color="success"
                        onChange={(event) => {
                          event.stopPropagation();
                          handleOpenApproveDialog(item.id);
                        }}
                      />
                    </TableCell>
                  </>
                )}
                {props.user.data.users.role === "superadmin" && (
                  <TableCell>
                    <Typography variant="h6">
                      {item.company_relation.companyName}
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <ToastContainer />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete this item?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
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
        open={openApproveDialog}
        onClose={handleCloseApproveDialog}
        aria-labelledby="approve-dialog-title"
        aria-describedby="approve-dialog-description"
      >
        <DialogTitle id="approve-dialog-title">
          {"Approve Activity"}
        </DialogTitle>
        <DialogContent>
          <Typography id="approve-dialog-description">
            Do you want to approve this activity?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseApproveDialog}
            color="primary"
            sx={{
              fontSize: "0.8rem",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmApprove}
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
        open={openRowDialog}
        onClose={handleCloseRowDialog}
        aria-labelledby="row-dialog-title"
        aria-describedby="row-dialog-description"
        maxWidth="md"
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
              fontSize: "2.7rem",
            }}
          />
          {"Activity Details"}
        </DialogTitle>
        <DialogContent dividers>
          <Divider sx={{ mt: 2, mb: 2 }} />
          {editData && (
            <>
              {/* General Information */}
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="general-info-content"
                  id="general-info-header"
                >
                  <Typography variant="h6">General Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {/* Id */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Id"
                        value={editData.id}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    {/* Activity */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Activity"
                        value={editData.activity_relation.activity}
                        InputProps={{
                          readOnly: editData.status !== "pending",
                        }}
                        onChange={(e) =>
                          handleInputChange(e, "activity_relation.activity")
                        }
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    {/* Status */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Status"
                        value={editData.status}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    {/* Create Time */}
                    <Grid item xs={12} sm={6}>
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
                      />
                    </Grid>
                    {/* Created By */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Created By"
                        value={editData.user_account_relation.fullname}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    {/* Company */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Company"
                        value={editData.company_relation.companyName}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Categories and POI Relations */}
              {Object.entries(categoryToPois).map(
                ([categoryName, pois], categoryIndex) => (
                  <Accordion key={categoryIndex} defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`category-content-${categoryIndex}`}
                      id={`category-header-${categoryIndex}`}
                    >
                      <Typography variant="h6">
                        Category: {categoryName}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {pois.map((poiInfo, poiIndex) => (
                        <Accordion
                          key={poiIndex}
                          defaultExpanded
                          sx={{ marginBottom: 2 }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`poi-content-${categoryIndex}-${poiIndex}`}
                            id={`poi-header-${categoryIndex}-${poiIndex}`}
                          >
                            <Typography variant="subtitle1">
                              POI Information Set {poiIndex + 1}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={2}>
                              {/* POI Info */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`POI Info`}
                                  value={(poiInfo.poi_relation.poi_info || [])
                                    .map((info) => info.info_relation.info_)
                                    .join(", ")}
                                  InputProps={{
                                    readOnly: editData.status !== "pending",
                                  }}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info[0].info_relation.info_`
                                    )
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                />
                              </Grid>

                              {/* POI Owner */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`POI Owner`}
                                  value={(
                                    poiInfo.poi_relation.poi_info_owner || []
                                  )
                                    .map(
                                      (owner) =>
                                        owner.info_owner_relation.owner_
                                    )
                                    .join(", ")}
                                  InputProps={{
                                    readOnly: editData.status !== "pending",
                                  }}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info_owner[0].info_owner_relation.owner_`
                                    )
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                />
                              </Grid>

                              {/* POI From */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`POI From`}
                                  value={(
                                    poiInfo.poi_relation.poi_info_from || []
                                  )
                                    .map(
                                      (from) => from.info_from_relation.from_
                                    )
                                    .join(", ")}
                                  InputProps={{
                                    readOnly: editData.status !== "pending",
                                  }}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info_from[0].info_from_relation.from_`
                                    )
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                />
                              </Grid>

                              {/* POI Format */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`POI Format`}
                                  value={(
                                    poiInfo.poi_relation.poi_info_format || []
                                  )
                                    .map(
                                      (format) =>
                                        format.info_format_relation.format_
                                    )
                                    .join(", ")}
                                  InputProps={{
                                    readOnly: editData.status !== "pending",
                                  }}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info_format[0].info_format_relation.format_`
                                    )
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                />
                              </Grid>

                              {/* POI Type */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`POI Type`}
                                  value={(
                                    poiInfo.poi_relation.poi_info_type || []
                                  )
                                    .map(
                                      (type) => type.info_type_relation.type_
                                    )
                                    .join(", ")}
                                  InputProps={{
                                    readOnly: editData.status !== "pending",
                                  }}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info_type[0].info_type_relation.type_`
                                    )
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                />
                              </Grid>

                              {/* POI Objective */}
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label={`POI Objective`}
                                  value={(
                                    poiInfo.poi_relation.poi_info_objective ||
                                    []
                                  )
                                    .map(
                                      (objective) =>
                                        objective.info_objective_relation
                                          .objective_
                                    )
                                    .join(", ")}
                                  InputProps={{
                                    readOnly: editData.status !== "pending",
                                  }}
                                  onChange={(e) =>
                                    handleInputChange(
                                      e,
                                      `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info_objective[0].info_objective_relation.objective_`
                                    )
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                />
                              </Grid>

                              {/* POI Lawbase */}
                              {(
                                poiInfo.poi_relation.poi_info_lawbase || []
                              ).map((lawbaseEntry, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                  <TextField
                                    label={`POI Lawbase ${index + 1}`}
                                    value={
                                      lawbaseEntry.info_lawbase_relation
                                        .lawBase_ || ""
                                    }
                                    InputProps={{
                                      readOnly: editData.status !== "pending",
                                    }}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        `poi_information[${poiInfo.poiGlobalIndex}].poi_relation.poi_info_lawbase[${index}].info_lawbase_relation.lawBase_`
                                      )
                                    }
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )
              )}

              {/* Additional Information Sections */}
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="additional-info-content"
                  id="additional-info-header"
                >
                  <Typography variant="h6">Additional Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {/* Stored Period */}
                    {(editData.information_info_stored_period || []).map(
                      (period, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Stored Period ${index + 1}`}
                            value={period.info_stored_period_relation.period_}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_stored_period[${index}].info_stored_period_relation.period_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Info Placed */}
                    {(editData.information_info_placed || []).map(
                      (placed, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Info Placed ${index + 1}`}
                            value={placed.info_placed_relation.placed_}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_placed[${index}].info_placed_relation.placed_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Allowed PS */}
                    {(editData.information_info_allowed_ps || []).map(
                      (allowedPs, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Allowed PS ${index + 1}`}
                            value={
                              allowedPs.info_allowed_ps_relation.allowed_ps_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_allowed_ps[${index}].info_allowed_ps_relation.allowed_ps_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Allowed PS Condition */}
                    {(editData.information_info_allowed_ps_condition || []).map(
                      (condition, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Allowed PS Condition ${index + 1}`}
                            value={
                              condition.info_allowed_ps_condition_relation
                                .allowed_ps_condition_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_allowed_ps_condition[${index}].info_allowed_ps_condition_relation.allowed_ps_condition_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Info Access */}
                    {(editData.information_info_access || []).map(
                      (access, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Info Access ${index + 1}`}
                            value={access.info_access_relation.access_}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_access[${index}].info_access_relation.access_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Access Condition */}
                    {(editData.information_info_access_condition || []).map(
                      (accessCondition, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Access Condition ${index + 1}`}
                            value={
                              accessCondition.info_access_condition_relation
                                .access_condition_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_access_condition[${index}].info_access_condition_relation.access_condition_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Used by Role Inside */}
                    {(editData.information_info_ps_usedbyrole_inside || []).map(
                      (usedByRole, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Used by Role Inside ${index + 1}`}
                            value={
                              usedByRole.info_ps_usedbyrole_inside_relation
                                .use_by_role_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_ps_usedbyrole_inside[${index}].info_ps_usedbyrole_inside_relation.use_by_role_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Send to Outside */}
                    {(editData.information_info_ps_sendto_outside || []).map(
                      (sendToOutside, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Send to Outside ${index + 1}`}
                            value={
                              sendToOutside.info_ps_sendto_outside_relation
                                .sendto_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_ps_sendto_outside[${index}].info_ps_sendto_outside_relation.sendto_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Destroying */}
                    {(editData.information_info_ps_destroying || []).map(
                      (destroying, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Destroying ${index + 1}`}
                            value={
                              destroying.info_ps_destroying_relation.destroying_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_ps_destroying[${index}].info_ps_destroying_relation.destroying_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Destroyer */}
                    {(editData.information_info_ps_destroyer || []).map(
                      (destroyer, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Destroyer ${index + 1}`}
                            value={
                              destroyer.info_ps_destroyer_relation.destroyer_
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_info_ps_destroyer[${index}].info_ps_destroyer_relation.destroyer_`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Organization Measures */}
                    {(editData.information_m_organization || []).map(
                      (organization, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Organization Measure ${index + 1}`}
                            value={
                              organization.m_organization_relation.organization
                            }
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_m_organization[${index}].m_organization_relation.organization`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Technical Measures */}
                    {(editData.information_m_technical || []).map(
                      (technical, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Technical Measure ${index + 1}`}
                            value={technical.m_technical_relation.technical}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_m_technical[${index}].m_technical_relation.technical`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}

                    {/* Physical Measures */}
                    {(editData.information_m_physical || []).map(
                      (physical, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <TextField
                            label={`Physical Measure ${index + 1}`}
                            value={physical.m_physical_relation.physical}
                            InputProps={{
                              readOnly: editData.status !== "pending",
                            }}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `information_m_physical[${index}].m_physical_relation.physical`
                              )
                            }
                            variant="outlined"
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editData && editData.status === "pending" && (
            <Button
              onClick={handleSave}
              color="primary"
              sx={{ fontSize: "1rem" }}
              disabled={true}
              // disabled={!isDataChanged} // Disable button if no changes made
            >
              Update
            </Button>
          )}
          <Button
            onClick={handleCloseRowDialog}
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
