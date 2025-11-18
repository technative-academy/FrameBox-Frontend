import PlaylistCarousel from "../components/carousel/playlistcarousel";

//TODO: Fetch user data from Redux store and display actual user info
function Profile() {
    return (
        <div className="bg-amber-50 min-h-screen">
            {/* Profile Header */}
            <div className="bg-linear-to-b from-gray-800 to-amber-50 p-8">
                <div className="flex items-end gap-6">
                    {/* Profile Picture */}
                    <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                            src="/default-avatar.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML =
                                    '<svg class="w-20 h-20 sm:w-32 sm:h-32 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>';
                            }}
                        />
                    </div>

                    {/* Username and Info */}
                    <div className="pb-4">
                        <p className="text-sm font-semibold text-white">
                            Profile
                        </p>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mt-2">
                            Username
                        </h1>
                        <p className="text-white mt-4">
                            <span className="font-semibold">3</span> Public
                            Playlists
                        </p>
                    </div>
                </div>
            </div>

            {/* Playlists Section */}
            <div className="mt-8 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                    My Playlists
                </h2>
                <PlaylistCarousel />
            </div>
        </div>
    );
}

export default Profile;
