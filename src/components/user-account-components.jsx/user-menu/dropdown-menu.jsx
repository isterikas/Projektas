import { useState } from "react";
// import UserMenuButton from "./user-menu-button";
import PhotoUploader from "./photo-uploader";
import ColorChanger from "./color-changer";
import { useEffect } from "react";

const UserDropDownMenu = (props) => {
  const {
    selectedTextColor,
    setSelectedTextColor,
    selectedThemeColor,
    setSelectedThemeColor,
    getInputProps,
    getRootProps,
    isUploadSuccess,
    userImage,
    isLoading,
    navigate,
  } = props;

  const [isUserMenu, setIsUserMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isColorChanger, setIsColorChanger] = useState(false);
  const [isPhotoUploader, setIsPhotoUploader] = useState(false);

  const closeMenu = () => {
    if (isUserMenu) {
      setIsFocused(true);
    }
    else (setIsFocused(false))
  };
  useEffect(() => {
    closeMenu;
  }, []);

  return (
    <div className="flex flex-col relative">
      <button
        type="button"
        onClick={() => {
          setIsUserMenu(!isUserMenu);
          setIsColorChanger(false);
          setIsPhotoUploader(false);
        }}
        // onFocus={() => setIsFocused(true)}
        // onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          color: selectedTextColor,
          boxShadow: `0 1px 10px 0 ${selectedTextColor}`,
          border: `1px solid ${selectedTextColor}`,
          background: isFocused || isHovered ? "#64748b" : "transparent",
          transition: "background 0.5s ease",
        }}
        className="rounded p-1 text-[10px] md:text-xs h-[2rem] ms-[120px] md:ms-[8.5rem] lg:ms-[9.5rem] border-[1px] w-[90px] md:w-[100px] lg:w-[120px]"
      >
        User Menu
      </button>
      <div
        className={`absolute top-[2.5rem] w-[100px] md:w-[120px] ${
          isUserMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } transition-all duration-300 ease-in-out`}
      >
        {isUserMenu && (
          <div>
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              style={{
                color: selectedTextColor,
                boxShadow: ` 0 1px 3px 0 ${selectedTextColor}`,
                border: `1px solid ${selectedTextColor}`,
                transition: "background 0.5s ease",
              }}
              className="rounded p-1 text-[10px] md:text-xs h-[2rem] ms-[120px] md:ms-[8.5rem] lg:ms-[9.5rem] w-[90px] md:w-[100px] lg:w-[120px] hover:bg-slate-700 focus:bg-slate-600"
            >
              Homepage
            </button>
            <PhotoUploader
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              userImage={userImage}
              isLoading={isLoading}
              isUploadSuccess={isUploadSuccess}
              selectedTextColor={selectedTextColor}
              isPhotoUploader={isPhotoUploader}
              setIsPhotoUploader={setIsPhotoUploader}
              setIsColorChanger={setIsColorChanger}
            />
            <ColorChanger
              selectedTextColor={selectedTextColor}
              setSelectedTextColor={setSelectedTextColor}
              selectedThemeColor={selectedThemeColor}
              setSelectedThemeColor={setSelectedThemeColor}
              isColorChanger={isColorChanger}
              setIsColorChanger={setIsColorChanger}
              setIsPhotoUploader={setIsPhotoUploader}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropDownMenu;
