import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/login'
                && location.pathname !== '/sing-up'
                && <Navbar />}
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}
