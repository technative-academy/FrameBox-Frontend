import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addMovieToPlaylist,
    isMovieInPlaylist,
} from "../../playlistHelpers.jsx";
import AddButton from "../AddButton/AddButton.jsx";
import MovieForm from "../MovieForm/MovieForm.jsx";

function MovieCard({ movie }) {
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const dispatch = useDispatch();

    const playlists = useSelector((state) => state.playlists.items);
    const playlistStatus = useSelector((state) => state.playlists.status);

    const buttonName = "Add to Playlist";

    // TODO: Dispatch action to add movie to playlist in the backend
    // const handleAddToPlaylist = (movieId, playlistId) => {
    //     addMovieToPlaylist(playlistId, movieId);
    //     setShowPlaylistMenu(false);
    // };

    // TODO: Add Movie to backednd playlist
    const onAddButtonClick = () => {
        setShowPlaylistMenu(!showPlaylistMenu);
    };

    return (
        <div className="relative group/card cursor-pointer">
            <div className="absolute top-5 sm:top-10 right-8 sm:right-2 z-10">
                <AddButton
                    nameOfButton={buttonName}
                    onClick={onAddButtonClick}
                />
            </div>
            <div className="relative z-100">
                {showPlaylistMenu && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <MovieForm
                            movies={movie}
                            onCancel={() => setShowPlaylistMenu(false)}
                        />
                    </div>
                )}
            </div>

            <div className="relative">
                <img
                    src={movie.img}
                    alt={movie.title}
                    className="w-full h-[400px] sm:h-[450px] object-contain rounded-lg aspect-2/3"
                />

                {/* Playlist dropdown menu
                {showPlaylistMenu && { MovieForm }} */}
            </div>

            <div className="mt-0.5 pb-1">
                <h3 className="text-base sm:text-lg text-center font-bold text-black">
                    {movie.title}
                </h3>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gray-500/0 group-hover/card:bg-gray-200/20 transition-all duration-300 rounded-lg opacity-0 group-hover/card:opacity-100"></div>
        </div>
    );
}

export default MovieCard;
