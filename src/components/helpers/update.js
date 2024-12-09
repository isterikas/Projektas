import axios from "axios";
import {url} from "./jsonURL.js";

export const patchData = async (resource, id, data) => {
  const response = await axios.patch(`${url(resource)}/${id}`, data);
  return response.data;
};

export const putData = async (id, data) => {
  const response = await axios.put(`${url()}/${id}`, data);
  return response.data;
};
