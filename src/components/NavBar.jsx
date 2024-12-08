import { useState } from "react";
import logoIcon from "../assets/icons/logo.svg";
import NavBarIcons from "./navbar-components/icons-navbar";
// import homeLogo from "../assets/icons/icon-nav-home.svg";

import HamburgerMenu from "./navbar-components/icon-navbarHamburger";

function NavBar(props) {
  const { authType, setAuthType, loggedIn, setLoggedIn } = props;

  const [isHomeLogo, setIsHomeLogo] = useState("");
  const [isMoviesLogo, setIsMoviesLogo] = useState("");
  const [isTVSeriesLogo, setIsTVSeriesLogo] = useState("");
  const [isBookmarksLogo, setIsBookmarksLogo] = useState("");
  return (
    <>
      {authType ? (
        ""
      ) : (
        <nav className="flex justify-between p-[2rem] border bg-[#161D2F] text-white rounded-[10px]">
          <div>
            <img
              src={logoIcon}
              alt="SVG Image"
              className="w-[25px] h-[20px] md:w-[32px] md:h-[26px]"
            />
          </div>
          <div className="flex">
            <NavBarIcons
              isHomeLogo={isHomeLogo}
              setIsHomeLogo={setIsHomeLogo}
              isMoviesLogo={isMoviesLogo}
              setIsMoviesLogo={setIsMoviesLogo}
              isTVSeriesLogo={isTVSeriesLogo}
              setIsTVSeriesLogo={setIsTVSeriesLogo}
              isBookmarksLogo={isBookmarksLogo}
              setIsBookmarksLogo={setIsBookmarksLogo}
            />
          </div>
          <div className="text-right">
            {!loggedIn ? (
              <div>
                <HamburgerMenu
                  setAuthType={setAuthType}
                  setLoggedIn={setLoggedIn}
                />
              </div>
            ) : (
              <div>ShowIcon</div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
