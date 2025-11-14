import { NavLink } from "react-router-dom";
import { useState } from "react";
import styles from "./Nav.module.css";
import { Menu, X } from "lucide-react";

function SiteNav({ type }) {
    const navLinks = [
        { label: "Home", url: "/" },
        { label: "Movies", url: "/Movies" },
        type === "login"
            ? { label: "Login", url: "/Login" }
            : { label: "SignUp", url: "/SignUp" },
    ];

    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const closeMenu = () => {
        setIsActive(false);
    };

    return (
        <header className="flex flex-wrap bg-amber-100 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
            {/* Top Row */}
            <div className="flex justify-between items-center w-full px-6 py-3">
                <h1 className="font-bold text-xl text-black">MySite</h1>

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
                </nav>

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
                </nav>
            )}
        </header>
    );
}

export default SiteNav;
