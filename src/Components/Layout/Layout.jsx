// import MyNavbar from '../MainComponents/MyNavbar'
// import Footer from '../MainComponents/Footer'
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div>
            {/* <MyNavbar /> */}
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}
