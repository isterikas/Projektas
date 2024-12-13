import axios from "axios";
import { getOne } from "./get";
import { url } from "./jsonURL";

export const deleteAccount = async (id) => {
  const { password } = getOne(id);
  const confirmed = window.prompt(
    `Do you really want to remove your user account? Enter password:`
  );
  if (confirmed != password) return;
  const response = await axios.delete(`${url("users")}/${id}`);
  return response.data;
};

export const deleteBookmark = async (id) => {
  const response = await axios.delete(`${url("userBookmarks")}/${id}`);
  return response;
};
