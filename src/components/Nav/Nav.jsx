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
        <div className={styles.wrapper}>
            <nav className={styles.links}>
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
