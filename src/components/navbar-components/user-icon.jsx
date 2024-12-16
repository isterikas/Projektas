import faviconIcon from "../../assets/images/favicon-32x32.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const UserIcon = (props) => {
  const { setLoggedIn, loggedUser } = props;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setTimeout(() => {
      setLoggedIn(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="relative">
      {loggedUser?.image ? <img
        src={`http://localhost:5000${loggedUser.image}`}
        alt="userImage"
        onClick={() => {setIsMenuOpen(!isMenuOpen)}}
        className={`${!isMenuOpen ? "profile-image-small cursor-pointer" : "profile-image-small"}`}
      /> : <img
        src={faviconIcon}
        alt="faviconIcon"
        onClick={() => {setIsMenuOpen(!isMenuOpen)}}
        className={`${!isMenuOpen ? "profile-image-small cursor-pointer" : "profile-image-small"}`}
      />}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        }   bg-[#353d53] absolute left-[-200%] md:left-[-75%] lg:top-[-300%] lg:left-[-50%] rounded-md w-[5rem] text-center mt-2 z-[999] shadow-2xl shadow-red-500 border-[1px] border-red-400`}
      >
        <Link to="/account">
          <p className="text-white block px-2 py-3 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold hover:border-b-red-500 hover:border-b-[1px]">
            Account
          </p>
        </Link>
        <button
          type="button"
          onClick={handleLogOut}
          className="text-white block px-2 py-3 hover:bg-gray-200 hover:text-[#161D2F] rounded-md font-semibold  hover:border-t-red-500 hover:border-t-[1px] w-full"
        >
          Log Out
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default UserIcon;