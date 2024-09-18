import axios from "axios";
axios.defaults.withCredentials = true;

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
