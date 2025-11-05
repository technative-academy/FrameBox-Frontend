import React, { useState, useRef } from "react";
import { movies } from "../../data-test.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef(null);

    const getItemsPerView = () => {
        if (window.innerWidth < 640) return 1; // mobile
        if (window.innerWidth < 768) return 2; // sm
        if (window.innerWidth < 1024) return 3; // md
        return 5; // lg and above
    };

    const scrollToIndex = (index) => {
        if (!carouselRef.current) return;

        const itemsPerView = getItemsPerView();
        const containerWidth = carouselRef.current.parentElement.offsetWidth;
        const gap = 16; // gap-4 = 16px

        if (itemsPerView === 1) {
            // Mobile: scroll to center each card
            const cardWidth = containerWidth * 0.8; // 80vw
            const padding = 16; // px-4 = 16px
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

    return (
        <div className="py-4 sm:py-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-4">
                Trending Now
            </h2>

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

                <div className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide sm:overflow-hidden">
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
                                    <img
                                        src={movie.img}
                                        alt={movie.title}
                                        className="w-full h-[400px] sm:h-[450px] object-cover rounded-lg 'aspect-[2/3]'"
                                    />

                                    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/40 transition-all duration-300 rounded-lg flex items-end p-4 opacity-0 group-hover/card:opacity-100">
                                        <div className="text-white">
                                            <h3 className="text-base sm:text-lg font-bold">
                                                {movie.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-300">
                                                {movie.category}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
