import { NavLink } from "react-router";

const NavBarIcons = (props) => {

const {loggedIn} = props

// const user = loggedIn === "e319"

const userLogged = () => {
   if (loggedIn === "e319")
  return true}

   const user = userLogged()

  return (
    <div className="flex justify-between w-[134px] h-[16px] md:w-[173px] md:h-[20px] lg:w-[20px] lg:h-[200px] lg:flex-col">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "fill-white transition duration-500 hover:animate-pulse w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
            : "fill-[#5A698F] hover:fill-red-500 hover:shadow-2xl hover:shadow-red-500 transition duration-500 w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" />
        </svg>
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive
            ? "fill-white transition duration-500 hover:animate-pulse w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
            : "fill-[#5A698F] hover:fill-red-500 hover:shadow-2xl hover:shadow-red-500 transition duration-500 w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
        </svg>
      </NavLink>
      <NavLink
        to="/tvseries"
        className={({ isActive }) =>
          isActive
            ? "fill-white transition duration-500 hover:animate-pulse w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
            : "fill-[#5A698F] hover:fill-red-500 hover:shadow-2xl hover:shadow-red-500 transition duration-500 w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
        </svg>
      </NavLink>
      { !user && <NavLink
        to="/bookmarks"
        className={({ isActive }) =>
          isActive
            ? "fill-white transition duration-500 hover:animate-pulse w-[16px] h-[16px] md:w-[20px] md:h-[20px]"
            : "fill-[#5A698F] hover:fill-red-500 hover:shadow-2xl hover:shadow-red-500 transition duration-500 w-[14px] h-[16px] md:w-[17px] md:h-[20px]"
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 20">
          <path d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z" />
        </svg>
      </NavLink>}
    </div>
  );
};
export default NavBarIcons;
