import { useState } from "react";
import { addPlaylists } from "../../slices/playListFormSlice.jsx";
import { fetchPlaylists } from "../../slices/playlistSlice.js";
import { useDispatch } from "react-redux";

function PlayListForm({ onCancel }) {
    const dispatch = useDispatch();

    const [playlistName, setPlaylistName] = useState("");
    const [playlistDesc, setPlaylistDesc] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addPlaylists({
                title: playlistName,
                summary: playlistDesc,
            })
        ).then(() => {
            dispatch(fetchPlaylists());
        });
        console.log(playlistName);
        console.log(playlistDesc);
        onCancel();
    };

    return (
        <div className="absolute flex justify-start items-center pr-4 bg-zinc-700 rounded-lg">
            <div className="flex flex-col items-center justify-center text-xl lg:mb-16">
                <h1 className="text-2xl text-center">Create Playlist</h1>
                <form
                    onSubmit={handleSubmit}
                    className="justify-center items-center text-center gap-4 p-6 flex  flex-col "
                >
                    <label className="">
                        Playlist Name
                        <input
                            type="text"
                            placeholder=" Name"
                            className="border border-white flex justify-end rounded-lg px-1 py-2"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                        />
                    </label>
                    <label>
                        Playlist Descritpion
                        <input
                            type="text"
                            placeholder=" Descritpion"
                            className="border border-white flex justify-end rounded-lg px-1 py-1"
                            value={playlistDesc}
                            onChange={(e) => setPlaylistDesc(e.target.value)}
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

export default PlayListForm;
