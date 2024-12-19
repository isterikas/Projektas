import { useEffect } from "react";
import ClickOutside from "./click-outside";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";

const PhotoUploader = (props) => {
  const {
    getRootProps,
    getInputProps,
    userImage,
    isLoading,
    isUploadSuccess,
    selectedTextColor,
    isPhotoUploader,
    setIsPhotoUploader,
    setIsColorChanger,
  } = props;

  const timedUploadClosure = () => {
    if (isUploadSuccess && !isLoading)
      setTimeout(() => {
        setIsPhotoUploader((prev) => !prev);
      }, 3000);
  };

  useEffect(() => {
    timedUploadClosure();
  }, [isUploadSuccess]);

  const closePhotoUploader = ClickOutside(() => {
    setIsPhotoUploader(false);
  });

  return (
    <div ref={closePhotoUploader} className="relative">
      <div className="absolute">
        <div className={`${!isPhotoUploader ? "hidden" : "block"}`}>
          <div
            {...getRootProps()}
            className="bg-slate-300 p-5 w-[7rem] md:w-[8rem] lg:w-[9rem] border-2 border-dashed border-red-500 rounded"
          >
            <input {...getInputProps()} />
            {!userImage ? (
              <p className="text-center text-red-500 text-[10px] md:text-xs lg:text-sm">
                Drag & drop an image here, or Click to select an image
              </p>
            ) : isLoading ? (
              <div className="text-white text-[3rem] flex flex-col items-center pt-[10rem] h-[100vh]">
                <p>Uploading...</p>
                <div className="spinner"></div>
              </div>
            ) : (
              isUploadSuccess &&
              !isLoading && (
                <p className="text-green-500 text-center text-[10px] md:text-xs lg:text-sm">
                  Upload Successful!
                </p>
              )
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setIsPhotoUploader(!isPhotoUploader);
          setIsColorChanger(false);
        }}
        type="button"
        style={{
          color: selectedTextColor,
          boxShadow: ` 0 1px 3px 0 ${selectedTextColor}`,
          border: `1px solid ${selectedTextColor}`,
          transition: "background 0.5s ease",
        }}
        className="flex items-center rounded p-[3px] gap-1 md:gap-2 text-[10px] md:text-xs h-[25px] md:h-[30px] ms-[120px] md:ms-[8.5rem] lg:ms-[9.5rem] border-[1px] w-[90px] md:w-[100px] lg:w-[120px] hover:bg-slate-700 focus:bg-slate-600"
      >
        <ArrowUpOnSquareIcon
          style={{ fill: selectedTextColor }}
          className="size-[14px] md:size-4 "
        />
        Upload Image
      </button>
    </div>
  );
};

export default PhotoUploader;
