import React, { useState } from "react";
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
} from "@mui/material";

const ExTable = (userList) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("th-TH", {
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
          {userList.userList.userslist.map((item) => (
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
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        fullWidth={true}
      >
        <DialogTitle sx={{ fontSize: "2rem" }}>Item Details</DialogTitle>
        <DialogContent>
          <Divider />
        </DialogContent>
        <DialogContent>
          {selectedItem && (
            <DialogContentText
            // style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
            >
              <>
                <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                  ID: {selectedItem.id}
                </Typography>
                <Typography variant="h6">
                  Name: {selectedItem.fullname}
                </Typography>
                <Typography variant="h6">Role: {selectedItem.role}</Typography>
                <Typography variant="h6">
                  User ID: {selectedItem.username}
                </Typography>
                <Typography variant="h6">
                  Created At: {formatDate(selectedItem.create_time)}
                </Typography>
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExTable;
