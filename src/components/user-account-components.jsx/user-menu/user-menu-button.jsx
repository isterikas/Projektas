const UserMenuButton = () => {


    return (    <button
        type="button"
        onClick={() => {
          setIsUserMenu(!isUserMenu);
          setIsColorChanger(false);
          setIsPhotoUploader(false);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          color: selectedTextColor,
          boxShadow: `0 1px 3px 0 ${selectedTextColor}`,
          border: `1px solid ${selectedTextColor}`,
          background: isFocused || isHovered ? "#64748b" : "transparent",
          transition: "background 0.5s ease"
        }}
        
        className="rounded p-1 text-[10px] md:text-xs h-[2rem] ms-[7.5rem] md:ms-[8.5rem] lg:ms-[9.5rem] border-[1px]  w-[100px] md:w-[120px] "
      >
        User Menu
      </button> );

}
 
export default UserMenuButton;