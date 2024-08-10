import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";

// const products = [
//   {
//     id: "1",
//     name: "Sunil Joshi",
//     post: "Web Designer",
//     pname: "Elite Admin",
//     priority: "Low",
//     pbg: "primary.main",
//     budget: "3.9",
//   },
//   {
//     id: "2",
//     name: "Andrew McDownland",
//     post: "Project Manager",
//     pname: "Real Homes WP Theme",
//     priority: "Medium",
//     pbg: "secondary.main",
//     budget: "24.5",
//   },
//   {
//     id: "3",
//     name: "Christopher Jamil",
//     post: "Project Manager",
//     pname: "MedicalPro WP Theme",
//     priority: "High",
//     pbg: "error.main",
//     budget: "12.8",
//   },
//   {
//     id: "4",
//     name: "Nirav Joshi",
//     post: "Frontend Engineer",
//     pname: "Hosting Press HTML",
//     priority: "Critical",
//     pbg: "success.main",
//     budget: "2.4",
//   },
// ];

const ExTable = (props) => {
  console.log("props", props);
  return (
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
              Activity Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Status
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Create Time
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.info.data.message.map((item) => (
          <TableRow key={item}>
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
                    {/* {item.post} */}
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
                  // backgroundColor: product.pbg,
                  color: "#fff",
                }}
                size="small"
                label={item.status}
              ></Chip>
            </TableCell>
            <TableCell align="right">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTable;
