import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addMovieToPlaylist,
    isMovieInPlaylist,
} from "../../playlistHelpers.jsx";
import AddButton from "../AddButton/AddButton.jsx";

function MovieCard({ movie }) {
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const dispatch = useDispatch();

    const playlists = useSelector((state) => state.playlists.items);
    const playlistStatus = useSelector((state) => state.playlists.status);

    // TODO: Dispatch action to add movie to playlist in the backend
    const handleAddToPlaylist = (movieId, playlistId) => {
        addMovieToPlaylist(playlistId, movieId);
        setShowPlaylistMenu(false);
    };

    return (
        <div className="relative group/card cursor-pointer">
            <div className="relative">
                <img
                    src={movie.img}
                    alt={movie.title}
                    className="w-full h-[400px] sm:h-[450px] object-contain rounded-lg aspect-2/3"
                />

                <AddButton />

                {/* Playlist dropdown menu */}
                {showPlaylistMenu && (
                    <div className="absolute top-12 right-2 bg-white rounded-lg shadow-lg z-20 min-w-[150px]">
                        {/* Show different messages depending on load state */}
                        {playlistStatus === "loading" && (
                            <p className="px-4 py-2 text-gray-500">
                                Loading playlists...
                            </p>
                        )}
                        {playlistStatus === "failed" && (
                            <p className="px-4 py-2 text-red-500">
                                Failed to load playlists
                            </p>
                        )}
                        {playlistStatus === "succeeded" &&
                            playlists.length === 0 && (
                                <p className="px-4 py-2 text-gray-500">
                                    No playlists found
                                </p>
                            )}

                        {playlistStatus === "succeeded" &&
                            playlists.map((playlist) => (
                                <button
                                    key={playlist.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToPlaylist(
                                            movie.id,
                                            playlist.id
                                        );
                                    }}
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                        isMovieInPlaylist(playlist.id, movie.id)
                                            ? "text-green-600 font-semibold"
                                            : "text-gray-800"
                                    }`}
                                >
                                    {playlist.playlist_name}
                                    {isMovieInPlaylist(playlist.id, movie.id) &&
                                        " ✓"}
                                </button>
                            ))}
                    </div>
                )}
            </div>

            <div className="mt-0.5 sm:mt-1 p-1">
                <h3 className="text-base sm:text-lg font-bold text-black">
                    {movie.title}
                </h3>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-500/0 group-hover/card:bg-gray-200/20 transition-all duration-300 rounded-lg opacity-0 group-hover/card:opacity-100"></div>
        </div>
    );
}

export default MovieCard;
