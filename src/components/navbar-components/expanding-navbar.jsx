import { useEffect } from "react";
import HamburgerMenu from "./navbar-hamburger-icon";
import UserIcon from "./user-icon";
import NavBarIcons from "./navbar-active-icons";
import LogoIcon from "./logo-icon";

const ExpandingNavbar = (props) => {
  const { setAuthType, loggedIn, setLoggedIn, loggedUser } = props;

  useEffect(() => {
    const handleScroll = () => {
        const expandingDiv = document.querySelector('.expanding-navbar');;
      const scrollPosition = window.scrollY;

      const newHeight = 90 + scrollPosition / 15; 

      expandingDiv.style.height = `${Math.min(newHeight, 137)}vh`;
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="lg:flex lg:justify-between lg:items-center expanding-navbar lg:flex-col lg:px-0 lg:rounded-[20px] hidden lg:block">
      <div className="lg:mt-[32px]">
        <LogoIcon />
      </div>
      <div className="lg:h-[70%] mt-[50px]">
        <NavBarIcons loggedIn={loggedIn}/>
      </div>
      <div className="lg:mb-[32px]">
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
            <UserIcon setLoggedIn={setLoggedIn} loggedIn={loggedIn} loggedUser={loggedUser} />
          </div>
        )}
      </div>
    </nav>
  );
};
export default ExpandingNavbar;
