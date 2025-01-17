import PasswordChange from "../PasswordChange";
import { PencilIcon } from "@heroicons/react/16/solid";

const PasswordChangeOption = (props) => {
  const { showModal, setShowModal, loggedIn } = props;
  return (
    <div>
      <div
        className={
          showModal ? "fixed inset-0 bg-gray-500/50 transition-opacity" : ""
        }
      ></div>
      <button
        className=" flex w-full items-center gap-[2px] md:gap-[4px] lg:gap-[6px] h-[25px] md:h-[30px] rounded-md p-[3px] hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-20 text-[10px] md:text-xs"
        onClick={() => setShowModal(true)}
      >
        <PencilIcon className="size-[14px] md:size-4 fill-white" />
        Change Password
      </button>
      {showModal ? (
        <PasswordChange
          showModal={showModal}
          setShowModal={setShowModal}
          loggedIn={loggedIn}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default PasswordChangeOption;
