import { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { getAllData } from "./helpers/get.js";

function Auth() {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();

    const authType = useContext("authType");
    const setAuthType = useContext("setAuthType");
    // const loggedIn = useContext(/* loggedIn context variable */);
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const fetchedUsers = await getAllData("users");
        setUsers(fetchedUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const formSubmitHandler = async (data) => {
        try {
            if (authType === "login") {
                ;
            }
            else {
                users.forEach((user) => {
                    if (user.email === data.email) {
                        throw new Error("This email address is already registered");
                    }
                });

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
                    <input type="text" {...register("password", {
                        required: "This field is required", pattern: {
                            value: /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]+$/,
                            message: "Password must only contain letters, numbers and these special characters: $&+,:;=?@#|'<>.^*()%!-",
                        },
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long",
                        },
                        validate: (value) => {
                            return (/.*[A-Z].*/.test(value) &&
                                /.*[0-9].*/.test(value) &&
                                /.*[$&+,:;=?@#|'<>.^*()%!-].*/.test(value)
                            ) || "Password must contain at least 1 capital letter, 1 number and 1 special character";
                        }
                    })} />
                    {errors.password?.message}
                    {authType === "signup" ? <input type="text" {...register("repeatPassword")} /> : ""}
                    <input
                        type="submit"
                        className="bg-gradient-to-tr from-violet-500 via-purple-500 to-violet-700 text-white rounded-lg py-1 px-5 hover:from-violet-400 hover:via-purple-400 hover:to-violet-600 transition duration-1000 font-bold shadow-gray-600 shadow-md hover:shadow-lg"
                    />
                </form>
                {error}
            </div>
        </>
    );
}

export default Auth;