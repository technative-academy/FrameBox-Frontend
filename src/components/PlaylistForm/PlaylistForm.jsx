import { useState } from "react";
import { addPlaylists } from "../../slices/playListFormSlice.jsx";
import { useSelector, useDispatch } from "react-redux";

function PlayListForm() {
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
        );
        console.log(playlistName);
        console.log(playlistDesc);
    };

    return (
        <div className="absolute flex justify-end items-center pr-4 bg-red-100 ">
            <div className="flex flex-col items-center justify-center text-xl lg:mb-16 ">
                <h1 className="text-2xl text-center">Create Playlist</h1>
                <form
                    onSubmit={handleSubmit}
                    className="justify-center items-center text-center gap-4 p-6 rounded-md flex flex-col"
                >
                    <label className="">
                        Playlist Name
                        <input
                            type="text"
                            placeholder=" Name"
                            className="border border-black flex justify-end rounded-md px-1 py-1"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                        />
                    </label>
                    <label>
                        Playlist Descritpion
                        <input
                            type="text"
                            placeholder=" Descritpion"
                            className="border border-black flex justify-end rounded-md px-1 py-1"
                            value={playlistDesc}
                            onChange={(e) => setPlaylistDesc(e.target.value)}
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-black justify-center flex text-white p-2 mx-auto rounded-md w-24"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PlayListForm;
