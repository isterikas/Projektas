import { deleteAccount } from "../helpers/delete";
import {TrashIcon,} from '@heroicons/react/16/solid'
import { useState } from "react";

const DeleteAccount = (props) => {

    const {loggedUser, setLoggedUser, setLoggedIn, navigate, showModal, setShowModal } = props
const [isDeleteRequest, setDeleteRequest] = useState(false)

  const handleDelete = async () => {
    setDeleteRequest(true)
    const deletion = await deleteAccount(loggedUser.id);
    if (!deletion) {
      return;
    } else {
      try {
        window.localStorage.clear();
        setLoggedIn("");
        setLoggedUser(null);
        setTimeout(() => {
            navigate("/account/deleted");
        }, 1000);
      } catch (error) {
        window.alert("Error deleting account:", error.message);
      }
    }
  };

  return (
    <div>
      <button
        type="submit"
        onClick={handleDelete}
        className="flex w-full items-center h-[25px] md:h-[30px] gap-1 md:gap-2 rounded-md p-[3px] text-[10px] md:text-xs hover:bg-black focus:bg-black"
      >
        <TrashIcon className="size-[14px] md:size-4 fill-red-500" />
        Delete Account
      </button>
      {isDeleteRequest && (
        <div
          className="fixed inset-0 bg-black  opacity-50"
          onClick={() => setDeleteRequest(false)}
        ></div>
      )}
    </div>
    
    
  );
};

export default DeleteAccount;
