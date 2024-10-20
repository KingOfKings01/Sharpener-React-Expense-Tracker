import { Link } from "react-router-dom"
import classes from "./navbar.module.css"

export default function Navbar() {
    return (
        <section>
            <div className={classes.hading}>
                <p>Welcome To Expense Tracker!!!</p>
                <div className={classes.profileAction}>Your profile is Incomplete. <Link to="/profile">Complete now</Link></div>
            </div>

            <hr />
        </section>
    )
}
