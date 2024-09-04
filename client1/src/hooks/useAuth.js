import axios from "axios";
axios.defaults.withCredentials = true;

const authLogin = async (username, password) => {
  await axios
    .post("http://localhost:3001/api/user/login", {
      username: username,
      password: password,
    })
    .then(
      (res) => {
        if (res.data.status === 200) {
          console.log("authLogin Pass!");
          checkLoginStatus();
          // console.log(res.data.user);
          // localStorage.setItem("user", JSON.stringify(res.data.user));
          // sessionStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          console.log("authLogin Not Pass!");
          // console.error(res);
        }
      },
      (error) => {
        console.error("Error useAuth authLogin : ", error);
      }
    )
    .finally();
};

const checkLoginStatus = async () => {
  try {
    checkAuthStatus().then(
      (res) => {
        if (res.data.status === "authenticated") {
          console.log("User is authenticated");
          // checkUser().then(
          //   (res) => {
          //     // console.log(res);
          //     // window.location = "/dashboards";
          //   },
          //   (error) => {
          //     console.log("Error useAuth checkAuthStatus checkUser : ", error);
          //   }
          // );

          // -- Check Response
          // checkUser().then((res) => {
          //   console.log(res);
          // });
          window.location = "/dashboards";
        } else {
          console.log("User is not authenticated");
        }
      },
      (error) => {
        console.log("Error useAuth checkAuthStatus : ", error);
      }
    );
  } catch (error) {
    console.error("Error useAuth checkLoginStatus : ", error);
  }
};

const checkAuthStatus = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/user/status");
    return res;
  } catch (error) {
    console.error("Error useAuth checkAuthStatus : ", error);
  }
};

const checkUser = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/user/checkUser");
    return res;
  } catch (error) {
    console.error("Error useAuth checkUser : ", error);
  }
  return null;
};

const userProfile = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/user/userProfile");
    return res;
  } catch (error) {
    console.error("Error useAuth userProfile : ", error);
  }
};

const userCompanyList = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/user/userList");
    return res;
  } catch (error) {
    console.error("Error useAuth userCompanyList : ", error);
  }
};

const logout = async () => {
  try {
    await axios.get("http://localhost:3001/api/user/logout");
    window.location = "/";
  } catch (error) {
    console.error("Error useAuth logout : ", error);
  }
};

export default {
  authLogin,
  checkAuthStatus,
  checkUser,
  userProfile,
  userCompanyList,
  logout,
};
