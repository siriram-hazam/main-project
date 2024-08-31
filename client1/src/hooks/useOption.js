import axios from "axios";
axios.defaults.withCredentials = true;

const optionAllDropdown = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/activitiesOptions");
    return res;
  } catch (error) {
    console.error("Error useOption optionAllDropdown : ", error);
  }
};

export default { optionAllDropdown };
