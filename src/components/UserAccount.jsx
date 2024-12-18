import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useDropzone } from "react-dropzone";
import { patchData } from "./helpers/update";
import { postImage } from "./helpers/post";
import { usePersistState } from "@printy/react-persist-state";
import { useNavigate } from "react-router";
import LogoUserIcon from "./user-account-components.jsx/logo-user-icon";
import Loading from "./Loading";
import UserOptions from "./user-account-components.jsx/user-options";
import UserDropDownMenu from "./user-account-components.jsx/user-menu/dropdown-menu";
import CameraIcon from "./user-account-components.jsx/camera-icon";

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
  const [selectedThemeColor, setSelectedThemeColor] = usePersistState(
    "#10141e",
    "selectedProfileColor"
  );
  const [selectedTextColor, setSelectedTextColor] = usePersistState(
    "#ef4444",
    "selectedTextColor"
  );
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type != 1 && !loggedIn) navigate("/");
    }
  }, []);

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
    return <Loading />;
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
      style={{
        border: `2px solid ${selectedTextColor}`,
        boxShadow: ` 0 1px 25px 0 ${selectedTextColor}`,
      }}
    />
  ) : null;

  return (
    <div>
      <div
        style={{ backgroundColor: selectedThemeColor }}
        className="relative px-2 py-4 md:px-4 mx-1 md:mx-4 lg:mx-6 border-2 rounded-2xl border-blue-900"
      >
        <div className="md:mx-[1rem] lg:mx-[2rem]">
          <div className="flex items-center justify-between mb-4 ">
            <LogoUserIcon selectedTextColor={selectedTextColor} />
            <UserDropDownMenu
              selectedTextColor={selectedTextColor}
              setSelectedTextColor={setSelectedTextColor}
              selectedThemeColor={selectedThemeColor}
              setSelectedThemeColor={setSelectedThemeColor}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              userImage={userImage}
              isLoading={isLoading}
              isUploadSuccess={isUploadSuccess}
              navigate={navigate}
            />
          </div>
          <div className="flex flex-col items-center">
            <div>{profileImage}</div>
            {profileImage ? (
              <p className="text-slate-300">Profile image</p>
            ) : error ? (
              <p className="text-3xl text-red-500">{error}</p>
            ) : (
              <p className="text-white font-semibold animate-bounce text-[12px] md:text-[16px] lg:text-[20px]">
                No image uploaded yet!
              </p>
            )}
            <p
              style={{ color: selectedTextColor }}
              className="text-[20px] md:text-[2rem] lg:text-[2.5rem] font-semibold "
            >
              {loggedUser?.userName}
            </p>
            <p
              style={{ color: selectedTextColor }}
              className="font-semibold text-[13px] md:text-[18px] lg:text-[23px]"
            >{`Member since: ${formattedDate}`}</p>
          </div>
          <hr
            style={{ border: `1px solid ${selectedTextColor}` }}
            className="mt-4"
          />
          <div className="flex justify-between"></div>
          <div
            className=" text-[6rem] md:text-[7rem] lg:text-[8rem] flex justify-center items-center ms-[7rem] md:ms-0 md:h-[210px] rounded-[5rem] w-[10rem] h-[11rem]"
            // style={{
            //   boxShadow: isHovered
            //     ? `70px 35px 140px 40px #ffffff, inset -20px -5px 40px 0 #ffffff`
            //     : "none",
            //   transition: "box-shadow 0.3s ease",
            // }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            🎥
          </div>
          <UserOptions
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
            setLoggedIn={setLoggedIn}
            navigate={navigate}
            showModal={showModal}
            setShowModal={setShowModal}
            loggedIn={loggedIn}
          />
          <hr
            style={{ border: `2px solid ${selectedTextColor}` }}
            className="my-1"
          />
        </div>
      </div>
      <CameraIcon />
    </div>
  );
};

export default UserAccount;
