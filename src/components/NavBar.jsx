import { useState } from "react";
import logoIcon from "../assets/icons/logo.svg";
import NavBarIcons from "./navbar-components/navbar-active-icons";
import HamburgerMenu from "./navbar-components/navbar-hamburger-icon";
import UserIcon from "./navbar-components/user-icon.jsx";

function NavBar(props) {
  const { authType, setAuthType, loggedIn, setLoggedIn } = props;

  const [isHomeLogo, setIsHomeLogo] = useState(true);
  const [isMoviesLogo, setIsMoviesLogo] = useState("");
  const [isTVSeriesLogo, setIsTVSeriesLogo] = useState("");
  const [isBookmarksLogo, setIsBookmarksLogo] = useState("");
  return (
    <>
      {authType ? (
        ""
      ) : (
        <nav className="flex justify-between bg-[#161D2F] h-[56px] md:h-[72px] lg:w-[96px] lg:h-[960px] items-center px-[16px] md:px-[24px] lg:px-0  md:rounded-[10px] lg:rounded-[20px] lg:flex-col">
          <div className="lg:mt-[32px]">
            <img
              src={logoIcon}
              alt="SVG Image"
              className="w-[25px] h-[20px] md:w-[32px] md:h-[26px]"
            />
          </div>
          <div className="lg:h-[70%]">
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
          <div className="lg:mb-[32px]">
            {!loggedIn ? (
              <div>
                <HamburgerMenu
                  setAuthType={setAuthType}
                  setLoggedIn={setLoggedIn}
                />
              </div>
            ) : (
              <div>
                <UserIcon setLoggedIn={setLoggedIn} />
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
