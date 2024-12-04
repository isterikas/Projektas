import axios from "axios";
// const url = OUR JSON URL

export const patchData = async (id, data) => {
  const response = await axios.patch(`${url}/${id}`, data);
  return response.data;
};

export const putData = async (id, data) => {
  const response = await axios.put(`${url}/${id}`, data);
  return response.data;
};
