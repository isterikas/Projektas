import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useDropzone } from "react-dropzone";
import { patchData } from "./helpers/update";
import { postImage } from "./helpers/post";
import { usePersistState } from "@printy/react-persist-state";
import { useNavigate } from "react-router";
import LogoIcon from "./navbar-components/logo-icon";
import { deleteAccount } from "./helpers/delete";

const UserAccount = () => {
  const {
    isLoading,
    setLoggedUser,
    error,
    setError,
    loggedUser,
    loggedIn,
    setLoggedIn,
  } = useOutletContext();
  const [userImage, setUserImage] = useState(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploader, setIsUploader] = useState(false);
  const [isColorChanger, setIsColorChanger] = useState(false);
  const [selectedThemeColor, setSelectedThemeColor] = usePersistState(
    "#10141e",
    "selectedProfileColor"
  );
  const [selectedTextColor, setSelectedTextColor] = usePersistState(
    "#ef4444",
    "selectedTextColor"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type != 1 && !loggedIn) navigate("/");
    }
  }, []);

  const timedClosure = () => {
    if (isUploadSuccess && !isLoading)
      setTimeout(() => {
        setIsUploader((prev) => !prev);
      }, 2000);
  };

  useEffect(() => {
    timedClosure();
  }, [isUploadSuccess]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPEG or PNG image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setUserImage(base64Image);
      await uploadImage(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const imageData = await postImage(formData);
      if (imageData.success) {
        const imagePath = imageData.imagePath;
        await patchData("users", loggedUser?.id, { image: imagePath });
        setLoggedUser((prev) => ({ ...prev, image: imagePath }));
        setIsUploadSuccess(true);
        setTimeout(() => {
          setUserImage(null);
        }, 2000);
      } else {
        setError("Error uploading image:", imageData.message);
      }
    } catch (error) {
      setError("Error uploading imageo:", error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
    multiple: false,
    maxFiles: 1,
  });

  if (isLoading) {
    return (
      <div className="text-white text-[3rem] flex flex-col items-center pt-[10rem] h-[100vh]">
        <p>Loading...</p>
        <div className="w-10 h-10 border-4 border-t-4 border-solid border-gray-300 border-t-blue-500 rounded-full animate-spin-around"></div>
      </div>
    );
  }

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  const formattedDate = getFormattedDate(loggedUser.created);

  const profileImage = loggedUser?.image ? (
    <img
      src={`http://localhost:5000${loggedUser.image}`}
      alt="Profile-image"
      className="profile-image-large"
      style={{ border: `2px solid ${selectedTextColor}` }}
    />
  ) : null;

  const handleDelete = async () => {
    await deleteAccount(loggedUser?.id);
    try {
      window.localStorage.clear();
      setLoggedIn("");
      setLoggedUser(null);
      navigate("/account/deleted")
    } catch (error) {
      window.alert("Error deleting account:", error.message);
    }
  };

  return (
    <div
      style={{ backgroundColor: selectedThemeColor }}
      className="relative p-4"
    >
      <div className="flex items-center justify-between pb-4 md:px-[2rem] lg:px-[4rem]">
        <LogoIcon />
        <button
          type="button"
          style={{ background: selectedTextColor, color: selectedThemeColor }}
          className="rounded p-2 text-xs"
        >
          To Homepage!
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div>{profileImage}</div>
        {profileImage ? (
          <p className="text-slate-300">Profile image</p>
        ) : error ? (
          <p className="text-3xl text-red-500">{error}</p>
        ) : (
          <p className="text-white font-semibold text-[1rem]">
            No image uploaded yet!
          </p>
        )}
        <p
          style={{ color: selectedTextColor }}
          className="text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-semibold "
        >
          {loggedUser?.userName}
        </p>
        <p
          style={{ color: selectedTextColor }}
          className="font-semibold opacity-70"
        >{`Member since: ${formattedDate}`}</p>
      </div>
      <div className="absolute bottom-0 right-[15rem]">
        <div className={`${!isUploader ? "hidden" : "block"}`}>
          <div
            {...getRootProps()}
            className="bg-slate-300 p-5 w-[10rem] h-[10rem] border-2 border-dashed border-red-500 rounded"
          >
            <input {...getInputProps()} />
            {!userImage ? (
              <p className="text-center text-red-500">
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
                <p className="text-green-500 text-center">Upload Successful!</p>
              )
            )}
          </div>
        </div>
        <button
          onClick={() => setIsUploader(!isUploader)}
          type="button"
          className="w-[10rem] text-xs bg-slate-300 mt-2 rounded p-1"
        >
          Change or Upload your image & Click to close
        </button>
      </div>

      <div className="absolute bottom-0 right-[10rem]">
        <div
          className={`${
            !isColorChanger ? "hidden" : "block"
          } flex flex-col bg-slate-300 rounded w-[10rem] h-[10rem] border-2 border-dashed border-red-500`}
        >
          <div className="mt-1">
            <label style={{ color: selectedThemeColor }} className="p-1">
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
          <div className="mt-2">
            <label style={{ color: selectedTextColor }} className="p-1">
              Select Text Color:
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
          <div className="mt-2">
            <button
              className="text-red-500 w-[9.8rem] p-[0.3rem] rounded text-xs bg-[#10141e]"
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
        <button
          type="button"
          onClick={() => {
            setIsColorChanger(!isColorChanger);
          }}
          className="text-xs bg-slate-300 w-[10rem] rounded mt-2 p-1"
        >
          Change your 'Theme or Text' Colors & Click to close
        </button>
      </div>
      <hr className=" md:mx-[2rem] lg:mx-[4rem] border-2 border-red-500" />
      <button
        type="submit"
        onClick={handleDelete}
        className="bg-green-500 text-white"
      >
        Delete Account
      </button>
      <p className="text-white text-4xl">Labas</p>
    </div>
  );
};

export default UserAccount;
