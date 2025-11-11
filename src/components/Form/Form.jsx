function Form({ type }) {
    return (
        <div className="flex items-center justify-center text-xl lg:mb-16 flex-1">
            <form className="flex flex-col gap-4 mx-auto mt-4 p-8 rounded-2xl shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
                <h1 className="text-2xl text-center">
                    {type === "signup" ? "Sign Up" : "Login"}
                </h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="border border-gray-300 rounded-md px-3 py-2"
                />
                {type === "signup" && (
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                )}

                <input
                    type="password"
                    placeholder="Type Password"
                    className="border border-gray-300 rounded-md px-3 py-2"
                />
                {type === "signup" && (
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className="border border-gray-300 rounded-md px-3 py-2"
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
