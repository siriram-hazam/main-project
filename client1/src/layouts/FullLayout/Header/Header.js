import React from "react";
import { Link } from "react-router-dom";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
} from "@mui/material";

import authUtils from "../../../hooks/useAuth";

import userimg from "../../../assets/images/users/4.jpg";

const Header = (props) => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleLogout = () => {
    authUtils.logout();
    handleClose4();
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon
            width="20"
            height="20"
            sx={{ fontSize: "1.5rem" }}
          />
        </IconButton>
      

        <Box flexGrow={1} />

        {props.user.data.users.fullname}

        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
            mr: 1,
          }}
        ></Box>

        {props.user.data.users.company_relation.companyName}

        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "min-content",
              right: 0,
              top: "70px !important",
              alignItems: "center",
            },
          }}
        >
          <MenuItem>
            <Box
              sx={{
                ml: 2,
              }}
            >
              {props.user.data.users.email}
            </Box>
          </MenuItem>

          {props.user.data.users.role === "admin" ? (
            <Link to="/user-admin">
              <>
                <Divider />
                <MenuItem onClick={handleClose4}>
                  <Box
                    sx={{
                      ml: 2,
                    }}
                  >
                    <PersonAddAltOutlinedIcon
                      sx={{ mr: 1.5, fontSize: "1.2rem" }}
                    />
                    Add More User (Admin)
                  </Box>
                </MenuItem>
              </>
            </Link>
          ) : null}

          {props.user.data.users.role === "superadmin" ? (
            <>
              <Link to="/company-list-super">
                <>
                  <Divider />
                  <MenuItem onClick={handleClose4}>
                    <Box
                      sx={{
                        ml: 2,
                      }}
                    >
                      <PersonAddAltOutlinedIcon
                        sx={{ mr: 1.5, fontSize: "1.2rem" }}
                      />
                      Company List (Super Admin)
                    </Box>
                  </MenuItem>
                </>
              </Link>

              <Link to="/company-user-super">
                <>
                  <MenuItem onClick={handleClose4}>
                    <Box
                      sx={{
                        ml: 2,
                      }}
                    >
                      <PersonAddAltOutlinedIcon
                        sx={{ mr: 1.5, fontSize: "1.2rem" }}
                      />
                      Company User (Super Admin)
                    </Box>
                  </MenuItem>
                </>
              </Link>
            </>
          ) : null}

          <Divider />

          <Link to="/edit-profile">
            <MenuItem onClick={handleClose4}>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <EditOutlinedIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                Profile Details
              </Box>
            </MenuItem>
          </Link>

          <Divider />
          <>
            <MenuItem onClick={handleLogout}>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <LogoutOutlinedIcon sx={{ mr: 1.5, fontSize: "1.2rem" }} />
                Logout
              </Box>
            </MenuItem>
          </>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
