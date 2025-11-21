import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlaylists } from "../../slices/playlistSlice";
import { addToPlayListForm } from "../../slices/addToPlayListFormSlice";

function MovieForm({ movie, onCancel }) {
    const movies = useSelector((state) => state.movies.items);
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.items);
    const status = useSelector((state) => state.playlists.status);
    const error = useSelector((state) => state.playlists.error);

    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [movieName, setmovieName] = useState("");

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
            `Movie "${movieName}" added to playlists:`,

            selectedPlaylists
        );

        dispatch(
            addToPlayListForm({
                title: movieName,
                playlists: selectedPlaylists,
            })
        );

        onCancel();
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
                                {/* Add check to make sure the new playlist name isn't one thats already in the playlist array  */}
                                {/* Movie with slug "love" already exists. */}
                                <input
                                    type="checkbox"
                                    value={playlist.slug}
                                    checked={selectedPlaylists.includes(
                                        playlist.slug
                                    )}
                                    onChange={() =>
                                        handleCheckboxChange(playlist.slug)
                                    }
                                    className="w-4 h-4"
                                />
                                {playlist.title}
                            </label>
                        ))}

                        <div className="flex gap-3 justify-center mt-5">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-black text-white rounded-md"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                            >
                                Cancel
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
