import { useState } from "react";
import { NavLink } from "react-router";

function HamburgerMenu(props) {
  const { setAuthType, setLoggedIn } = props;

  const [isOpen, setIsOpen] = useState("");

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const sigin = () => {
    setAuthType("signup");
    setLoggedIn("");
  };

  const login = () => {
    setAuthType("login");
    setLoggedIn("");
  };

  return (
    <div className="relative ">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="flex flex-col w-[25px] h-[20px] md:w-[32px] md:h-[26px] justify-around group "
      >
        <span className="block w-full h-[4px] bg-white group-hover:bg-red-500 transition duration-500"></span>
        <span className="block w-full h-[4px] bg-white group-hover:bg-red-500 transition duration-500"></span>
        <span className="block w-full h-[4px] bg-white group-hover:bg-red-500 transition duration-500"></span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        }   bg-[#161D2F] absolute  left-[-120%] md:left-[-80%] rounded-md w-[5rem] text-center mt-2 z-[999]`}
      >
        <NavLink to="/authorization">
          <p
            type="button"
            onClick={login}
            className="text-white block p-2 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold"
          >
            Log In
          </p>
        </NavLink>
        <NavLink to="/authorization">
          <p
            type="button"
            onClick={sigin}
            className="text-white block p-2 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold"
          >
            Sign up
          </p>
        </NavLink>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default HamburgerMenu;
