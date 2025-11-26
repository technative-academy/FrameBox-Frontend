function Footer() {
    return (
        <div className="bg-stone-950 text-gray-300 p-8 w-full">
            <div className="flex justify-between items-end w-full mx-auto">
                {/* Left Section */}
                <div className="flex flex-col">
                    <div className="flex gap-6 mb-6">
                        <a
                            href="https://github.com/technative-academy/FrameBox-Frontend"
                            className="text-[#EAB308] hover:underline"
                            target="_blank"
                        >
                            Front-End Github
                        </a>
                        <a
                            href="https://github.com/technative-academy/FrameBox-Backend"
                            className="text-[#EAB308] hover:underline"
                            target="_blank"
                        >
                            Back-End API Github
                        </a>
                    </div>
                    <p className="text-gray-300">
                        © 2025 Copyright. All rights reserved.
                    </p>
                </div>

                {/* Right Section */}
                <div className="flex gap-6">
                    <p className="text-gray-300 hover:underline">
                        Terms & Conditions
                    </p>
                    <p className="text-gray-300 hover:underline">Cookies</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
