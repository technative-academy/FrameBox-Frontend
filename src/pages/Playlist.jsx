import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import {
    fetchPlaylists,
    deleteMovieFromPlaylist,
} from "../slices/playlistSlice";
import { fetchMovies } from "../slices/moviesAPISlice";
import DeleteButton from "../components/DeleteButton/DeleteButton";

function PlaylistDetail() {
    const dispatchPlaylists = useDispatch();
    const playlists = useSelector((state) => state.playlists.items);
    const statusPlaylists = useSelector((state) => state.playlists.status);
    const error = useSelector((state) => state.playlists.error);

    const dispatchMovies = useDispatch();
    const movies = useSelector((state) => state.movies.items);
    const statusMovies = useSelector((state) => state.movies.status);

    const { slug } = useParams();
    const navigate = useNavigate();

    //  Fetch playlists from API if not loaded
    useEffect(() => {
        if (statusPlaylists === "idle") {
            dispatchPlaylists(fetchPlaylists());
        }
    }, [dispatchPlaylists, statusPlaylists]);

    //  Fetch movies from API if not loaded
    useEffect(() => {
        if (statusMovies === "idle") {
            dispatchMovies(fetchMovies());
        }
    }, [dispatchMovies, statusMovies]);

    // Find playlist by ID from Redux store
    const playlist = playlists.find((p) => p.slug === slug);

    const getMoviesForPlaylist = (playlist) => {
        if (!playlist || !Array.isArray(playlist.movies)) return [];

        // API already returns full movie objects
        if (playlist.movies.length && typeof playlist.movies[1] === "object") {
            return playlist.movies;
        }

        // Fallback in case you ever only get slugs
        return playlist.movies
            .map((movieSlug) =>
                movies.find((movie) => movie.slug === movieSlug)
            )
            .filter(Boolean);
    };

    const playlistMovies = getMoviesForPlaylist(playlist);

    // Handle loading and error states
    if (statusPlaylists === "loading") {
        return (
            <div className="flex items-center justify-center h-auto mt-5 text-xl">
                Loading playlist...
            </div>
        );
    }

    const deletePlaylistMovies = (movieSlug) => {
        dispatchPlaylists(
            deleteMovieFromPlaylist({
                movieSlug,
                playlistSlug: slug,
            })
        );
    };

    if (statusPlaylists === "failed") {
        return (
            <div className="flex items-center justify-center h-auto mt-5  text-red-600 text-xl">
                Failed to load playlists: {error}
            </div>
        );
    }

    if (!playlist) {
        return (
            <div className="flex items-center justify-center h-auto mt-10 text-xl">
                Playlist not found
            </div>
        );
    }

    return (
        <div className=" bg-zinc-900 min-h-screen text-white">
            {/* Header */}
            <div className="flex  items-center gap-4 p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-transparent  hover:scale-110 transition-transform rounded-full"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-4xl font-bold">{playlist.playlist_name}</h1>
            </div>

            {/* Playlist Cover and Info */}
            <div className="flex flex-col md:flex-row gap-6 p-4">
                <img
                    src={playlist.img}
                    alt={playlist.title}
                    className="w-64 h-64 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-end">
                    <h2 className="text-2xl font-bold mb-2">
                        {playlist.title}
                    </h2>
                    <p className="text-white">{playlistMovies.length} movies</p>
                </div>
            </div>

            {/* Movies List */}
            <div className="p-4">
                <h3 className="text-2xl font-bold mb-4 text-white">
                    Movies in this playlist
                </h3>
                <div className="grid text-white grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {playlistMovies.map((movie) => (
                        <div key={movie.slug} className="group cursor-pointer">
                            <div className="relative">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="w-full aspect-2/3 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-gray-500/0 transition-all duration-300 rounded-lg opacity-0 group-hover:opacity-100">
                                    <DeleteButton
                                        onClick={() =>
                                            deletePlaylistMovies(movie.slug)
                                        }
                                        nameOfButton={"x"}
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <h4 className="font-semibold text-sm">
                                    {movie.title}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlaylistDetail;
