import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { fetchPlaylists } from "../slices/playlistSlice";
import { getMoviesForPlaylist } from "../playlistHelpers.jsx";

function PlaylistDetail() {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.items);
    const status = useSelector((state) => state.playlists.status);
    const error = useSelector((state) => state.playlists.error);

    //  Fetch playlists from API if not loaded
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPlaylists());
        }
    }, [dispatch, status]);

    const { slug } = useParams();
    const navigate = useNavigate();

    // Find playlist by ID from Redux store
    const playlist = playlists.find((p) => p.slug === slug);
    console.log(slug);
    console.log(playlists);

    // Fetch related movies dynamically
    const playlistMovies = getMoviesForPlaylist(slug);

    // Handle loading and error states
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-auto mt-5 text-xl">
                Loading playlist...
            </div>
        );
    }

    if (status === "failed") {
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
        <div className="bg-amber-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-transparent text-black hover:scale-110 transition-transform rounded-full"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold">{playlist.playlist_name}</h1>
            </div>

            {/* Playlist Cover and Info */}
            <div className="flex flex-col md:flex-row gap-6 p-4">
                <img
                    src={playlist.img}
                    alt={playlist.playlist_name}
                    className="w-64 h-64 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-end">
                    <h2 className="text-5xl font-bold mb-2">
                        {playlist.playlist_name}
                    </h2>
                    <p className="text-gray-600">
                        {playlistMovies.length} movies
                    </p>
                </div>
            </div>

            {/* Movies List */}
            <div className="p-4">
                <h3 className="text-2xl font-bold mb-4">
                    Movies in this playlist
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {playlistMovies.map((movie) => (
                        <div key={movie.id} className="group cursor-pointer">
                            <div className="relative">
                                <img
                                    src={movie.img}
                                    alt={movie.title}
                                    className="w-full aspect-2/3 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 bg-gray-500/0 transition-all duration-300 rounded-lg opacity-0 group-hover:opacity-100"></div>
                            </div>
                            <div className="mt-2">
                                <h4 className="font-semibold text-sm">
                                    {movie.title}
                                </h4>
                                <p className="text-xs text-gray-600">
                                    {movie.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlaylistDetail;
