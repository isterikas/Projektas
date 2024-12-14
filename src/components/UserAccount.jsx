import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { useDropzone } from "react-dropzone";
import { patchData } from "./helpers/update";
import { useNavigate } from "react-router";
import { usePersistState } from "@printy/react-persist-state";

const UserAccount = () => {
  const { users, loggedIn } = useOutletContext();

  const [userImage, setUserImage] = useState(null);

  const [loggedUser, setLoggedUser] = useState({});

  const navigate = useNavigate();

  const findUser = () => {
    const thisUser = users.find((user) => user.id === loggedIn);
    setLoggedUser(thisUser);
    console.log(thisUser);
  };

  useEffect(()=>{
    if(window.performance) {
      if(performance.navigation.type != 1 && !loggedIn) navigate("/");
    }
  },[])

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      console.error("Invalid file type:", file.type);
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
      await patchData("users", loggedUser?.id, { image: file });
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop,
    multiple: false,
    maxFiles: 1,
    // maxSize: 4096
  });

  return (
    <div className="bg-yellow-200 mt-[5rem] ms-[10rem]">
      <p className="text-4xl">
        {loggedUser?.userName}

        <div className="account-page">
          <div {...getRootProps()} className="dropzone m-[10rem] bg-slate-50">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select an image</p>
          </div>

          {userImage && (
            <div className="image-preview">
              <h3>Image Preview:</h3>
              <img src={userImage} alt="Preview" style={{ width: "200px" }} />
            </div>
          )}
        </div>
      </p>
    </div>
  );
};

export default UserAccount;
