import { useEffect, useState } from "react";
// import { IoCloseOutline } from "react-icons/io5";
// import Cookies from "js-cookie";

// import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

import axios from "axios";
axios.defaults.withCredentials = true;

const LoginModal = ({ show, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
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
            window.location = "/";
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
    // Add your login logic here
    // console.log("Logging in with", { username, password });
    setLoading(true);
    fetchLogin();
  };

  return (
    // <>
    //   {/* Modal Edit Activities */}
    //   {show && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    //       <div className="bg-neutral-100 p-8 rounded-xl shadow-md w-11/12 h-5/6">
    //         {/* เนื้อหาของโมเดล */}
    //         <div className="min-h-full flex flex-col items-center justify-center bg-gray-100">
    //           <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
    //             <h1 className="text-center text-5xl font-light text-wrap">
    //               Record of Processing Inc.
    //             </h1>
    //             <div className="mt-10">
    //               <form id="form" onSubmit={handleLogin}>
    //                 <div className="flex flex-col mb-6">
    //                   <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
    //                     Username:
    //                   </label>
    //                   <div className="relative">
    //                     <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
    //                       <svg
    //                         className="h-6 w-6"
    //                         fill="none"
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth="2"
    //                         viewBox="0 0 24 24"
    //                         stroke="currentColor"
    //                       >
    //                         <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    //                       </svg>
    //                     </div>
    //                     <input
    //                       className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
    //                       placeholder="Username"
    //                       type="text"
    //                       value={username}
    //                       onChange={(e) => setUsername(e.target.value)}
    //                     />
    //                   </div>
    //                 </div>
    //                 <div className="flex flex-col mb-6">
    //                   <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
    //                     Password:
    //                   </label>
    //                   <div className="relative">
    //                     <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
    //                       <span>
    //                         <svg
    //                           className="h-6 w-6"
    //                           fill="none"
    //                           strokeLinecap="round"
    //                           strokeLinejoin="round"
    //                           strokeWidth="2"
    //                           viewBox="0 0 24 24"
    //                           stroke="currentColor"
    //                         >
    //                           <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    //                         </svg>
    //                       </span>
    //                     </div>
    //                     <input
    //                       className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
    //                       placeholder="Password"
    //                       type="password"
    //                       value={password}
    //                       onChange={(e) => setPassword(e.target.value)}
    //                     />
    //                   </div>
    //                 </div>

    //                 <div className="flex w-full">
    //                   <button
    //                     type="submit"
    //                     className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
    //                   >
    //                     <span className="mr-2 uppercase">Login</span>
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </div>
    //           {/* <button
    //             className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
    //             onClick={onClose}
    //           >
    //             <svg
    //               className="h-6 w-6"
    //               fill="none"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path d="M6 18L18 6M6 6l12 12" />
    //             </svg>
    //           </button> */}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
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
                          // error
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
                          // error
                          // helperText="Incorrect entry."
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
