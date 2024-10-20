import { useState } from 'react';
import classes from './AuthForm.module.css';
import {signIn} from '../../Firebase/authFun';
import { Navigate } from 'react-router-dom';


export default function Login() {

    const [message, setMessage] = useState("");
    const [isAuthenticate, setIsAuthenticate] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            // Sign up logic
            setMessage("Sending request...");

            await signIn(email, password)

            setIsAuthenticate(true);
            // alert("User has successfully signed in!");

        } catch (error) {
            console.error(error);
            alert(error.message)
        }

        setMessage("");
        event.target.reset();

        console.log("User has successfully signed up!");
    }


    return (
        <>
            <section className={classes.auth}>
                <h1>Login</h1>
                <br />

                <form onSubmit={handleSubmit}>
                    <div className={classes.control}>
                        {/* <label htmlFor='email'>Your Email</label> */}
                        <input type='email' name="email" id='email' placeholder='Email' required />
                    </div>
                    <div className={classes.control}>
                        {/* <label htmlFor='password'>Password</label> */}
                        <input
                            type='password'
                            name="password"
                            id='password'
                            placeholder='Password'
                            required
                        />
                    </div>
                   
                    <p>Forgot password</p>
                    {message.length > 0 ?
                        <p>{message}</p>
                        :
                        <div className={classes.actions}>
                            <button type='submit'>Sign Up</button>
                        </div>
                    }
                </form>

            </section>
            <section className={classes.auth}>
                Don&#39;t have an account? Sing up
            </section>

            {isAuthenticate && <Navigate to='/' />}
        </>
    )
}
