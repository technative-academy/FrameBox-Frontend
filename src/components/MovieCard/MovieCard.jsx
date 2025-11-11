import { useState } from 'react';
import { addMovieToPlaylist, isMovieInPlaylist } from '../../playlistHelpers.jsx';
import { playlists } from '../../playlist-data.jsx';

function MovieCard({ movie }) {
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

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
        {/* Add to playlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistMenu(!showPlaylistMenu);
          }}
          className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"
        >
          +
        </button>
        
        {/* Playlist dropdown menu */}
        {showPlaylistMenu && (
          <div className="absolute top-12 right-2 bg-white rounded-lg shadow-lg z-20 min-w-[150px]">
            {playlists.map(playlist => (
              <button
                key={playlist.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToPlaylist(movie.id, playlist.id);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  isMovieInPlaylist(playlist.id, movie.id) 
                    ? 'text-green-600 font-semibold' 
                    : 'text-gray-800'
                }`}
              >
                {playlist.playlist_name}
                {isMovieInPlaylist(playlist.id, movie.id) && ' ✓'}
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