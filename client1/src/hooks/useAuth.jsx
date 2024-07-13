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
          console.log(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        } else {
          console.log("authLogin Not Pass!");
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
    checkAuthStatus().then((res) => {
      if (res.data.status === "authenticated") {
        console.log("User is authenticated");
        // window.location = "/dashboard";
      } else {
        console.log("User is not authenticated");
      }
    });
  } catch (error) {
    console.error("Error useAuth checkLoginStatus : ", error);
  }
};

const checkAuthStatus = async (req, res, next) => {
  try {
    const res = await axios.get("http://localhost:3001/api/user/status");
    return res;
  } catch (error) {
    console.error("Error useAuth checkAuthStatus : ", error);
  }
};

export default { authLogin, checkAuthStatus };
