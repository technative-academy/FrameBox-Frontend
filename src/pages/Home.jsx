import Carousel from "../components/carousel/carousel";
import PlaylistCarousel from "../components/carousel/playlistcarousel";
import AddButton from "../components/AddButton/AddButton";
import PlayListForm from "../components/PlaylistForm/PlaylistForm";
import { useState } from "react";

function Home() {
    const [showPlayForm, setShowPlayForm] = useState(false);

    const onAddButtonClick = () => {
        setShowPlayForm(!showPlayForm);
    };
    const buttonName = "Create Playlist";

    return (
        <div className="bg-amber-50 min-h-screen pb-16 sm:pb-8 w-screen">
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
                <div className=" flex justify-end mb-4 pr-2 sm:pr-10">
                    <AddButton
                        nameOfButton={buttonName}
                        onClick={onAddButtonClick}
                    />
                </div>
                <div>
                    <div className="relative z-100 ">
                        {showPlayForm && <PlayListForm />}
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
