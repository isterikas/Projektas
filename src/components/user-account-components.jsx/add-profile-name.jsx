import { useState, useEffect } from "react";
import { patchData } from "../helpers/update";
import { useForm } from "react-hook-form";
import ClickOutside from "./user-menu/click-outside";

const AddProfileName = (props) => {
  const { loggedUser, isProfileNameForm, setIsProfileNameForm } = props;
  const { id } = loggedUser;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "oninput",
    revalidateMode: "onChange",
  });

  const [error, setError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitName, setIsSubmitName] = useState(false);

  const closeProfileNameForm = ClickOutside(() => {
    setIsProfileNameForm(false);
  });

  const handleProfileNameForm = async (data) => {
    setLoading(true);
    try {
      await patchData("users", id, { profileName: data.profileName });
      reset();
      setError("");
      setSubmitMessage("You successfully added Profile Name");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitName(true);
      setLoading(false);
    }
  };

  const timedFormClosure = () => {
    if (isSubmitName && !loading)
      setTimeout(() => {
        setIsProfileNameForm((prev) => !prev);
        setSubmitMessage("");
        setIsSubmitName(false);
      }, 3000);
  };

  useEffect(() => {
    timedFormClosure();
  }, [isSubmitName]);

  if (isProfileNameForm)
    return (
      <form onSubmit={handleSubmit(handleProfileNameForm)} noValidate ref={closeProfileNameForm}>
        <div className="flex flex-col gap-[2px]">
          <label
            htmlFor="profileName"
            className="text-[12px] md:text-[13px] lg:text-[14px] text-white"
          >
            Add or Change Profile Name
          </label>
          <input
            type="text"
            id="profileName"
            className="w-[130px] md:w-[170px] lg:w-[210px] h-[25px] md:h-[30px] rounded-md text-[12px] md:text-[13px] lg:text-[14px] border-[2px] border-gray-700"
            {...register("profileName", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9 ]{0,100}$/,
                message:
                  "Please enter only letters, numbers, or spaces (max 100 characters)",
              },
            })}
          />
          <p className="text-red-500 text-[12px] md:text-[13px] lg:text-[14px]">
            {errors.profileName?.message}
          </p>
          <button
            type="submit"
            disabled={loading}
            className="bnt-options"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error ? (
            <p className="text-red-500 text-[12px] md:text-[13px] lg:text-[14px]">
              {error}
            </p>
          ) : (
            <p className="text-green-500 text-[12px] md:text-[13px] lg:text-[14px]">
              {submitMessage}
            </p>
          )}
        </div>
      </form>
    );
};

export default AddProfileName;
