//This file is:
//Deprecated and unneeded as doesn't use the Redux toolkit
//and only addresses the requirements and structure of test data

import { movies } from "./data-test.jsx";
import { playlists } from "./playlist-data.jsx";

//Finds playslist by ID and returns associated movies
//returns an array of movie objects
export const getMoviesForPlaylist = (playlistId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (!playlist) return [];

    return playlist.movieIds
        .map((movieId) => movies.find((movie) => movie.id === movieId))
        .filter(Boolean);
};

//add movies that isn't already in the playlist
export const addMovieToPlaylist = (playlistId, movieId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist && !playlist.movieIds.includes(movieId)) {
        playlist.movieIds.push(movieId);
    }
};

//removes movie from the playlist
export const removeMovieFromPlaylist = (playlistId, movieId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    if (playlist) {
        playlist.movieIds = playlist.movieIds.filter((id) => id !== movieId);
    }
};

//checks if a movie is in the playlist
export const isMovieInPlaylist = (playlistId, movieId) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    return playlist ? playlist.movieIds.includes(movieId) : false;
};
