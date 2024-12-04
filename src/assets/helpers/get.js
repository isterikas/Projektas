import axios from "axios";
// const url = OUR JSON URL

export const getAllData = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};
