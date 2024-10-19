import { useState } from 'react';
import classes from './AuthForm.module.css';
import singUp from '../Firebase/authFun';


export default function SingUp() {

    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value
        const password = event.target.password.value
        const passwordConfirmation = event.target.confirmPassword.value

        if (password !== passwordConfirmation) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Sign up logic
            setMessage("Sending request...");

            await singUp(email, password)

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
                <h1>Sign Up</h1>
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
                    <div className={classes.control}>
                        {/* <label htmlFor='confirmPassword'>Confirm Password</label> */}
                        <input
                            type='password'
                            name="confirmPassword"
                            id='confirmPassword'
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
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
                Have an account? Login
            </section>
        </>
    )
}
