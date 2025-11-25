import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddButton from "../AddButton/AddButton.jsx";
import MovieForm from "../MovieForm/MovieForm.jsx";

function MovieCard({ movie }) {
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const dispatch = useDispatch();

    const playlists = useSelector((state) => state.playlists.items);
    const playlistStatus = useSelector((state) => state.playlists.status);

    const buttonName = "Add to Playlist";

    const onAddButtonClick = () => {
        setShowPlaylistMenu(!showPlaylistMenu);
    };

    return (
        <div className="relative group/card cursor-pointer">
            {/* <div className="absolute inset-0 bg-gray-500/0 transition-all rounded-lg opacity-0 group-hover/card:opacity-100">
                <AddButton onClick={onAddButtonClick} nameOfButton="+" />
            </div> */}
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

                <div className="absolute top-2 right-16 sm:top-10 sm:right-9 xl:top-1 xl:right-16 z-50">
                    <AddButton onClick={onAddButtonClick} nameOfButton="+" />
                </div>

                {/* Playlist dropdown menu
                {showPlaylistMenu && { MovieForm }} */}
            </div>

            <div className="mt-0.5 pb-1">
                <h3 className="text-base sm:text- text-center font-bold text-white">
                    {movie.title}
                </h3>
            </div>

            {/* Hover overlay */}
            <div className="absolute left-0 right-0 bottom-0 h-10 sm:h-111 lg:h-full lg:right-9 lg:left-9 bg-gray-500/0 group-hover/card:bg-gray-200/20 transition-all duration-300 rounded-lg opacity-0 group-hover/card:opacity-100"></div>
        </div>
    );
}

export default MovieCard;
