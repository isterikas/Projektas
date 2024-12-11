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

  useEffect(() => {
    setAuthType("login");
  }, []);

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
        if(!checkedUser) throw new Error("Incorrect email or password");
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
          { userName: data.email, userPassword: sha256(sha1(data.password)) },
          "users"
        );
        const fetchedUsers = await getAllData("users");
        setUsers(fetchedUsers);
        setAuthType("login");
        alert(`New account ${data.email} was created successfully.`);
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <>
      <div className="h-screen background-dark-blue flex flex-col items-center justify-center">
        <img src={logoIcon} alt="SVG Image" className="pb-20" />
        <div className="background-semidark-blue rounded-lg px-9 py-20 md:px-20 md:py-16">
          {authType === "login" ? (
            <h1 className="text-white heading-l">Login</h1>
          ) : (
            <h1 className="text-white heading-l">Sign up</h1>
          )}
          <form
            noValidate
            onSubmit={handleSubmit(formSubmitHandler)}
            className="flex flex-col "
          >
            <input
              type="text"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9][a-zA-Z0-9\.]{4,28}[a-zA-Z0-9]@[a-z]([a-z]{1,5}\.){1,3}[a-z]{2,5}$/,
                  message: "Invalid email adress format", 
                },
                onChange: (e) => {
                  setError("");
                  clearErrors("email");
                },
              })}
              placeholder="Email address"
              className={`background-semidark-blue caret-[#FC4747] text-white border-t-0  border-r-0  border-l-0 focus:border-white ${
                errors.email ? "border-red-600" : "border-white"
              }`}
            />
            <span className="text-red ">{errors.email?.message}</span>
            <input
              type="password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]+$/,
                  message:
                    authType === "signup"
                      ? "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-"
                      : "",
                },
                onChange: (e) => {
                  clearErrors("password");
                  if(error === "Incorrect email or password") setError("");
                },
                minLength: {
                  value: 8,
                  message:
                    authType === "signup"
                      ? "Password must be at least 8 characters long"
                      : "",
                },
                validate: (value) => {
                  return (
                    (/.*[A-Z].*/.test(value) &&
                      /.*[0-9].*/.test(value) &&
                      /.*[$&+,:;=?@#|'<>.^*()%!-].*/.test(value)) ||
                    (authType === "signup"
                      ? "Password must contain at least 1 capital letter, 1 number and 1 special character"
                      : "")
                  );
                },
              })}
              placeholder="Password"
              className={`background-semidark-blue text-white border-t-0  border-r-0  border-l-0 focus:border-white ${
                errors.email ? "border-red-600" : "border-white"
              }`}
            />
            <span className="text-red">{errors.password?.message}</span>
            {authType === "signup" ? (
              <input
                type="password"
                {...register("repeatPassword", {
                  required: {
                    value: authType === "signup",
                    message: "Please repeat your password",
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
                className={`background-semidark-blue text-white border-t-0  border-r-0  border-l-0 focus:border-white ${
                  errors.email ? "border-red-600" : "border-white"
                }`}
              />
            ) : (
              ""
            )}
            <span className="text-red">{errors.repeatPassword?.message}</span>
            <button
              type="submit"
              className="background-red  text-white rounded-md mt-10 px-5 py-3 hover:bg-white hover:text-black"
            >
              {authType == "signup"
                ? "Create an account"
                : "Login to your account"}
            </button>
          </form>
          {authType == "signup" ? (
            <div className="text-white text-center pt-10">
              Already have an account?{" "}
              <button
                onClick={() => setAuthType("login")}
                className="text-red "
              >
                Log in
              </button>
            </div>
          ) : (
            <div className="text-white text-center pt-10">
              Don't have an account yet?{" "}
              <button
                onClick={() => {
                  setError("");
                  setAuthType("signup");
                }}
                className="text-red"
              >
                Sign up
              </button>
            </div>
          )}
          <span className="text-red-600 font-sm">{error}</span>
        </div>
      </div>
    </>
  );
}

export default Auth;
