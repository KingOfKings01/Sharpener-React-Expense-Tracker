import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../Firebase/authFun';
import classes from "./profile.module.css"
import { FaGithub } from "react-icons/fa";
import { IoMdLink } from 'react-icons/io';

export default function Profile() {
    const [fName, setFName] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserProfile()
    })

    async function fetchUserProfile() {
        setIsLoading(true);
        try {
            const data = await getUserProfile()
            if (data) {
                setFName(data.displayName);
                setImgUrl(data.photoURL);
            } else {
                throw new Error('No user profile data found');
            }
        } catch (error) {
            console.error(error.message)
        }
        setIsLoading(false);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log({ fName, imgUrl });

        await updateUserProfile(fName, imgUrl);

        setFName('');
        setImgUrl('');
    };

    return (
        <section className={classes.container}>
            <h3>Contact Details</h3>
            {isLoading ? <p>Please wait...</p> :

                <form className={classes.formGroup} onSubmit={handleSubmit}>
                    <div className={classes.formControl}>

                        <FaGithub />
                        <label htmlFor="fName"> Full Name: </label>
                        <input
                            type="text"
                            id="fName"
                            name="fName"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                        />
                        <IoMdLink />
                        <label htmlFor="imgUrl"> Profile Photo URL: </label>
                        <input
                            type="text"
                            id="imgUrl"
                            name="imgUrl"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            }

            <hr />

        </section>
    );
}
