import { useLocation } from "react-router";
import LogoIcon from "./navbar-components/logo-icon.jsx";
import NavBarIcons from "./navbar-components/navbar-active-icons";
import HamburgerMenu from "./navbar-components/navbar-hamburger-icon";
import UserIcon from "./navbar-components/user-icon.jsx";
import ExpandingNavbar from "./navbar-components/expanding-navbar.jsx";

function NavBar(props) {
  const { setAuthType, loggedIn, setLoggedIn, loggedUser } = props;
  const location = useLocation();

  return (
    <>
      {location.pathname == "/authorization" ||
      location.pathname == "/authorization/" ||
      location.pathname == "/account" ||
      location.pathname == "/account/" ||
      location.pathname == "/account/deleted" ||
      location.pathname == "/account/deleted/" ? (
        ""
      ) : (
        <div>
          <nav
            className="flex justify-between items-center bg-[#161D2F] px-[16px] h-[56px] md:h-[72px] md:px-[24px] md:rounded-[10px] lg:hidden
          "
          >
            <div className="lg:mt-[32px]">
              <LogoIcon />
            </div>
            <div className="lg:h-[70%]">
              <NavBarIcons loggedIn={loggedIn} />
            </div>
            <div className="mx-[34px] my-[34px]">
              {!loggedIn ? (
                <div>
                  <HamburgerMenu
                    setAuthType={setAuthType}
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                  />
                </div>
              ) : (
                <div>
                  <UserIcon
                    setLoggedIn={setLoggedIn}
                    loggedIn={loggedIn}
                    loggedUser={loggedUser}
                  />
                </div>
              )}
            </div>
          </nav>
          <ExpandingNavbar
            setAuthType={setAuthType}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
            loggedUser={loggedUser}
          />
        </div>
      )}
    </>
  );
}

export default NavBar;
