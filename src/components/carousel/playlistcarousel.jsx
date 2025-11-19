import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../../slices/playlistSlice";
import AddButton from "../AddButton/AddButton";

function Carousel() {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists.items);
    const status = useSelector((state) => state.playlists.status);
    const error = useSelector((state) => state.playlists.error);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef(null);
    const navigate = useNavigate();

    // Fetch playlists from API
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPlaylists());
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
        const maxIndex = playlists.length - itemsPerView;

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

    const handlePlaylistClick = (playlistSlug) => {
        navigate(`/playlist/${playlistSlug}`);
    };

    return (
        <div className="py-2 w-11/12 sm:py-4 pb-10 sm:pb-1">
            <AddButton type="playlist" />
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

                {currentIndex < playlists.length - 1 && (
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
                        className="flex gap-3 transition-transform duration-300 ease-in-out px-4 sm:px-4 "
                    >
                        {playlists.map((playlist, index) => (
                            <div
                                key={playlist.slug}
                                className="flex-none w-[75vw] sm:w-1/2 md:w-1/3 lg:w-1/5 snap-start first:snap-center last:snap-center "
                            >
                                <div
                                    className="relative group/card cursor-pointer"
                                    onClick={(event) =>
                                        handlePlaylistClick(playlist.slug)
                                    }
                                >
                                    <div className="relative">
                                        <h3 className="text-base sm:text-lg font-bold text-black">
                                            {playlist.title}
                                        </h3>
                                        <img
                                            src={playlist.img}
                                            alt={playlist.title}
                                            className="w-full aspect-square object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="mt-4 p-2"></div>
                                    {/* Hover overlay covering both image and text */}
                                    <div className="absolute inset-0 bg-gray-500/0 group-hover/card:bg-gray-500/20 transition-all duration-300 rounded-lg opacity-0 group-hover/card:opacity-100"></div>
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
