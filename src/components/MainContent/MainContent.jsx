import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

function MainContent() {
    return (
        <div className>
            <Outlet />
        </div>
    );
}

export default MainContent;
