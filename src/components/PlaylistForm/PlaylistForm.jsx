import { useState } from "react";
import { addPlaylists } from "../../slices/playListFormSlice.jsx";

function playListForm() {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDesc, setPlaylistDesc] = useState("");
    const handleSubmit = (e) => {
        console.log("form submitted");
        e.preventDefault();
    };

    return (
        <div className="flex items-center justify-center text-xl lg:mb-16 flex-1">
            <h1 className="text-2xl text-center">Create Playlist</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    playlist Name
                    <input
                        type="text"
                        placeholder="Playlist Name"
                        className="border border-gray-300 rounded-md px-3 py-2"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                </label>
                <label>
                    playlist Descritpion
                    <input
                        type="text"
                        placeholder="Playlist Name"
                        className="border border-gray-300 rounded-md px-3 py-2"
                        value={playlistDesc}
                        onChange={(e) => setPlaylistDesc(e.target.value)}
                    />
                </label>

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

export default playListForm;
