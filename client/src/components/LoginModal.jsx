import { useEffect, useState } from "react";
// import { IoCloseOutline } from "react-icons/io5";
// import Cookies from "js-cookie";

// import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";
axios.defaults.withCredentials = true;

const LoginModal = ({ show, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [textError, setTextError] = useState(false);
  const [helperText, setHelperText] = useState("");

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    ); // Show a loading message while fetching data
  }

  const fetchLogin = async () => {
    await axios
      .post("http://localhost:3001/api/user/login", {
        username: username,
        password: password,
      })
      .then(
        (res) => {
          console.log(res);

          if (res.data.status === 200) {
            console.log("Login Success");
            onClose();
            window.location = "/dashboard";
            setTextError(false);
            setHelperText("");
          } else if (res.data.status === 400) {
            setTextError(true);
            setHelperText("Please provide Username and Password Correctly.");
            console.log("Invalid Username or Password!!");
          } else {
            console.log("Login Failed");
          }
        },
        (error) => {
          console.error(error);
        }
      )
      .finally(() => setLoading(false));
  };

  // useEffect(() => {
  //   if (show) {
  //     setUsername("");
  //     setPassword("");
  //   }
  // }, [show]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchLogin();
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0">
          <body className="h-screen flex">
            <div className="flex w-full">
              <div className="w-full md:w-1/2 h-full bg-gray-200 flex items-center justify-center p-4">
                <div className="text-2xl font-extrabold font-serif text-wrap">
                  Welcome to Record of Processing Inc.
                  <div className="text-md font-medium">
                    Please Login to continue...
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-full bg-white flex items-center justify-center">
                <div className="text-2xl font-bold ">
                  <div className="text-center m-4 font-serif">User Login</div>
                  <div>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          required
                          id="outlined-required"
                          label="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          // defaultValue=""
                          error={textError}
                          // helperText="Incorrect entry."
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          id="outlined-password-input"
                          label="Password"
                          type="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          error={textError}
                          helperText={helperText}
                        />
                      </div>
                    </Box>

                    <div className="text-right">
                      <Box sx={{ "& > button": { m: 1 } }}>
                        <LoadingButton
                          onClick={handleLogin}
                          endIcon={<SendIcon />}
                          loading={loading}
                          loadingPosition="end"
                          variant="contained"
                        >
                          <span>Login</span>
                        </LoadingButton>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </div>
      )}
    </>
  );
};

export default LoginModal;
