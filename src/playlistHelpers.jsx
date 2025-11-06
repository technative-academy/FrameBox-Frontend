import { movies } from './data-test.jsx';
import { playlists } from './playlist-data.jsx';

export const getMoviesForPlaylist = (playlistId) => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return [];
  
  return playlist.movieIds.map(movieId => 
    movies.find(movie => movie.id === movieId)
  ).filter(Boolean);
};

export const addMovieToPlaylist = (playlistId, movieId) => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist && !playlist.movieIds.includes(movieId)) {
    playlist.movieIds.push(movieId);
  }
};

export const removeMovieFromPlaylist = (playlistId, movieId) => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (playlist) {
    playlist.movieIds = playlist.movieIds.filter(id => id !== movieId);
  }
};

export const isMovieInPlaylist = (playlistId, movieId) => {
  const playlist = playlists.find(p => p.id === playlistId);
  return playlist ? playlist.movieIds.includes(movieId) : false;
};