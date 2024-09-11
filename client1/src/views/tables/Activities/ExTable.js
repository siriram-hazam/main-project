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
  Divider,
  Button,
  Switch,
} from "@mui/material";

import TextField from "@mui/material/TextField";

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
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import axios from "axios";
axios.defaults.withCredentials = true;

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
    // console.log(item);
    setRowDialogOpen(true);
  };

  const handleRowDialogClose = () => {
    setRowDialogOpen(false);
    setRowData(null);
  };

  const handleDownload = async (item) => {
    console.log("handleDownload : ", item);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/information/downloadexcel",
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

  return (
    <>
      <Box sx={{ overflowX: "auto" }}>
        <Table
          aria-label="Activity Table"
          sx={{
            mt: 3,
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
              <TableCell align="left">
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
                      // disabled={item.status === "success" ? true : false}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClickOpen(item.id);
                      }}
                      sx={{
                        // mr: 1,
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
                      {/* Delete */}
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
                          // disabled={item.status === "success" ? true : false}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleDownload(item);
                          }}
                          sx={{
                            // mr: 1,
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
                          {/* Excel File */}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

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
        </DialogContent>
        <DialogContent>
          <DialogContentText
            id="row-dialog-description"
            sx={{ fontSize: "1rem" }}
            style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
          >
            {/* {console.log(rowData)} */}
            {rowData && (
              <>
                <TextField
                  label="Id"
                  value={rowData.id}
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
                  value={rowData.activity_relation.activity}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Status"
                  value={rowData.status}
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
                  value={new Date(rowData.create_time).toLocaleString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
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
                  value={rowData.user_account_relation.fullname}
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
                  value={rowData.company_relation.companyName}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Category"
                  value={rowData.category_information
                    .map((item) => item.category_relation.category)
                    .join(", ")}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                <TextField
                  label="Department"
                  value={rowData.category_information
                    .map(
                      (item) =>
                        item.category_relation.department_relation
                          .departmentName
                    )
                    .join(", ")}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                />
                {rowData.poi_information.map((poi, index) => (
                  <div key={index}>
                    <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                      POI Information Set {index + 1}
                    </Typography>
                    <div style={{ paddingLeft: "2rem" }}>
                      <TextField
                        label={`POI Owner ${index + 1}`}
                        value={poi.poi_relation.poi_info_owner
                          .map((owner) => owner.info_owner_relation.owner_)
                          .join(", ")}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                      />
                      <TextField
                        label={`POI From ${index + 1}`}
                        value={poi.poi_relation.poi_info_from
                          .map((from) => from.info_from_relation.from_)
                          .join(", ")}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                      />
                      <TextField
                        label={`POI Format ${index + 1}`}
                        value={poi.poi_relation.poi_info_format
                          .map((format) => format.info_format_relation.format_)
                          .join(", ")}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                      />
                      <TextField
                        label={`POI Type ${index + 1}`}
                        value={poi.poi_relation.poi_info_type
                          .map((type) => type.info_type_relation.type_)
                          .join(", ")}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                      />
                      <TextField
                        label={`POI Objective ${index + 1}`}
                        value={poi.poi_relation.poi_info_objective
                          .map(
                            (objective) =>
                              objective.info_objective_relation.objective_
                          )
                          .join(", ")}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                      />
                      <TextField
                        label={`POI Lawbase ${index + 1}`}
                        value={poi.poi_relation.poi_info_lawbase
                          .map(
                            (lawbase) => lawbase.info_lawbase_relation.lawBase_
                          )
                          .join(", ")}
                        InputProps={{
                          readOnly: true,
                        }}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                      />
                    </div>
                  </div>
                ))}
                {rowData.information_info_stored_period.map((period, index) => (
                  <TextField
                    key={index}
                    label={`Stored Period ${index + 1}`}
                    value={period.info_stored_period_relation.period_}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                  />
                ))}
                {rowData.information_info_placed.map((placed, index) => (
                  <TextField
                    key={index}
                    label={`Info Placed ${index + 1}`}
                    value={placed.info_placed_relation.placed_}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                  />
                ))}
                {rowData.information_info_allowed_ps.map(
                  (allowed_ps, index) => (
                    <TextField
                      key={index}
                      label={`Allowed PS ${index + 1}`}
                      value={allowed_ps.info_allowed_ps_relation.allowed_ps_}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_info_allowed_ps_condition.map(
                  (condition, index) => (
                    <TextField
                      key={index}
                      label={`Allowed PS Condition ${index + 1}`}
                      value={
                        condition.info_allowed_ps_condition_relation
                          .allowed_ps_condition_
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_info_access.map((access, index) => (
                  <TextField
                    key={index}
                    label={`Info Access ${index + 1}`}
                    value={access.info_access_relation.access_}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                  />
                ))}
                {rowData.information_info_access_condition.map(
                  (access_condition, index) => (
                    <TextField
                      key={index}
                      label={`Access Condition ${index + 1}`}
                      value={
                        access_condition.info_access_condition_relation
                          .access_condition_
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_info_ps_usedbyrole_inside.map(
                  (usedbyrole, index) => (
                    <TextField
                      key={index}
                      label={`Used by Role Inside ${index + 1}`}
                      value={
                        usedbyrole.info_ps_usedbyrole_inside_relation
                          .use_by_role_
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_info_ps_sendto_outside.map(
                  (sendto, index) => (
                    <TextField
                      key={index}
                      label={`Send to Outside ${index + 1}`}
                      value={sendto.info_ps_sendto_outside_relation.sendto_}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_info_ps_destroying.map(
                  (destroying, index) => (
                    <TextField
                      key={index}
                      label={`Destroying ${index + 1}`}
                      value={destroying.info_ps_destroying_relation.destroying_}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_info_ps_destroyer.map(
                  (destroyer, index) => (
                    <TextField
                      key={index}
                      label={`Destroyer ${index + 1}`}
                      value={destroyer.info_ps_destroyer_relation.destroyer_}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_m_organization.map(
                  (organization, index) => (
                    <TextField
                      key={index}
                      label={`Organization ${index + 1}`}
                      value={organization.m_organization_relation.organization}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                    />
                  )
                )}
                {rowData.information_m_technical.map((technical, index) => (
                  <TextField
                    key={index}
                    label={`Technical ${index + 1}`}
                    value={technical.m_technical_relation.technical}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                  />
                ))}
                {rowData.information_m_physical.map((physical, index) => (
                  <TextField
                    key={index}
                    label={`Physical ${index + 1}`}
                    value={physical.m_physical_relation.physical}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                  />
                ))}
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
