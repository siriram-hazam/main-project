import axios from "axios";
axios.defaults.withCredentials = true; // เปิดการส่ง Cookies
axios.defaults.headers.common["Content-Type"] = "application/json"; // Content-Type เริ่มต้น
axios.defaults.headers.common["Accept"] = "application/json"; // Accept header

const optionAllDropdown = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_SIDE}/activitiesOptions`
    );
    return res;
  } catch (error) {
    console.error("Error useOption optionAllDropdown : ", error);
  }
};

export default { optionAllDropdown };
