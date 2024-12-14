import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useDropzone } from "react-dropzone";
import { patchData } from "./helpers/update";
import { postImage } from "./helpers/post";

const UserAccount = () => {
  const { users, loggedIn, error, setError } = useOutletContext();
  const [userImage, setUserImage] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const findUser = () => {
    const thisUser = users.find((user) => user.id === loggedIn);
    setLoggedUser(thisUser);
    setIsLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      findUser();
    }
  }, [loggedIn]);

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
    return <div>Loading...</div>;
  }

  const profileImage = (
    <img
      src={`http://localhost:5000${loggedUser.image}`}
      alt="Profile-image"
      className="profile-image-large"
    />
  );

  return (
    <div className="backgroud-dark-blue mt-[5rem] ms-[10rem] relative">
      <div className="flex flex-col items-center p-10">
        <div>{profileImage}</div>
        {profileImage ? (
          <p className="text-white">Profile image</p>
        ) : error ? (
          <p className="text-3xl text-red-500">{error}</p>
        ) : (
          <p className="text-white">No image uploaded yet</p>
        )}
        <p className="text-4xl p-2 text-white">{loggedUser?.userName}</p>
      </div>
      <div className="absolute bottom-0 right-2">
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
              <div className="text-center">
                <p>Uploading...</p>
                <div className="spinner"></div>
              </div>
            ) : (
              isUploadSuccess &&
              !isLoading && (
                <p className="text-red-500 text-center">Upload Successful!</p>
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
    </div>
  );
};

export default UserAccount;
