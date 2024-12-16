import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { getAllData } from "./helpers/get.js";
import { postData } from "./helpers/post.js";
import { sha1 } from "js-sha1";
import { sha256 } from "js-sha256";
import logoIcon from "../assets/icons/logo.svg";

function Auth() {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit" });
  const navigate = useNavigate();
  const { authType, setAuthType, setLoggedIn } = useOutletContext();
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const fetchedUsers = await getAllData("users");
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
    setValue("repeatPassword", "");
  }, [authType]);

  const formSubmitHandler = async (data) => {
    try {
      if (authType === "login") {
        const checkedUser = users.find((user) => user.userName === data.email);
        if (!checkedUser) throw new Error("Incorrect email or password");
        if (checkedUser.userPassword === sha256(sha1(data.password))) {
          setLoggedIn(checkedUser.id);
          setAuthType("");
          navigate("/");
        } else {
          throw new Error("Incorrect email or password");
        }
      } else {
        users.forEach((user) => {
          if (user.userName === data.email) {
            throw new Error("This email address is already registered");
          }
        });
        await postData(
          {
            userName: data.email,
            userPassword: sha256(sha1(data.password)),
            image: "",
            created: new Date().toISOString(),
          },
          "users"
        );
        const fetchedUsers = await getAllData("users");
        setUsers(fetchedUsers);
        const createdUser = fetchedUsers.find(
          (user) => user.userName === data.email
        );
        setLoggedIn(createdUser.id);
        setAuthType("");
        navigate("/");
        alert(`New account ${data.email} was created successfully.`);
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  return (
    <>
      <div className="h-screen background-dark-blue flex flex-col items-center justify-center md:relative md:bottom-40 lg:relative lg:bottom-0">
        <img
          src={logoIcon}
          alt="SVG Image"
          className="pb-10 mt-[65px] animate-spin-slowerY"
        />
        <div className="background-semidark-blue rounded-lg mx-[24px] my-[40px]">
          {authType === "login" ? (
            <h1 className="text-white heading-l pt-10 relative left-4 md:px-[10px]">
              Login
            </h1>
          ) : (
            <h1 className="text-white heading-l pt-5 relative left-4 md:px-[10px]">
              Sign up
            </h1>
          )}
          <form
            noValidate
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-col mx-[24px] gap-y-[6px] md:px-[10px]"
          >
            <input
              aria-label="E-mail address"
              type="text"
              {...register("email", {
                required: "This field is required",
                validate: (value) => {
                  return authType === "signup"
                    ? (/^[A-Za-z0-9\.\-]{1,64}@[A-Za-z0-9\.\-]{1,255}$/.test(
                        value
                      ) &&
                        /^[A-Za-z0-9]([A-Za-z0-9]+[\.\-]*)*[A-Za-z0-9]@.*$/.test(
                          value
                        ) &&
                        /^.*@([A-Za-z0-9]{2,63}[\.\-])+[A-Za-z]{2,}$/.test(
                          value
                        )) ||
                        (authType === "signup"
                          ? "Invalid email address format"
                          : "")
                    : true;
                },
                onChange: (e) => {
                  setError("");
                  clearErrors("email");
                },
              })}
              placeholder="Email address"
              className={`focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0  border-r-0  border-l-0 border-[#5a698f] focus:border-white ${
                errors.email ? "border-red-600" : "border-[#5a698f]"
              }`}
            />
            <span className="text-red ">{errors.email?.message}</span>
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
                onChange: (e) => {
                  clearErrors("password");
                  if (error === "Incorrect email or password") setError("");
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) => {
                  return (
                    (authType === "signup" &&
                      /^.*[A-Z].*$/.test(value) &&
                      /^.*[0-9].*$/.test(value) &&
                      /^.*[$&+,:;=?@#|'<>.^*()%!-].*$/.test(value)) ||
                    (authType === "signup"
                      ? "Password must contain at least 1 capital letter, 1 number and 1 special character"
                      : true)
                  );
                },
              })}
              placeholder="Password"
              className={`focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 border-[#5a698f] focus:border-white ${
                errors.email ? "border-red-600" : "border-[#5a698f]"
              }`}
            />
            <span className="text-red">{errors.password?.message}</span>
            {authType === "signup" ? (
              <>
                <input
                  aria-label="Repeat password"
                  type="password"
                  {...register("repeatPassword", {
                    required: {
                      value: authType === "signup",
                      message: "This field is required",
                    },
                    validate: (value) => {
                      return (
                        value === watch("password") || "Passwords must match"
                      );
                    },
                    onChange: (e) => {
                      clearErrors("repeatPassword");
                    },
                  })}
                  placeholder="Repeat Password"
                  className={`focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0  border-r-0 border-l-0 border-[#5a698f] focus:border-white ${
                    errors.email ? "border-red-600" : "border-[#5a698f]"
                  }`}
                />
              </>
            ) : (
              ""
            )}
            <span className="text-red">{errors.repeatPassword?.message}</span>
            <button
              type="submit"
              className="background-red  text-white rounded-md mt-5 px-[60px] py-[12px] hover:bg-white hover:text-black"
            >
              {authType == "signup"
                ? "Create an account"
                : "Login to your account"}
            </button>
          </form>
          {authType == "signup" ? (
            <div className="body-m text-white mx-[53.25px] my-[20px] flex flex-row space-x-[9px]">
              <div>Already have an account? </div>
              <button
                onClick={() => {
                  setError("");
                  setAuthType("login");
                  clearErrors();
                }}
                className=" text-red body-m"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="body-m text-white mx-[52px] my-[20px] flex flex-row space-x-[9px]">
              <div>Don't have an account? </div>
              <button
                onClick={() => {
                  setError("");
                  setAuthType("signup");
                  clearErrors();
                }}
                className="text-red  body-m"
              >
                Sign up
              </button>
            </div>
          )}
          <span className="text-red-500 font-sm">{error}</span>
        </div>
      </div>
    </>
  );
}

export default Auth;
