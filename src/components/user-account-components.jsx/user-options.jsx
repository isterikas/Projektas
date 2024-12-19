import DeleteAccount from "./delete-account";
import PasswordChangeOption from "./password-change-option";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {ArrowLeftIcon, ChevronUpIcon, UserPlusIcon } from "@heroicons/react/16/solid";

const UserOptions = (props) => {
  const {
    loggedUser,
    setLoggedUser,
    setLoggedIn,
    navigate,
    showModal,
    setShowModal,
    loggedIn,
    setIsProfileNameForm
  } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    setTimeout(() => {
      setLoggedIn(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div >
      <Menu as="div" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <MenuButton className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-600 h-[25px] md:h-[30px] text-[10px] md:text-xs font-semibold text-gray-300  data-[hover]:bg-slate-500 data-[open]:bg-slate-500 w-[90px] md:w-[100px] lg:w-[120px] ms-1 border-[1px]">
          Options
          <ChevronUpIcon className="size-4 fill-gray-300" />
        </MenuButton>

        <MenuItems
          transition
          anchor="top center"
          style={{
            border: `1px solid #ffffff`,
            boxShadow: ` 0 1px 10px 0 #ffffff`,
          }}
          className="w-[105px] md:w-[115px] lg:w-[130px]  rounded-md bg-gray-500 bg-opacity-30  text-white transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 "
        >
          <MenuItem>
            <button  onClick={() => {
              setIsProfileNameForm((prev) => !prev)
            }} className="group flex w-full items-center  gap-1 md:gap-2 h-[25px] md:h-[30px] rounded-md p-[3px] text-[10px] md:text-xs hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-20 "> 
              <UserPlusIcon className="size-[14px] md:size-4 fill-white" />
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
            <button
              className=" flex w-full items-center gap-1 md:gap-2 h-[25px] md:h-[30px] rounded-md p-[3px] text-[10px] md:text-xs  hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-20 "
              onClick={handleLogOut}
            >
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
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default UserOptions;
