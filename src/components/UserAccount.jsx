import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useDropzone } from "react-dropzone";
import { patchData } from "./helpers/update";

const UserAccount = () => {
  const { users, loggedIn } = useOutletContext();
  const [userImage, setUserImage] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [upload, setUpload] = useState(false);

  const findUser = () => {
    const thisUser = users.find((user) => user.id === loggedIn);
    setLoggedUser(thisUser);
    setLoading(false);
  };

  useEffect(() => {
    if (loggedIn) {
      findUser();
    }
  }, [loggedIn]);

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

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        const imagePath = data.imagePath;

        await patchData("users", loggedUser?.id, { image: imagePath });
        setLoggedUser((prev) => ({ ...prev, image: imagePath }));
        setUploadSuccess(true);
      } else {
        console.error("Error uploading image:", data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
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

  if (loading) {
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
    <div className="bg-yellow-200 mt-[5rem] ms-[10rem] relative">
      <div className="flex flex-col items-center">
        <div>{profileImage}</div>
        {profileImage ? <p>Profile image</p> : <p>No image uploaded yet</p>}
        <p className="text-4xl p-2">{loggedUser?.userName}</p>
      </div>
      <div className="absolute bottom-0 right-2">
          <div className={`${!upload ? "hidden" : "block"}` }>
            <div
              {...getRootProps()}
              className="bg-slate-300 p-5 w-[10rem] h-[10rem] border-2 border-dashed border-red-500"
            >
              <input {...getInputProps()} />
              {!userImage ? (
                <p className="text-center">
                  Drag & drop an image here, or click to select an image
                </p>
              ) : loading ? (
                <div className="text-center">
                  <p>Uploading...</p>
                  <div className="spinner"></div>
                </div>
              ) : (
                uploadSuccess &&
                !loading && (
                  <p className="text-red-500 text-center">Upload Successful!</p>
                )
              )}
            </div>
          </div>
          <button
            onClick={() => setUpload(!upload)}
            type="button"
            className="w-[10rem] text-xs bg-gray-300 mt-2 rounded"
          >
            Change or upload your image & click to close
          </button>
      </div>
    </div>
  );
};

export default UserAccount;
