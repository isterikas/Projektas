import axios from "axios";
import { url } from "./jsonURL.js";

export const postData = async (data, resource) => {
  let response = await axios.post(url(resource), data);

  return response.data;
};
