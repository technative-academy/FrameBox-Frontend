function Form({ type }) {
    return (
        <div className="flex  items-center justify-center">
            <form className="flex flex-col gap-2  mx-auto ">
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
                    className="bg-red-500 text-black-500 p-4 rounded-md w-24"
                >
                    Noo
                </button>
            </form>
        </div>
    );
}

export default Form;
