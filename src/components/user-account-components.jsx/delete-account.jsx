import { deleteAccount } from "../helpers/delete";

const DeleteAccount = (props) => {

    const {loggedUser, setLoggedUser, setLoggedIn, navigate, } = props

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
      className="rounded p-1 text-[10px] md:text-xs h-[2rem] md:w-[120px] text-gray-400 bg-black"
    >
      Delete Account
    </button>
  );
};

export default DeleteAccount;
