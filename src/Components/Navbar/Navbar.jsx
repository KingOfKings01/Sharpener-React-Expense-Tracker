import { Link, Navigate } from "react-router-dom"
import classes from "./navbar.module.css"
import { logout } from "../../Firebase/authFun"
import { useState } from "react";

export default function Navbar() {
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    
    const handleLogout = () => {
        
        logout()
        // TODO: Redirect to login
        setIsAuthenticate(true)
    }
    return (
        <section>
            <div className={classes.hading}>
                <p>Welcome To Expense Tracker!!!</p>
                <div className={classes.actions}>
                <div className={classes.profileAction}>Your profile is Incomplete. <Link to="/profile">Complete now</Link></div>
                <button className={classes.logout} onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <hr />

            {isAuthenticate && <Navigate to="login" />}
        </section>
    )
}
