import axios from "axios";
import {url} from "./jsonURL.js";

export const getAllData = async (resource) => {
  const response = await axios.get(url(resource));
  return response.data;
};

export const getOne = async (id, resource) => {
  const response = await axios.get(`${url(resource)}/${id}`);
  return response.data;
};


