import axios from "axios";
import { port, ip } from "./constants";

export const handleFetch = async (api, callback) => {
  try {
    const response = await axios.get(`http://${ip}:${port}${api}`);
    callback(response.data);
  } catch (error) {
    console.log("Error:", error.message);
  }
};
