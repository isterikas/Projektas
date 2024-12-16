import { useEffect } from "react";
import LogoIcon from "./logo-icon";
import HamburgerMenu from "./navbar-hamburger-icon";
import UserIcon from "./user-icon";
import NavBarIcons from "./navbar-active-icons";

const ExpandingDiv = (props) => {
  const { setAuthType, loggedIn, setLoggedIn } = props;

  useEffect(() => {
    // Function to handle scroll and update height
    const handleScroll = () => {
        const expandingDiv = document.querySelector('.expanding-navbar');;
      const scrollPosition = window.scrollY;

      // Increase height based on the scroll position
      const newHeight = 90 + scrollPosition / 15; // This controls the speed of expansion

      // Set the new height, with a max height limit
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
            <UserIcon setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </div>
        )}
      </div>
    </nav>
  );
};
export default ExpandingDiv;
