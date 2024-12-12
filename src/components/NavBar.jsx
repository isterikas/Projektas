import { useLocation } from "react-router";
import LogoIcon from "./navbar-components/logo-icon.jsx";
import NavBarIcons from "./navbar-components/navbar-active-icons";
import HamburgerMenu from "./navbar-components/navbar-hamburger-icon";
import UserIcon from "./navbar-components/user-icon.jsx";

function NavBar(props) {
  const { setAuthType, loggedIn, setLoggedIn } = props;
  const location = useLocation();
  return (
    <>
      {location.pathname == "/authorization" || location.pathname == "/authorization/" ? (
        ""
      ) : (
        <nav className="flex justify-between bg-[#161D2F] h-[56px] md:h-[72px] lg:w-[96px] lg:h-[960px] items-center px-[16px] md:px-[24px] lg:px-0  md:rounded-[10px] lg:rounded-[20px] lg:flex-col">
          <div className="lg:mt-[32px]">
            <LogoIcon />
          </div>
          <div className="lg:h-[70%]">
            <NavBarIcons />
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
                <UserIcon setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
