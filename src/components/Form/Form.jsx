import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../../slices/authSlice.jsx";
import { useNavigate } from "react-router-dom";

function Form({ type }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // console.log("Signing up:", {
    //     username,
    //     email,
    //     password,
    //     repeatPassword,
    // });
    const submitHandler = async (e) => {
        e.preventDefault();
        if (type === "signup") {
            if (password !== repeatPassword) {
                alert("Passwords do not match!");
                return;
            }
            // Wait for signup to finish
            const result = await dispatch(
                register({ username, email, password })
            );

            // If signup failed, stop here
            if (register.rejected.match(result)) {
                return;
            }
        }
        const response = await dispatch(login({ email, password }));
        console.log(response);
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center text-xl lg:mb-16 flex-1">
            <form
                className="flex flex-col gap-4 mx-auto mt-4 p-8 rounded-2xl shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
                onSubmit={submitHandler}
            >
                <h1 className="text-2xl text-center">
                    {type === "signup" ? "Sign Up" : "Login"}
                </h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded-md px-3 py-2"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {type === "signup" && (
                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-300 rounded-md px-3 py-2"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}

                <input
                    type="password"
                    placeholder="Type Password"
                    className="border border-gray-300 rounded-md px-3 py-2"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {type === "signup" && (
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className="border border-gray-300 rounded-md px-3 py-2"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                )}
                <button
                    type="submit"
                    className="bg-black text-white p-2 mx-auto rounded-md w-24"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
