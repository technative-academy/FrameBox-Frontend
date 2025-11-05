import Carousel from '../components/Carousel/Carousel';

function Home() {
  return (
    <div className="bg-amber-50 min-h-screen">
      <h1 className="text-red-600 text-3xl text-start py-4">Trending</h1>
      <Carousel />
      <div>
        <h1 className="text-red-600 text-3xl text-start py-4">My movies</h1>
        <Carousel />
      </div>
    </div>

  );
}

export default Home;
