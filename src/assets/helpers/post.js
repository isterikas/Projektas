import axios from "axios";
// const url = OUR JSON URL

export const postdata = async (data) => {
  let response = await axios.post(url, data);

  return response.data;
};
