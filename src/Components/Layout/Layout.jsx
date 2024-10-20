// import MyNavbar from '../MainComponents/MyNavbar'
// import Footer from '../MainComponents/Footer'
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}
