import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddButton from "../AddButton/AddButton.jsx";
import MovieForm from "../MovieForm/MovieForm.jsx";
import { deleteMovies, fetchMovies } from "../../slices/moviesAPISlice.js";
import DeleteButton from "../DeleteButton/DeleteButton.jsx";

function MovieCard({ movie }) {
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const dispatch = useDispatch();

    const status = useSelector((state) => state.movies.status);

    useEffect(() => {
        if (status === "deleted") {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);

    const onAddButtonClick = () => {
        setShowPlaylistMenu(!showPlaylistMenu);
    };

    const onDeleteButtonClick = (movieSlug) => {
        dispatch(deleteMovies(movieSlug)).then(() => dispatch(fetchMovies()));
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
                    className="w-full h-[300px] sm:h-[380px] object-contain rounded-lg "
                />
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                    <AddButton onClick={onAddButtonClick} nameOfButton="+" />
                </div>
                <div className="absolute top-0 right-6 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                    <DeleteButton
                        onClick={() => onDeleteButtonClick(movie.slug)}
                        nameOfButton="x"
                    />
                </div>
            </div>

            <div className="mt-0.5 pb-2 group-hover/card:bg-gray-200/20 transition-all duration-300 group-hover/card:opacity-100 rounded-lg">
                <h3 className="text-base sm:text- text-center font-bold text-white">
                    {movie.title}
                </h3>
            </div>
        </div>
    );
}

export default MovieCard;
