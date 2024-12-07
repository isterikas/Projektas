import { NavLink } from "react-router";
import logoIcon from "../assets/icons/logo.svg";
import homeLogo from "../assets/icons/icon-nav-home.svg";
import moviesLogo from "../assets/icons/icon-nav-movies.svg";
import tvSeriesLogo from "../assets/icons/icon-nav-tv-series.svg";
import bookmarklogo from "../assets/icons/icon-nav-bookmark.svg";
import HamburgerMenu from "./comp-icons/icon-hamburger";

function NavBar(props) {
  const { authType, setAuthType, loggedIn, setLoggedIn } = props;

  // const sigin = () => {
  //   setAuthType("signup");
  //   setLoggedIn("");
  // };

  // const login = () => {
  //   setAuthType("login");
  //   setLoggedIn("");
  // };
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
          <div className="flex justify-center gap-5">
            <NavLink to="/">
              <img src={homeLogo} alt="SVG Image" className="" />
            </NavLink>
            <NavLink to="/movies">
              <img src={moviesLogo} alt="SVG Image" className="" />
            </NavLink>
            <NavLink to="/tvshows">
              <img src={tvSeriesLogo} alt="SVG Image" className="" />
            </NavLink>
            <NavLink to="/bookmarks">
              <img src={bookmarklogo} alt="SVG Image" className="" />
            </NavLink>
          </div>
          <div className="text-right">
            {!loggedIn ? (
              <div>
                <HamburgerMenu
                  setAuthType={setAuthType}
                  setLoggedIn={setLoggedIn}
                />
                {/* <NavLink to="/authorization">
                  <button className="me-2" type="button" onClick={login}>
                    Log In
                  </button>
                </NavLink>
                <NavLink to="/authorization">
                  <button className="ms-2" type="button" onClick={sigin}>
                    Sign up
                  </button>
                </NavLink> */}
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
