import Carousel from '../components/carousel/carousel';
import PlaylistCarousel from '../components/Carousel/playlistcarousel';

function Home() {
  return (
    <div className="bg-amber-50 min-h-screen pb-16 sm:pb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 px-2 pt-2">Trending Now</h2>
      <Carousel />
      <div className="mt-2">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 px-2">My playlist</h2>
        <PlaylistCarousel />
      </div> 
    </div>
  );
}

export default Home;
