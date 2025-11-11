import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

function SiteNav({ type }) {
    const navLinks = [
        { label: "Home", url: "/" },
        { label: "Movies", url: "/Movies" },
        type === "login"
            ? { label: "Login", url: "/Login" }
            : { label: "SignUp", url: "/SignUp" },
    ];
    return (
        <div className="p-4 flex justify-center items-center bg-amber-100 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] ">
            <nav className="flex gap-6">
                {navLinks.map((navLink) => (
                    <NavLink
                        key={navLink.url}
                        to={navLink.url}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        {navLink.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}

export default SiteNav;
