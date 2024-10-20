import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../Firebase/authFun';
import classes from "./profile.module.css"

export default function Profile() {
  const [fName, setFName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(()=>{
    fetchUserProfile()
})

async function fetchUserProfile() {
      const data =  await getUserProfile()

      if (data) {
        setFName(data.displayName);
        setImgUrl(data.photoURL);
      } else {
        console.error('No user profile data found');
      }
    }

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ fName, imgUrl });

    await updateUserProfile(fName, imgUrl);

    setFName('');
    setImgUrl('');
  };

  return (
    <section className={classes.formGroup}>
      <h3>Contact Details</h3>
      <form onSubmit={handleSubmit}>
        <div className={classes.formControl}>
          <label htmlFor="fName">Full Name</label>
          <input
            type="text"
            id="fName"
            name="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className={classes.formControl}>
          <label htmlFor="imgUrl">Profile Photo URL</label>
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
    </section>
  );
}
