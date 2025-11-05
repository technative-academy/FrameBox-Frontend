function Footer() {
    return (
        <div className="bg-[#282828] text-gray-300 p-8">
            <div className="flex justify-between items-end max-w-7xl mx-auto">
                {/* Left Section */}
                <div className="flex flex-col">
                    <div className="flex gap-6 mb-6">
                        <a
                            href="https://github.com/technative-academy/FrameBox-Frontend"
                            className="text-[#EAB308] hover:underline"
                        >
                            Github
                        </a>
                        <a
                            href="https://github.com/technative-academy/FrameBox-Backend"
                            className="text-[#EAB308] hover:underline"
                        >
                            API Github
                        </a>
                    </div>
                    <p className="text-gray-300">
                        © 2025 Copyright. All rights reserved.
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex gap-6">
                    <a href="#" className="text-gray-300 hover:underline">
                        Terms & Conditions
                    </a>
                    <a href="#" className="text-gray-300 hover:underline">
                        Cookies
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
