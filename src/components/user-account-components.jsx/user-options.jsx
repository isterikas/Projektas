import DeleteAccount from "./delete-account";
import PasswordChangeOption from "./password-change-option";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowLeftIcon,
  ChevronUpIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";

const UserOptions = (props) => {
  const {
    loggedUser,
    setLoggedUser,
    setLoggedIn,
    navigate,
    showModal,
    setShowModal,
    loggedIn,
    setIsProfileNameForm,
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    setTimeout(() => {
      setLoggedIn(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <Menu as="div" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <MenuButton className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-600 h-[25px] md:h-[30px] text-[10px] md:text-xs font-semibold text-gray-300  data-[hover]:bg-slate-500 data-[open]:bg-slate-500 w-[90px] md:w-[105px] lg:w-[120px] ms-[5px] border-[1px]">
          Options
          <ChevronUpIcon className="size-[14px] md:size-4 fill-gray-300" />
        </MenuButton>

        <MenuItems
          transition
          anchor="top center"
          style={{
            border: `1px solid #ffffff`,
            boxShadow: ` 0 1px 10px 0 #ffffff`,
          }}
          className="w-[105px] md:w-[125px] lg:w-[140px] rounded-md bg-gray-500 bg-opacity-30  text-white transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 "
        >
          <MenuItem>
            <button
              onClick={() => {
                setIsProfileNameForm((prev) => !prev);
              }}
              className="bnt-options "
            >
              <UserPlusIcon className="size-[14px] md:size-4 lg:size fill-white" />
              Add Profile Name
            </button>
          </MenuItem>
          <MenuItem>
            <PasswordChangeOption
              showModal={showModal}
              setShowModal={setShowModal}
              loggedIn={loggedIn}
            />
          </MenuItem>
          <div className="my-1 h-[1px] bg-gray-400" />
          <MenuItem>
            <button className="bnt-options" onClick={handleLogOut}>
              <ArrowLeftIcon className="size-[14px] md:size-4 fill-white" />
              Log Out
            </button>
          </MenuItem>
          <MenuItem>
            <DeleteAccount
              loggedUser={loggedUser}
              setLoggedUser={setLoggedUser}
              setLoggedIn={setLoggedIn}
              navigate={navigate}
            />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default UserOptions;
