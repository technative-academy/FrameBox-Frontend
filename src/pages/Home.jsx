import Carousel from "../components/carousel/carousel";

function Home() {
    return (
        <div className="bg-amber-50 min-h-screen">
            <h1 className="text-black text-3xl text-start py-4 ml-4">
                Trending
            </h1>
            <Carousel />
            <div>
                <h1 className="text-black text-3xl text-start ml-4 py-4">
                    My movies
                </h1>
                <Carousel />
            </div>
        </div>
    );
}

export default Home;
