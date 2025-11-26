import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../slices/moviesAPISlice.js";
import MovieCard from "../components/MovieCard/MovieCard.jsx";
import AddButton from "../components/AddButton/AddButton.jsx";
import AddMovieForm from "../components/AddMovieForm/AddMovieForm.jsx";

function Movies() {
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.items);
    const status = useSelector((state) => state.movies.status);

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [showPlayForm, setShowPlayForm] = useState(false);

    const onAddButtonClick = () => {
        setShowPlayForm((prev) => !prev);
    };

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);

    return (
        <div className="bg-zinc-900 min-h-screen text-white flex flex-col items-center justify-center px-4">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-8 text-center">
                Search your favourite movies
            </h1>

            <div>
                <div className="flex justify-center mb-4 mt-6">
                    <AddButton
                        nameOfButton="Add Movie"
                        onClick={onAddButtonClick}
                    />
                </div>
                <div>
                    <div className="relative z-100">
                        {showPlayForm && (
                            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                                <AddMovieForm
                                    onCancel={() => setShowPlayForm(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative text-white w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-3 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#ff0000] focus:outline-none text-base transition-colors"
                />
            </div>

            {/* Movies Grid or No Results Message */}
            {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-10">
                    {filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                searchQuery && (
                    <div className="text-center mt-10">
                        <p className="text-xl italic text-red-600">
                            Sorry, we don’t have that movie. Bit sad innit.
                        </p>
                    </div>
                )
            )}
        </div>
    );
}

export default Movies;
