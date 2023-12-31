import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import avatar from '../Images/No-profile.png'
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/converter';


const Profile = ()=> {

    const [profileImage, setProfileImage] = useState('');

    const formik =useFormik({
        initialValues :{
            firstname: '',
            lastname: '',
            mobilenp: '',
            email: '',
            address: '',
            // password: ''
        },
        validate: profileValidation,

        // directed to validate.js
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
            
          // Send profile pic or blank
          values= await Object.assign(values, {profile : profileImage || ' '})
          console.log(values)
        
        }
    })
    // const formik stores that object returned by useformik
    // argument is the object provided and this object consist of an object
    // unable to understand line 14 (async value)


    const imageHandler= async e => {
      const base64 = await convertToBase64(e.target.files[0]);
      setProfileImage(base64);
    }

    return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder= {false} />
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass} style={{width: "50%"}}>
            <div className="title flex flex-col items-center">
                <h4 className="yo text-5xl font-bold">Profile</h4>
                <span className='py-5 text-xl w-2/3 text-center text-gray-500'>Update Details</span>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    {/*
                    whenever my form is submitted formik.handlesubmit is called
                    it is an inbuilt function in formik lib 
                    */}
                    <div className='profile flex justify-center py-4'>

                    {/* Clickable tag with profile image upload feature */}
                    <label htmlFor="profile">
                        <img src={profileImage || avatar} className={styles.profile_img} alt= "avatar"/>
                    </label>

                    <input onChange={imageHandler} type="file" id="profile" name="profile"/>



                </div>
                <div className='textbox flex flex-col items-center gap-6'>
                    <div className="name flex w-3/4 gap-10">
                      <input {...formik.getFieldProps('firstname')} className= {styles.textbox} type="text" placeholder='FirstName*'/> 
                      <input {...formik.getFieldProps('lastname')} className= {styles.textbox} type="text" placeholder='LastName*'/> 
                    </div>

                    <div className="name flex w-3/4 gap-10">
                      <input {...formik.getFieldProps('mobileno')} className= {styles.textbox} type="text" placeholder='Mobile Number*'/> 
                      <input {...formik.getFieldProps('email')} className= {styles.textbox} type="text" placeholder='Email*'/> 
                    </div>

                    {/* <input {...formik.getFieldProps('email')} className= {styles.textbox} type="password" placeholder='Email*'/> 
                    <input {...formik.getFieldProps('username')} className= {styles.textbox} type="password" placeholder='Username*'/>  */}
                    <input {...formik.getFieldProps('address')} className= {styles.textbox} type="text" placeholder='Address*'/> 
                    

                    {/* in the above line placeholder sets a default display value to my text box
                        ... works as spread operator and takes all values from it in a go and also update it along
                        here i called formik and in the field of that object we changed value of username
                        username here is the key of that object
                     */}
                    <button type = 'submit' className={styles.btn}>Register</button>
                </div>
                <div className='text-center py-4'>
                    <span className='text-gray-500'>
                        come back later   
                        <Link to="/" className='text-red-500'> Log Out</Link>
                    </span>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Profile;
