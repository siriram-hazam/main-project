import axios from "axios";
axios.defaults.withCredentials = true; // เปิดการส่ง Cookies
axios.defaults.headers.common["Content-Type"] = "application/json"; // Content-Type เริ่มต้น
axios.defaults.headers.common["Accept"] = "application/json"; // Accept header

const infoActivities = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/information/`
    );
    return res;
  } catch (error) {
    console.error("Error useInfo infoActivities : ", error);
  }
};

export default { infoActivities };
