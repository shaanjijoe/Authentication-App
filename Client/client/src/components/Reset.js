import React from 'react';
// import {Link} from 'react-router-dom';
// import avatar from '../Images/No-profile.png'
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { resetpasswordValidate } from '../helper/validate';
function Reset() {
    const formik =useFormik({
        initialValues :{
            password: '',
            confirm_password: '',
        },
        validate: resetpasswordValidate,

        // directed to validate.js
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values =>{
            console.log(values); 
            // console.log(formik);
        
        }
    })
    // const formik stores that object returned by useformik
    // argument is the object provided and this object consist of an object
    // unable to understand line 14 (async value)

    return (
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder= {false}></Toaster>
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>
            <div className="title flex flex-col items-center">
                <h4 className="yo text-5xl font-bold">Reset</h4>
                <span className='py-5 text-xl w-2/3 text-center text-gray-500'>Enter New Password</span>
                <form className='py-1' onSubmit={formik.handleSubmit}>
                    {/*
                    whenever my form is submitted formik.handlesubmit is called
                    it is an inbuilt function in formik lib 
                    */}
                    <div className='profile flex justify-center py-4'>
                    
                </div>
                <div className='textbox flex flex-col items-center gap-6'>
                    <input {...formik.getFieldProps('password')} className= {styles.textbox} type="password" placeholder='Password'/>
                    <input {...formik.getFieldProps('confirm_password')} className= {styles.textbox} type="password" placeholder='Confirm Password'/>  
                    {/* in the above line placeholder sets a default display value to my text box
                        ... works as spread operator and takes all values from it in a go and also update it along
                        here i called formik and in the field of that object we changed value of username
                        username here is the key of that object
                     */}
                    <button type = 'submit' className={styles.btn}>Reset</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Reset;
