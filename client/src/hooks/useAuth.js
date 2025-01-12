import axios from "axios";
axios.defaults.baseURL = "http://20.255.153.125:3001"; // URL หลักของ API
axios.defaults.withCredentials = true; // เปิดการส่ง Cookies
axios.defaults.headers.common["Content-Type"] = "application/json"; // Content-Type เริ่มต้น
axios.defaults.headers.common["Accept"] = "application/json"; // Accept header

const authLogin = async (username, password) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_SIDE}/user/login`,
      {
        username: username,
        password: password,
      }
    );
    if (res.data.status === 200) {
      // console.log("authLogin Pass!");
      // checkLoginStatus();
      return { success: true, message: "Login successful!" };
    } else {
      // console.log("authLogin Not Pass!");
      return { success: false, message: "Login failed! Please try again." };
    }
  } catch (error) {
    console.error("Error useAuth authLogin : ", error);
    return { success: false, message: "An error occurred during login." };
  }
};

const checkLoginStatus = async () => {
  try {
    checkAuthStatus().then(
      (res) => {
        if (res.data.status === "authenticated") {
          // console.log("User is authenticated");

          window.location = "/dashboards";

          return true;
        } else {
          // console.log("User is not authenticated");
          return false;
        }
      },
      (error) => {
        console.error("Error useAuth checkAuthStatus : ", error);
      }
    );
  } catch (error) {
    console.error("Error useAuth checkLoginStatus : ", error);
  }
};

const checkAuthStatus = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/user/status`
    );
    // console.log("checkAuthStatus : ", res);
    return res;
  } catch (error) {
    console.error("Error useAuth checkAuthStatus : ", error);
  }
};

const checkUser = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/user/checkUser`
    );
    return res;
  } catch (error) {
    console.error("Error useAuth checkUser : ", error);
  }
  return null;
};

const userProfile = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/user/userProfile`
    );
    return res;
  } catch (error) {
    console.error("Error useAuth userProfile : ", error);
  }
};

const userCompanyList = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/user/userList`
    );
    return res;
  } catch (error) {
    console.error("Error useAuth userCompanyList : ", error);
  }
};

const companyList = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/company/`
    );
    return res;
  } catch (error) {
    console.error("Error useAuth companyList : ", error);
  }
};

const companyAdmin = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/company/admin-company`
    );
    return res;
  } catch (error) {
    console.error("Error useAuth companyAdmin : ", error);
  }
};

const logout = async () => {
  try {
    await axios.get(`${process.env.REACT_APP_SERVER_SIDE}/user/logout`);
    window.location = "/";
  } catch (error) {
    console.error("Error useAuth logout : ", error);
  }
};

const checkUserSystem = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/user/checkUserSystem`
    );
    return res;
  } catch (error) {
    console.error("Error useAuth checkUserSystem : ", error);
  }
};

export default {
  authLogin,
  checkLoginStatus,
  checkAuthStatus,
  checkUser,
  userProfile,
  userCompanyList,
  companyList,
  companyAdmin,
  logout,
  checkUserSystem,
};
