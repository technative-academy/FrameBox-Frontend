import { useState } from "react";
import { addPlaylists } from "../../slices/addMoviesSlice.js";
import { fetchPlaylists } from "../../slices/playlistSlice.js";
import { useDispatch } from "react-redux";

function AddMovieForm({ onCancel }) {
    const dispatch = useDispatch();

    const [movieName, setmovieName] = useState("");
    const [movieDesc, setmovieDesc] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addPlaylists({
                title: movieName,
                summary: movieDesc,
            })
        ).then(() => {
            dispatch(fetchPlaylists());
        });
        console.log(movieName);
        console.log(movieDesc);
        onCancel();
    };

    return (
        <div className="absolute flex justify-start items-center pr-4 bg-zinc-700 rounded-lg">
            <div className="flex flex-col items-center justify-center text-xl lg:mb-16">
                <h1 className="text-2xl text-center">Add Movie</h1>
                <form
                    onSubmit={handleSubmit}
                    className="justify-center items-center text-center gap-4 p-6 flex  flex-col "
                >
                    <label className="">
                        Movie Name
                        <input
                            type="text"
                            placeholder=" Name"
                            className="border border-white flex justify-end rounded-lg px-1 py-2"
                            value={movieName}
                            onChange={(e) => setmovieName(e.target.value)}
                        />
                    </label>
                    <label>
                        Move Descritpion
                        <input
                            type="text"
                            placeholder=" Descritpion"
                            className="border border-white flex justify-end rounded-lg px-1 py-1"
                            value={movieDesc}
                            onChange={(e) => setmovieDesc(e.target.value)}
                        />
                    </label>

                    <div className="flex gap-3 justify-center mt-5">
                        <button
                            type="submit"
                            onClick={onCancel}
                            className="bg-black justify-center flex text-white p-2 mx-auto rounded-md w-24"
                        >
                            Submit
                        </button>
                        <button
                            type="sumbit"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-400 text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMovieForm;
