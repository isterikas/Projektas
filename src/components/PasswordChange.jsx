import { useEffect, useState } from "react";
import { getOne } from "./helpers/get.js";
import { patchData } from "./helpers/update.js";
import { sha1 } from "js-sha1";
import { sha256 } from "js-sha256";
import { useForm } from "react-hook-form";

const PasswordChange = ({ showModal, setShowModal, loggedIn }) => {
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const [oldPassword, setOldPassword] = useState("");

  const fetchUser = async (id) => {
    const user = await getOne(id, "users");
    setOldPassword(user.userPassword.toString());
  };

  useEffect(() => {
    fetchUser(loggedIn);
    setValue("oldPassword", "");
    setValue("password", "");
    setValue("repeatPassword", "");
  }, [showModal]);

  const formSubmitHandler = async (data) => {
    try {
      if (oldPassword == sha256(sha1(data.oldPassword))) {
        await patchData("users", loggedIn, {
          userPassword: sha256(sha1(data.password)),
        });
        setShowModal(false);
        alert("Your password has been updated successfully");
      } else {
        setError("Incorrect password");
      }
      setValue("oldPassword", "");
      setValue("password", "");
      setValue("repeatPassword", "");
    } catch (error) {
      setError(error.message);
    }
    setOldPassword("");
  };

  return (
    <>
      <dialog
        open={showModal}
        className="fixed bottom-1/2 top-1/2 rounded-xl px-8 py-4 background-dark-blue"
      >
        <div className="flex flex-col items-center font-bold text-white mb-5">
          <button onClick={() => setShowModal(false)} className="self-end text-[1.5rem]">
          &#x292B; 
          </button>
          <h1 className="heading-s">Change Password</h1>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}
          className="flex flex-col"
        >
          <input
            aria-label="Old password"
            type="password"
            {...register("oldPassword", {
              required: "This field is required",
              onChange: () => {
                clearErrors("oldPassword");
                if (error === "Incorrect password") setError("");
              },
            })}
            placeholder="Old Password"
            className={`focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 mb-1 border-[#5a698f] focus:border-white ${
              errors.oldPassword ? "border-red-600" : "border-[#5a698f]"
            }`}
          />
          <input
            aria-label="Password"
            type="password"
            {...register("password", {
              required: "This field is required",
              pattern: {
                value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]+$/,
                message:
                  "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-",
              },
              onChange: () => {
                clearErrors("password");
              },
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              validate: (value) => {
                return (
                  (/^.*[A-Z].*$/.test(value) &&
                    /^.*[0-9].*$/.test(value) &&
                    /^.*[$&+,:;=?@#|'<>.^*()%!-].*$/.test(value)) ||
                  "Password must contain at least 1 capital letter, 1 number and 1 special character"
                );
              },
            })}
            placeholder="Password"
            className={`focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 mb-1 border-[#5a698f] focus:border-white ${
              errors.password ? "border-red-600" : "border-[#5a698f]"
            }`}
          />
          <span className="text-red">{errors.password?.message}</span>
          <input
            aria-label="Repeat password"
            type="password"
            {...register("repeatPassword", {
              required: "This field is required",
              validate: (value) => {
                return value === watch("password") || "Passwords must match";
              },
              onChange: () => {
                clearErrors("repeatPassword");
              },
            })}
            placeholder="Repeat Password"
            className={`focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 border-[#5a698f] focus:border-white ${
              errors.repeatPassword ? "border-red-600" : "border-[#5a698f]"
            }`}
          />
          <span className="text-red">{errors.repeatPassword?.message}</span>
          <input type="submit" className="btn btn-hover h-[2rem] my-2 rounded" />
        </form>
        <span className="text-red-500 font-sm">{error}</span>
      </dialog>
    </>
  );
};

export default PasswordChange;
