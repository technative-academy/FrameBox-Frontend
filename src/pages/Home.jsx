import Carousel from '../components/Carousel/Carousel';

function Home() {
  return (
    <div className="bg-amber-50 min-h-screen pb-16 sm:pb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-4 pt-4">Trending Now</h2>
      <Carousel />
      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-4">My playlist</h2>
        <Carousel />
      </div> 
    </div>
  );
}

export default Home;
