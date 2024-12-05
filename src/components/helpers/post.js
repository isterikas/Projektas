import axios from "axios";
import {url} from "./jsonURL.js";

export const postdata = async (data) => {
  let response = await axios.post(url(), data);

  return response.data;
};
