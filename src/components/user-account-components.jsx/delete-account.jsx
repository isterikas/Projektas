import { deleteAccount } from "../helpers/delete";
import {TrashIcon,} from '@heroicons/react/16/solid'

const DeleteAccount = (props) => {

    const {loggedUser, setLoggedUser, setLoggedIn, navigate } = props

  const handleDelete = async () => {
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
    <button
      type="submit"
      onClick={handleDelete}
      className="flex w-full items-center h-[2rem] gap-2 rounded-md p-[3px] text-[10px] md:text-xs hover:bg-black focus:bg-black"
    >
      <TrashIcon className="size-[15px] md:size-4 fill-gray-300" />
      Delete Account
    </button>
  );
};

export default DeleteAccount;
