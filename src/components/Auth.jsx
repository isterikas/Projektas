import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { getAllData } from "./helpers/get.js";
import { postData } from "./helpers/post.js";
import { sha1 } from 'js-sha1';
import { sha256 } from "js-sha256";

function Auth() {
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { authType, setAuthType, setLoggedIn, loggedIn, setUpdate, update } = useOutletContext();
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);

    const pageRefresh = () => {
        if(!loggedIn) setAuthType("login");
    }

    useEffect(()=>{
        pageRefresh();
    },[])

    const fetchUsers = async () => {
        const fetchedUsers = await getAllData("users");
        setUsers(fetchedUsers);
    }

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
                if (checkedUser.userPassword === sha256(sha1(data.password))) {
                    setLoggedIn(checkedUser.id);
                    setAuthType("");
                    navigate("/");
                }
                else {
                    throw new Error("Incorrect email or password");
                }
            }
            else {
                users.forEach((user) => {
                    if (user.userName === data.email) {
                        throw new Error("This email address is already registered");
                    }
                });
                await postData({ userName: data.email, userPassword: sha256(sha1(data.password)) }, "users");
                const fetchedUsers = await getAllData("users");
                setUsers(fetchedUsers);
                setAuthType("login");
                setUpdate(update+1);
                alert(`New account ${data.email} was created successfully.`);
            }
        }
        catch (error) {
            setError(error?.message);
        }
    }

    return (
        <>
            <div>
                {authType === "login" ? <h1>Log in:</h1> : <h1>Sign up:</h1>}
                <form
                    noValidate
                    onSubmit={handleSubmit(formSubmitHandler)}
                    className="flex flex-col"
                >
                    <input type="text" {...register("email", {
                        required: "This field is required", pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Ivalid email adress format",
                        },
                    })} />
                    {errors.email?.message}
                    <input type="password" {...register("password", {
                        required: "This field is required",
                        pattern:{
                            value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]+$/,
                            message: authType === "signup" ? "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-":"",
                        },
                        minLength: {
                            value: 8,
                            message: authType === "signup" ? "Password must be at least 8 characters long":"",
                        },
                        validate: (value) => {
                            return (/.*[A-Z].*/.test(value) &&
                                /.*[0-9].*/.test(value) &&
                                /.*[$&+,:;=?@#|'<>.^*()%!-].*/.test(value)
                            ) || (authType === "signup" ? "Password must contain at least 1 capital letter, 1 number and 1 special character":"");
                        }
                    })} />
                    {errors.password?.message}
                    {authType === "signup" ? <input type="password" {...register("repeatPassword", {
                        required: {
                            value: authType === "signup",
                            message: "Please repeat your password",
                        },
                        validate: (value) => {
                            return value === watch("password") || "Passwords must match"
                        }
                    })} /> : ""}
                    {errors.repeatPassword?.message}
                    <input
                        type="submit"
                        className="bg-gradient-to-tr from-violet-500 via-purple-500 to-violet-700 text-white rounded-lg py-1 px-5 hover:from-violet-400 hover:via-purple-400 hover:to-violet-600 transition duration-1000 font-bold shadow-gray-600 shadow-md hover:shadow-lg"
                    />
                </form>
                {authType == "signup" ? <div>Already have an account? <button onClick={() => setAuthType("login")}>Log in</button></div> :
                    <div>Don't have an account yet? <button onClick={() => setAuthType("signup")}>Sign up</button></div>}
                {error}
            </div>
        </>
    );
}

export default Auth;