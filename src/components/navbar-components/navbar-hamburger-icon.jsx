import { useState } from "react";
import { NavLink } from "react-router";

function HamburgerMenu(props) {
  const { setAuthType, setLoggedIn } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        className="flex flex-col w-[24px] h-[20px] md:w-[32px] md:h-[26px] justify-around group "
      >
        <span className="block w-full h-[4px] bg-white group-hover:bg-red-500 transition duration-500"></span>
        <span className="block w-full h-[4px] bg-white group-hover:bg-red-500 transition duration-500"></span>
        <span className="block w-full h-[4px] bg-white group-hover:bg-red-500 transition duration-500"></span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } bg-[#5A698F] absolute left-[-200%] md:left-[-75%] lg:top-[-400%] rounded-md w-[5rem] text-center mt-2 z-[999] shadow-2xl shadow-red-500 border-[1px] border-red-400`}
      >
        <NavLink to="/authorization">
          <p
            type="button"
            onClick={login}
            className="text-white block px-2 py-3 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold hover:border-b-red-500 hover:border-b-[1px]"
          >
            Log In
          </p>
        </NavLink>
        <NavLink to="/authorization">
          <p
            type="button"
            onClick={sigin}
            className="text-white block p-2 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold hover:border-t-red-500 hover:border-t-[1px]"
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
