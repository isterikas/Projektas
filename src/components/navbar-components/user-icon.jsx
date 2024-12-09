import faviconIcon from '../../assets/images/favicon-32x32.png'
import { useState } from "react";
import { useNavigate } from "react-router";

const UserIcon = (props) => {

  const { setIsLoggedIn} = props

  const [isOpen, setISOpen] = useState(false);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setISOpen(!isOpen)
  }

const logOut = () => {
  setIsLoggedIn(false)
  navigate("/")

}


  return (
    <div className='relative'>
      <img
        src={faviconIcon}
        alt="faviconIcon"
        onClick={toggleMenu}
        className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] lg:w-[40px] lg:h-[40px] rounded-full"
      />{" "}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        }   bg-[#363d4e] absolute left-[-200%] md:left-[-75%] lg:top-[-175%] lg:left-[-50%] rounded-md w-[5rem] text-center mt-2 z-[999]`}
      >
        <p
          type="button"
          onClick={logOut}
          className="text-white block px-2 py-3 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold"
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default UserIcon;
