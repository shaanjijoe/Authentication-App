import React from 'react';
import {Link} from 'react-router-dom';
// import avatar from '../Images/No-profile.png'
import styles from '../styles/Username.module.css';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { passwordValidate } from '../helper/validate';
function Recovery() {
    const formik =useFormik({
        initialValues :{
            password: '@1234'
        },
        validate: passwordValidate,

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
                <h4 className="yo text-5xl font-bold">Wanna Recover Password ?</h4>
                <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter OTP to recover Password</span>
                <form className='py-20'>
                    {/*
                    whenever my form is submitted formik.handlesubmit is called
                    it is an inbuilt function in formik lib 
                    */}
                  
                <div className='textbox flex flex-col items-center gap-6'>
                  <div className='input text-center'>
                  <span className='py-4 text-sm text-left text-gray-500'>Enter 6 Digit OTP sent to your email address</span>
                    <input className= {styles.textbox} type="password" placeholder='OTP'/> 
                    </div>
                    <button type = 'submit' className={styles.btn}>Recover</button>
                </div>
                <div className='text-center py-4'>
                    <span className='text-gray-500'>
                        Can't Get OTP     
                        <button className='text-red-500'>Resend</button>
                    </span>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Recovery;
