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
        const createdUser = await postData(
          {
            userName: data.email,
            userPassword: sha256(sha1(data.password)),
            image: "",
            created: new Date().toISOString(),
          },
          "users"
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
      <div className="h-screen background-dark-blue flex flex-col items-center justify-center">
        <img
          src={logoIcon}
          alt="SVG Image"
          className=" animate-spin-slowerY mt-[48px] md:mt-[10px] mb-[58.4px]"
        />
        <div className="background-semidark-blue w-[327px]  h-[420px] md:w-[400px] md:h-[418px] rounded-lg">
          {authType === "login" ? (
            <h1 className="text-white heading-l mt-[19px] md:mt-[40px] ml-[23px] md:ml-[32px]">
              Login
            </h1>
          ) : (
            <h1 className="text-white heading-l mt-[19px]  md:mt-[40px] ml-[23px] md:ml-[32px]">
              Sign <span className="ml-[-1.5px]">Up</span>
            </h1>
          )}
          <form
            noValidate
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-col w-[279px]  h-[247px] md:w-[336px] md:h-[274] mx-[24px] md:mx-[32px] mt-[34px] md:mt-[30px] mb-[69px] gap-[12px]"
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
              placeholder=" Email address"
              className={`h-[37] mt-[-1px] body-m focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 border-[#5a698f] focus:border-white ${
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
              placeholder=" Password"
              className={`h-12 mt-[-11px] body-m focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 border-[#5a698f] focus:border-white ${
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
                  placeholder=" Repeat Password"
                  className={`h-12 mt-[-11px] body-m focus:ring-0 background-semidark-blue caret-[#FC4747] text-white border-t-0 border-r-0 border-l-0 border-[#5a698f] focus:border-white ${
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
              className="mt-[15px] py-[13px] body-m background-red text-white rounded-md  hover:bg-white hover:text-black"
            >
              {authType == "signup"
                ? "Create an account"
                : "Login to your account"}
            </button>
          
          {authType == "signup" ? (
            <div className="body-m text-white flex flex-row ml-[34px] mt-[11px] md:ml-[60px]">
              <div className="pr-2">Alread have an account?</div>
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
            <div className="body-m text-white flex flex-row ml-[31px] mt-[-6px] md:ml-[60px]">
              <div className="pr-2">Don&#39;t have an account? </div>
              <button
                onClick={() => {
                  setError("");
                  setAuthType("signup");
                  clearErrors();
                }}
                className="text-red body-m"
              >
                Sign up
              </button>
            </div>
          )}
          <span className="text-red-500 font-sm">{error}</span>
          </form>
        </div>
      </div>
    </>
  );
}

export default Auth;