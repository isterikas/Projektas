import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { useDropzone } from "react-dropzone";
import { patchData } from "./helpers/update";
import { postImage } from "./helpers/post";
import { usePersistState } from "@printy/react-persist-state";
import Loading from "./Loading";

const UserAccount = () => {
  const { isLoading, setLoggedUser, error, setError, loggedUser, loggedIn } =
    useOutletContext();
  const [userImage, setUserImage] = useState(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedProfileColor, setSelectedProfileColor] = usePersistState(
    "#10141e",
    "selectedProfileColor"
  );
  const [selectedTextColor, setSelectedTextColor] = usePersistState(
    "#ef4444",
    "selectedTextColor"
  );

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type != 1 && !loggedIn) navigate("/");
    }
  }, []);

  const timedClosure = () => {
    if (isUploadSuccess && !isLoading)
      setTimeout(() => {
        setIsUploaded((prev) => !prev);
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
      setError("Error uploading image:", error.message);
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

  const profileImage = loggedUser?.image ? (
    <img
      src={`http://localhost:5000${loggedUser.image}`}
      alt="Profile-image"
      className="profile-image-large"
      style={{ border: `2px solid ${selectedTextColor}` }}
    />
  ) : null;

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };
  const formattedDate = getFormattedDate(loggedUser.created);

  return (
    <div
      style={{ backgroundColor: selectedProfileColor }}
      className="relative p-4"
    >
      <div className="flex flex-col items-center">
        <div>{profileImage}</div>
        {profileImage ? (
          <p className="text-slate-300">Profile image</p>
        ) : error ? (
          <p className="text-3xl text-red-500">{error}</p>
        ) : (
          <p className="text-red-500 font-semibold text-[1.5rem]">
            No image uploaded yet!
          </p>
        )}
        <p
          style={{ color: selectedTextColor }}
          className="text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] font-semibold "
        >
          {loggedUser?.userName}
        </p>
        <p
          style={{ color: selectedTextColor }}
          className="font-semibold opacity-70"
        >{`Member since: ${formattedDate}`}</p>
      </div>
      <div className="absolute bottom-0 right-[15rem]">
        <div className={`${!isUploaded ? "hidden" : "block"}`}>
          <div
            {...getRootProps()}
            className="bg-slate-300 p-5 w-[10rem] h-[10rem] border-2 border-dashed border-red-500"
          >
            <input {...getInputProps()} />
            {!userImage ? (
              <p className="text-center text-red-500">
                Drag & drop an image here, or click to select an image
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
          onClick={() => setIsUploaded(!isUploaded)}
          type="button"
          className="w-[10rem] text-xs bg-slate-300 mt-2 rounded p-1"
        >
          Change or upload your image & click to close
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mt-2">
          <label className="text-white p-1">Select Profile Theme Color:</label>
          <input
            type="color"
            value={selectedProfileColor}
            onChange={(e) => {
              setSelectedProfileColor(e.target.value);
            }}
            className="p-2 bg-slate-300"
          />
        </div>
        <div className="mt-2">
          <label className="text-white p-1">Select Text Color:</label>
          <input
            type="color"
            value={selectedTextColor}
            onChange={(e) => {
              setSelectedTextColor(e.target.value);
            }}
            className="p-2 bg-slate-300"
          />
        </div>
        <div className="mt-2">
          <button
            style={{ background: selectedTextColor }}
            className="text-white p-2 w-[10rem] rounded text-xs"
            type="button"
            onClick={() => {
              setSelectedTextColor("#ef4444");
              setSelectedProfileColor("#10141e");
            }}
          >
            Click to Set Default Colors
          </button>
        </div>
      </div>
      <div
        className={
          showModal ? "fixed inset-0 bg-gray-500/75 transition-opacity" : ""
        }
      ></div>
      <button
        className="text-white p-2 bg-red-900 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Change Password
      </button>
      {showModal ? (
        <PasswordChange
          showModal={showModal}
          setShowModal={setShowModal}
          loggedIn={loggedIn}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserAccount;
