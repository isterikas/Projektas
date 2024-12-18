import DeleteAccount from './delete-account'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,

  ChevronUpIcon,
  PencilIcon,
  Square2StackIcon,
} from '@heroicons/react/16/solid'


const UserOptions = (props) => {

    const {selectedTextColor, loggedUser, setLoggedUser, setLoggedIn, navigate} = props

    return (

    <div className="w-[100px] md:w-[120px] ">
      <Menu __demoMode>
        <MenuButton className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-800 py-1.5 text-[10px] md:text-xs font-semibold text-gray-300  data-[hover]:bg-gray-700 data-[open]:bg-gray-700 w-[100px] md:w-[120px] ">
          Options
          <ChevronUpIcon className="size-4 fill-gray-300" />
        </MenuButton>

        <MenuItems
          transition
          anchor="top center"
          style={{border: `1px solid ${selectedTextColor}`}}
          className="w-[100px] md:w-[120px]  rounded-md bg-transparent  text-gray-300 transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 "
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 h-[2rem] rounded-md p-[3px] data-[focus]:bg-slate-700 text-[10px] md:text-xs">
              <PencilIcon className="size-4 fill-gray-300" />
              Edit
              
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group inline-flex w-full items-center h-[2rem] gap-2 rounded-md p-[3px]  data-[focus]:bg-slate-700 text-[10px] md:text-xs">
              <Square2StackIcon className="size-4 fill-gray-300" />
              Duplicate
              
            </button>
          </MenuItem>
          <div className="my-1 h-[1px] bg-gray-700" />
          <MenuItem>
            <button className=" flex w-full items-center gap-2 h-[2rem] rounded-md p-[3px]  data-[focus]:bg-slate-700 text-[10px] md:text-xs">
              <ArchiveBoxXMarkIcon className="size-4 fill-gray-300" />
              Archive
              
            </button>
          </MenuItem>
          <MenuItem>
            <DeleteAccount
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
            setLoggedIn={setLoggedIn}
            navigate={navigate}/>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}

 
export default UserOptions;