import { useState, useRef, useEffect } from "react";

import MovieCard from "../MovieCard/MovieCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../slices/moviesAPISlice.js";

function Carousel() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.items);
    const status = useSelector((state) => state.movies.status);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMovies());
        }
    }, [dispatch, status]);

    const getItemsPerView = () => {
        if (window.innerWidth >= 1280) return 5;
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
    };

    const scrollToIndex = (index) => {
        if (carouselRef.current) {
            const itemWidth = carouselRef.current.scrollWidth / movies.length;
            carouselRef.current.scrollTo({
                left: index * itemWidth,
                behavior: "smooth",
            });
        }
    };

    const handleNext = () => {
        const itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, movies.length - itemsPerView);
        const nextIndex = Math.min(currentIndex + 1, maxIndex);
        setCurrentIndex(nextIndex);
        scrollToIndex(nextIndex);
    };

    const handlePrev = () => {
        const prevIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(prevIndex);
        scrollToIndex(prevIndex);
    };

    useEffect(() => {
        const handleResize = () => {
            const itemsPerView = getItemsPerView();
            const maxIndex = Math.max(0, movies.length - itemsPerView);
            if (currentIndex > maxIndex) {
                setCurrentIndex(maxIndex);
                scrollToIndex(maxIndex);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex]);

    const canScrollPrev = currentIndex > 0;
    const canScrollNext = currentIndex < movies.length - getItemsPerView();

    return (
        <div
            className="relative w-full px-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Previous Button */}
            {canScrollPrev && (
                <button
                    onClick={handlePrev}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    aria-label="Previous"
                >
                    <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="flex gap-2 sm:gap-4 overflow-x-hidden scroll-smooth"
            >
                {movies.map((movie) => (
                    <div
                        key={movie.slug + "wrapper"}
                        className="shrink-0 w-[calc(100%-0.5rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)]"
                    >
                        <MovieCard key={movie.slug} movie={movie} />
                    </div>
                ))}
            </div>

            {/* Next Button */}
            {canScrollNext && (
                <button
                    onClick={handleNext}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    aria-label="Next"
                >
                    <svg
                        className="w-4 h-4 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Carousel;
