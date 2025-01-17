import { useState } from "react";
import PhotoUploader from "./photo-uploader";
import ColorChanger from "./color-changer";
import { Bars3Icon, HomeIcon } from "@heroicons/react/16/solid";

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
  const [isColorChanger, setIsColorChanger] = useState(false);
  const [isPhotoUploader, setIsPhotoUploader] = useState(false);

  return (
    <div className="flex flex-col relative">
      <button
        type="button"
        onClick={() => {
          setIsUserMenu(!isUserMenu);
          setIsColorChanger(false);
          setIsPhotoUploader(false);
        }}
        style={{
          color: selectedTextColor,
          boxShadow: `0 1px 10px 0 ${selectedTextColor}`,
          border: `1px solid ${selectedTextColor}`,
          transition: "background 0.5s ease",
        }}
        className=" btn-user-menu"
      >
        <Bars3Icon
          style={{ fill: selectedTextColor }}
          className="size-[14px] md:size-4"
        />
        User Menu
      </button>
      <div
        className={`absolute top-[30px] md:top-[40px] w-[100px] md:w-[120px] ${
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
              className=" bnt-user-menu-group"
            >
              <HomeIcon
                style={{ fill: selectedTextColor }}
                className="size-[14px] md:size-4"
              />
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
