import React, { useState, useRef } from "react";
import { movies } from "../../data-test.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addMovieToPlaylist, isMovieInPlaylist } from "../../playlistHelpers.jsx";
import { playlists } from '../../playlist-data.jsx';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(null);
    const carouselRef = useRef(null);

    const getItemsPerView = () => {
        if (window.innerWidth < 640) return 1;
        if (window.innerWidth < 768) return 2;
        if (window.innerWidth < 1024) return 3;
        return 5;
    };

    const scrollToIndex = (index) => {
        if (!carouselRef.current) return;

        const itemsPerView = getItemsPerView();
        const containerWidth = carouselRef.current.parentElement.offsetWidth;
        const gap = 16;

        if (itemsPerView === 1) {
            // Mobile: scroll to center each card
            const cardWidth = containerWidth * 0.8; 
            const padding = 16;
            const scrollPosition = index * (cardWidth + gap) + padding;
            carouselRef.current.parentElement.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        } else {
            // Desktop: use transform
            const itemWidth = containerWidth / itemsPerView;
            carouselRef.current.style.transform = `translateX(-${
                index * (itemWidth + gap)
            }px)`;
        }
    };

    const handleNext = () => {
        const itemsPerView = getItemsPerView();
        const maxIndex = movies.length - itemsPerView;

        if (currentIndex < maxIndex) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            scrollToIndex(newIndex);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            scrollToIndex(newIndex);
        }
    };

    const handleAddToPlaylist = (movieId, playlistId) => {
        addMovieToPlaylist(playlistId, movieId);
        setShowPlaylistMenu(null);
        // You might want to show a success message here
    };

    return (
        <div className="py-1 sm:py-2 pb-1 sm:pb-1">
            <div
                className="relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Show buttons always on mobile, on hover for desktop */}
                {currentIndex > 0 && (
                    <button
                        className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-r sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                    </button>
                )}

                {currentIndex < movies.length - 1 && (
                    <button
                        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-l sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        onClick={handleNext}
                    >
                        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                    </button>
                )}

                <div className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex gap-4 transition-transform duration-300 ease-in-out px-4 sm:px-4"
                    >
                        {movies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className="flex-none w-[80vw] sm:w-1/2 md:w-1/3 lg:w-1/5 snap-start first:snap-center last:snap-center"
                            >
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
                                                setShowPlaylistMenu(showPlaylistMenu === movie.id ? null : movie.id);
                                            }}
                                            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"
                                        >
                                            +
                                        </button>
                                        
                                        {/* Playlist dropdown menu */}
                                        {showPlaylistMenu === movie.id && (
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
                                    <div className="mt-1 p-1">
                                        <h3 className="text-base sm:text-lg font-bold text-black">
                                            {movie.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            {movie.category}
                                        </p>
                                    </div>
                                    {/* Hover overlay covering both image and text */}
                                    <div className="absolute inset-0 bg-gray-500/0 group-hover/card:bg-gray-200/20 transition-all duration-300 rounded-lg opacity-0 group-hover/card:opacity-100"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
