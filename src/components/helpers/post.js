import axios from "axios";
import { url } from "./jsonURL.js";

export const postData = async (data, resource) => {
  let response = await axios.post(url(resource), data);

  return response.data;
};

export const postImage = async (data) => {
  let reponse = await axios.post("http://localhost:5000/upload", data);
  return reponse.data;
};
