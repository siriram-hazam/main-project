import axios from "axios";
axios.defaults.withCredentials = true;

const infoActivities = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/information/");
    return res;
  } catch (error) {
    console.error("Error useInfo infoActivities : ", error);
  }
};

export default { infoActivities };
