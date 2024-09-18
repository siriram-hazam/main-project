import axios from "axios";
axios.defaults.withCredentials = true;

const optionAllDropdown = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_SIDE}/activitiesOptions`);
    return res;
  } catch (error) {
    console.error("Error useOption optionAllDropdown : ", error);
  }
};

export default { optionAllDropdown };
