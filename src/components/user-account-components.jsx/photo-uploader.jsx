import { useEffect } from "react";

const PhotoUploader = (props) => {
  const {
    getRootProps,
    getInputProps,
    userImage,
    isLoading,
    isUploadSuccess,
    selectedTextColor,
    selectedThemeColor,
    isPhotoUploader,
    setIsPhotoUploader,
    setIsColorChanger,
  } = props;

  const timedClosure = () => {
    if (isUploadSuccess && !isLoading)
      setTimeout(() => {
        setIsPhotoUploader((prev) => !prev);
      }, 3000);
  };

  useEffect(() => {
    timedClosure();
  }, [isUploadSuccess]);

  return (
    <div className="relative">
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
                <p className="text-green-500 text-center text-[10px] md:text-xs lg:text-sm">Upload Successful!</p>
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
            background: selectedThemeColor,
            color: selectedTextColor,
            boxShadow: ` 0 1px 3px 0 ${selectedTextColor}`,
            border: `1px solid ${selectedTextColor}`,
          }}
        className="rounded p-1 text-[10px] md:text-xs h-[2rem] ms-[7.5rem] md:ms-[8.5rem] lg:ms-[9.5rem] border-[1px] w-[100px] md:w-[120px]"
      >
        Upload your image
      </button>
    </div>
  );
};

export default PhotoUploader;
