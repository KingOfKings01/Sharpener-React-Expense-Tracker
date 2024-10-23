import { Outlet,useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";

export default function Layout() {
    const { uid } = useSelector((state) => state.auth);
    const location = useLocation();
    return (
        <div>
            {location.pathname !== '/login'
                && location.pathname !== '/sing-up'
                && location.pathname !== '/forgot-password'
                && <Navbar />}

                {uid && <Navbar />}
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}
