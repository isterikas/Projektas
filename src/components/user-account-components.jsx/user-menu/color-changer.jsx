import ClickOutside from "./click-outside";
import { SwatchIcon } from "@heroicons/react/24/solid";

const ColorChanger = (props) => {
  const {
    selectedThemeColor,
    setSelectedThemeColor,
    selectedTextColor,
    setSelectedTextColor,
    setIsColorChanger,
    isColorChanger,
    setIsPhotoUploader,
  } = props;

  const closeColorChanger = ClickOutside(() => {
    setIsColorChanger(false);
  });

  return (
    <div ref={closeColorChanger} className="relative">
      <div className="absolute">
        <div
          className={`${
            !isColorChanger ? "hidden" : "block"
          } flex flex-col bg-slate-300 rounded w-[7rem] md:w-[8rem] lg:w-[9rem] border-2 border-dashed border-red-500`}
        >
          <div>
            <label
              style={{ color: selectedThemeColor }}
              className="p-1 text-[10px] md:text-xs lg:text-sm"
            >
              Select Theme Color:
            </label>
            <input
              type="color"
              value={selectedThemeColor}
              onChange={(e) => {
                setSelectedThemeColor(e.target.value);
              }}
              className="p-2 bg-white"
            />
          </div>
          <div>
            <label
              style={{ color: selectedTextColor }}
              className="p-1 text-[10px] md:text-xs lg:text-sm"
            >
              Select Text Color:
              <br />
            </label>
            <input
              type="color"
              value={selectedTextColor}
              onChange={(e) => {
                setSelectedTextColor(e.target.value);
              }}
              className="p-2 bg-white"
            />
          </div>

          <div>
            <button
              className="text-red-500 mt-1 w-full p-[0.3rem] rounded text-[10px] md:text-xs bg-[#10141e]"
              type="button"
              onClick={() => {
                setSelectedTextColor("#ef4444");
                setSelectedThemeColor("#10141e");
              }}
            >
              Set Default Colors
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setIsColorChanger(!isColorChanger);
          setIsPhotoUploader(false);
        }}
        style={{
          color: selectedTextColor,
          boxShadow: ` 0 1px 3px 0 ${selectedTextColor}`,
          border: `1px solid ${selectedTextColor}`,
          transition: "background 0.5s ease",
        }}
        className="absolute bnt-user-menu-group"
      >
        <SwatchIcon
          style={{ fill: selectedTextColor }}
          className="size-[14px] md:size-4 "
        />
        Change Colors
      </button>
    </div>
  );
};

export default ColorChanger;
