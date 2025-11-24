import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import PopUp from "../PopUp/PopUp.jsx";

function SiteNav({ type }) {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const navLinks = [
        { label: "Home", url: "/" },
        { label: "Movies", url: "/Movies" },
        isLoggedIn ? null : { label: "Login", url: "/Login" },
        isLoggedIn ? null : { label: "SignUp", url: "/SignUp" },
    ].filter(Boolean);

    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const closeMenu = () => {
        setIsActive(false);
    };

    const capitalName = (currentUser) => {
        return (
            String(currentUser).charAt(0).toUpperCase() +
            String(currentUser).slice(1)
        );
    };

    const displayName = currentUser ? capitalName(currentUser) : "Guest";

    return (
        <header className="flex flex-wrap bg-amber-100 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
            {/* Top Row */}
            <div className="flex justify-between items-center w-full px-6 py-3">
                <h1 className="font-bold text-xl text-black">
                    Welcome, {displayName} to FrameBox
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-6">
                    {navLinks.map((navLink) => (
                        <NavLink
                            key={navLink.url}
                            to={navLink.url}
                            className={({ isActive }) =>
                                isActive
                                    ? styles.activeLink
                                    : styles.inactiveLink
                            }
                        >
                            {navLink.label}
                        </NavLink>
                    ))}
                    {isLoggedIn ? (
                        <NavLink
                            onClick={() => setIsLoggingOut(!isLoggingOut)}
                            className={styles.inactiveLink}
                        >
                            Logout
                        </NavLink>
                    ) : null}
                </nav>
                {isLoggingOut ? (
                    <PopUp onCancel={() => setIsLoggingOut(false)} />
                ) : null}

                {/* Mobile Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden bg-amber-100 text-black"
                >
                    {isActive ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu (on next line) */}
            {isActive && (
                <nav className="flex flex-col items-center w-full pb-3 md:hidden">
                    {navLinks.map((navLink) => (
                        <NavLink
                            key={navLink.url}
                            to={navLink.url}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                isActive
                                    ? styles.activeLink
                                    : styles.inactiveLink
                            }
                        >
                            {navLink.label}
                        </NavLink>
                    ))}
                    {isLoggedIn ? (
                        <NavLink
                            onClick={() => setIsLoggingOut(!isLoggingOut)}
                            className={styles.inactiveLink}
                        >
                            Logout
                        </NavLink>
                    ) : null}
                </nav>
            )}
        </header>
    );
}

export default SiteNav;
