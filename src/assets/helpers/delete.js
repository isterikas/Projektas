import axios from "axios";
import { getOne } from "./get";
// const url = OUR JSON URL

export const deleteData = async (id) => {
  const { value } = await getOne(id);

  const confirmed = window.confirm(
    `Do you really want to delete XXXXXXXXX ${value}?`
  );
  if (!confirmed) return;
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};
