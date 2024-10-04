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
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [rowDialogOpen, setRowDialogOpen] = useState(false);
  const [categoryToPois, setCategoryToPois] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false);

  // State to hold category name to ID mapping
  const [categoryMap, setCategoryMap] = useState({});

  // Fetch categories on component mount
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_SERVER_SIDE}/categories`
  //       );
  //       const categories = response.data.message; // Adjust based on your API response structure
  //       const map = {};
  //       categories.forEach((category) => {
  //         map[category.category] = category.id;
  //       });
  //       setCategoryMap(map);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //       toast.error("Failed to fetch categories.");
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  useEffect(() => {
    if (editData && editData.poi_information) {
      const categoryMapping = {};
      editData.poi_information.forEach((poiInfo, poiIndex) => {
        const categoryName = poiInfo.category_relation?.category || "Unknown";
        if (!categoryMapping[categoryName]) {
          categoryMapping[categoryName] = [];
        }
        categoryMapping[categoryName].push({
          ...poiInfo,
          poiGlobalIndex: poiIndex,
        });
      });
      setCategoryToPois(categoryMapping);
    }
  }, [editData]);

  // Helper function to set nested values in the editData state
  const setNestedValue = (obj, path, value) => {
    const keys = path
      .replace(/\[(\w+)\]/g, ".$1") // Convert indexes to properties
      .split(".")
      .filter(Boolean);

    let current = obj;
    keys.slice(0, -1).forEach((key) => {
      if (!(key in current)) {
        // Initialize the next key if it doesn't exist
        current[key] = isNaN(parseInt(key)) ? {} : [];
      }
      current = current[key];
    });

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current)) {
      current[parseInt(lastKey)] = value;
    } else {
      current[lastKey] = value;
    }
  };

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
    setIsDataChanged(false); // Reset the change flag
    setRowDialogOpen(true);
  };

  const handleRowDialogClose = () => {
    setRowDialogOpen(false);
    setRowData(null);
    setEditData(null);
    setCategoryToPois({});
    setIsDataChanged(false); // Reset the change flag
  };

  const handleInputChange = (e, fieldPath) => {
    const updatedData = JSON.parse(JSON.stringify(editData)); // Deep copy to avoid mutations
    setNestedValue(updatedData, fieldPath, e.target.value);
    setEditData(updatedData);
    setIsDataChanged(true); // Mark data as changed when input is modified
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
      toast.error("Download failed");
    }
  };

  const handleSave = async () => {
    try {
      // Deep copy to avoid mutating the original editData
      const dataToSend = JSON.parse(JSON.stringify(editData));

      // Remove fields that should not be sent to the backend
      delete dataToSend.id;
      delete dataToSend.create_time;
      delete dataToSend.user_account_relation;
      delete dataToSend.company_relation;
      delete dataToSend.department_relation;

      // Transform activity_relation to activity_id
      if (dataToSend.activity_relation) {
        dataToSend.activity_id = dataToSend.activity_relation.id;
        delete dataToSend.activity_relation;
      }

      // Transform department_relation to department_id
      if (dataToSend.department_relation) {
        dataToSend.department_id = dataToSend.department_relation.id;
        delete dataToSend.department_relation;
      }

      // Transform category_information
      if (dataToSend.category_information) {
        dataToSend.category_information = {
          deleteMany: {},
          create: dataToSend.category_information.map((categoryItem) => ({
            category_id:
              categoryMap[categoryItem.category_relation.category] || 0, // Use the categoryMap to get the ID
          })),
        };
      }

      // Transform poi_information
      if (dataToSend.poi_information) {
        dataToSend.poi_information = {
          deleteMany: {},
          create: dataToSend.poi_information.map((poiItem) => ({
            information_id: rowData.id, // Assuming informationId is the current row's id
            poi_id: poiItem.poi_relation.id,
            category_id: categoryMap[poiItem.category_relation.category] || 0,
          })),
        };
      }

      // Transform other relations similarly
      const transformRelation = (relationArray, relationKey, map = null) => {
        if (relationArray) {
          return {
            deleteMany: {},
            create: relationArray.map((item) => ({
              [`${relationKey}`]: {
                connect: {
                  id: map
                    ? map[item[`${relationKey}_relation`]?.[relationKey]] || 0
                    : item[`${relationKey}_relation`]?.id || 0,
                },
              },
            })),
          };
        }
        return undefined;
      };

      dataToSend.information_info_stored_period = transformRelation(
        dataToSend.information_info_stored_period,
        "info_stored_period"
      );

      dataToSend.information_info_placed = transformRelation(
        dataToSend.information_info_placed,
        "info_placed"
      );

      dataToSend.information_info_allowed_ps = transformRelation(
        dataToSend.information_info_allowed_ps,
        "info_allowed_ps"
      );

      dataToSend.information_info_allowed_ps_condition = transformRelation(
        dataToSend.information_info_allowed_ps_condition,
        "info_allowed_ps_condition"
      );

      dataToSend.information_info_access = transformRelation(
        dataToSend.information_info_access,
        "info_access"
      );

      dataToSend.information_info_access_condition = transformRelation(
        dataToSend.information_info_access_condition,
        "info_access_condition"
      );

      dataToSend.information_info_ps_usedbyrole_inside = transformRelation(
        dataToSend.information_info_ps_usedbyrole_inside,
        "info_ps_usedbyrole_inside"
      );

      dataToSend.information_info_ps_sendto_outside = transformRelation(
        dataToSend.information_info_ps_sendto_outside,
        "info_ps_sendto_outside"
      );

      dataToSend.information_info_ps_destroying = transformRelation(
        dataToSend.information_info_ps_destroying,
        "info_ps_destroying"
      );

      dataToSend.information_info_ps_destroyer = transformRelation(
        dataToSend.information_info_ps_destroyer,
        "info_ps_destroyer"
      );

      dataToSend.information_m_organization = transformRelation(
        dataToSend.information_m_organization,
        "m_organization"
      );

      dataToSend.information_m_technical = transformRelation(
        dataToSend.information_m_technical,
        "m_technical"
      );

      dataToSend.information_m_physical = transformRelation(
        dataToSend.information_m_physical,
        "m_physical"
      );

      // Send the transformed data to the backend
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_SIDE}/information/updateInfo/${rowData.id}`,
        dataToSend
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
                      disabled={item.status === "success"}
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
                {["manager", "admin"].includes(props.user.data.users.role) && (
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
                          checked={item.status === "success"}
                          disabled={item.status === "success"}
                          color="success"
                          onChange={(event) => {
                            event.stopPropagation();
                            handleSwitchChange(item.id)(event);
                          }}
                        />
                      </Typography>
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
                              {(poiInfo.consolidated_lawbase || []).map(
                                (lawbase, index) => (
                                  <Grid item xs={12} sm={6} key={index}>
                                    <TextField
                                      label={`POI Lawbase ${index + 1}`}
                                      value={lawbase || ""}
                                      InputProps={{
                                        readOnly: editData.status !== "pending",
                                      }}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          `poi_information[${poiInfo.poiGlobalIndex}].consolidated_lawbase[${index}]`
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
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )
              )}

              {/* Other Information Sections */}
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
              disabled={!isDataChanged} // Disable button if no changes made
            >
              Update
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
