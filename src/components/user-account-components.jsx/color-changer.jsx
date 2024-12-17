import { usePersistState } from "@printy/react-persist-state";
import { useState } from "react";

const ColorChanger = () => {
  const [isColorChanger, setIsColorChanger] = useState(false);
  const [selectedThemeColor, setSelectedThemeColor] = usePersistState(
    "#10141e",
    "selectedProfileColor"
  );
  const [selectedTextColor, setSelectedTextColor] = usePersistState(
    "#ef4444",
    "selectedTextColor"
  );

  return (
    <div className="relative">
      <div className="absolute">
        <div
          className={`${
            !isColorChanger ? "hidden" : "block"
          } flex flex-col bg-slate-300 rounded w-[10rem] h-[10rem] border-2 border-dashed border-red-500 justify-around`}
        >
          <div >
            <label style={{ color: selectedThemeColor }} className="p-1 text-xs md:text-sm lg:text-base">
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
          <div >
            <label style={{ color: selectedTextColor }} className="p-1 text-xs md:text-sm lg:text-base">
              Select Text Color:<br/>    
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
              className="text-red-500 w-[9.8rem] p-[0.3rem] rounded text-[10px] md:text-xs bg-[#10141e]"
              type="button"
              onClick={() => {
                setSelectedTextColor("#ef4444");
                setSelectedThemeColor("#10141e");
              }}
            >
              Click to set Default Colors
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setIsColorChanger(!isColorChanger);
        }}
        style={{ background: selectedTextColor, color: selectedThemeColor }}
        className="rounded p-1 text-[10px] md:text-xs h-[2rem] ms-[10.25rem] border-[1px]"
      >
        Change your Colors
      </button>
    </div>
  );
};

export default ColorChanger;
