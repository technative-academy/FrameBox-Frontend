import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../../slices/playlistSlice";
// import { addPlayLists } from "../../slices/playListFormSlice.jsx";
import { addToPlayLists } from "../../slices/addToPlayListSlice.js";

function MovieForm(movies, onCancel) {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.items);
    // const movies = useSelector((state) => state.movies.items);
    const status = useSelector((state) => state.playlists.status);
    const error = useSelector((state) => state.playlists.error);

    // Track which playlists are selected
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

    // Fetch playlists if not already loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPlaylists());
        }
    }, [dispatch, status]);

    const handleCheckboxChange = (slug) => {
        setSelectedPlaylists((prev) =>
            prev.includes(slug)
                ? prev.filter((s) => s !== slug)
                : [...prev, slug]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            `Movie ${movies.title} added to playlists:`,
            selectedPlaylists
        );
        dispatch(
            addToPlayLists({
                title: playlistName,
            })
        );
    };

    return (
        <div className="absolute z-50 p-5 flex justify-end text-center items-center rounded-lg bg-red-100">
            <div>
                <h2 className="text-2xl font-bold pb-2">Add to Playlists</h2>

                {status === "loading" && <p>Loading playlists...</p>}
                {status === "failed" && <p className="text-red-600">{error}</p>}

                {status === "succeeded" && playlists.length > 0 && (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2"
                    >
                        {playlists.map((playlist) => (
                            <label
                                key={playlist.slug}
                                className="flex items-center gap-2 text-base"
                            >
                                <input
                                    type="checkbox"
                                    value={playlist.slug}
                                    checked={selectedPlaylists.includes(
                                        playlist.slug
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange(playlist.slug)
                                    }
                                    className="w- h-4"
                                />
                                {playlist.title}
                            </label>
                        ))}

                        <div className="flex gap-3 justify-center mt-5">
                            <button
                                type="submit"
                                onClick={() => {
                                    setTimeout(() => {
                                        onCancel();
                                    }, 2000);
                                }}
                                className="px-4 py-2 bg-black text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}

                {status === "succeeded" && playlists.length === 0 && (
                    <p className="text-gray-600">No playlists found</p>
                )}
            </div>
        </div>
    );
}

export default MovieForm;
