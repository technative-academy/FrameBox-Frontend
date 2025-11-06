function Form({ type }) {
    return (
        <div className="flex items-center justify-center  text-2xl ">
            <form className="flex flex-col gap-4 mx-auto p-16 rounded-2xl shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
                <input type="text" placeholder="Username" />
                {type === "signup" && (
                    <input type="email" placeholder="Email" />
                )}

                <input type="password" placeholder="Type Password" />
                {type === "signup" && (
                    <input type="password" placeholder="Repeat Password" />
                )}
                <button
                    type="submit"
                    className="bg-black text-white p-2 mt-2 rounded-md w-24"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;
