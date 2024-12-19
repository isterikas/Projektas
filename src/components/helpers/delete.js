import axios from "axios";
import { getOne } from "./get";
import { url } from "./jsonURL";
import sha1 from "js-sha1";
import { sha256 } from "js-sha256";

export const deleteAccount = async (id) => {
  const { userPassword } = await getOne(id, "users");

  const confirmed = window.prompt(
    `Do you really want to remove your user account? Enter password:`
  );
  if (sha256(sha1(confirmed)) != userPassword) {
    alert("password is incorect");
    return false;
  } else {
    const response = await axios.delete(`${url("users")}/${id}`);
    return response.data;
  }
};

export const deleteBookmark = async (id) => {
  const response = await axios.delete(`${url("userBookmarks")}/${id}`);
  return response;
};
