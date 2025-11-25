import Carousel from "../components/carousel/carousel";
import PlaylistCarousel from "../components/carousel/playlistcarousel";
import AddButton from "../components/AddButton/AddButton";
import PlayListForm from "../components/PlaylistForm/PlaylistForm";
import { useState } from "react";
import MovieForm from "../components/MovieForm/MovieForm";

function Home() {
    const [showPlayForm, setShowPlayForm] = useState(false);

    const onAddButtonClick = () => {
        setShowPlayForm((prev) => !prev);
    };
    const buttonName = "Create Playlist";

    return (
        <div className="bg-zinc-900 min-h-screen pb-16 sm:pb-8 w-screen text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-center">
                Trending Now
            </h2>
            <div className="flex justify-center">
                <Carousel />
            </div>

            <div className="mt-2">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-center">
                    Your Collection
                </h2>
                <div className="flex justify-end mb-4 pr-4 sm:pr-12 sm:mt-12">
                    <AddButton
                        nameOfButton={buttonName}
                        onClick={onAddButtonClick}
                    />
                </div>
                <div>
                    <div className="relative z-100">
                        {showPlayForm && (
                            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                                <PlayListForm
                                    onCancel={() => setShowPlayForm(false)}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <PlaylistCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
