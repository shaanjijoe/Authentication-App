import React from 'react';
import {Link} from 'react-router-dom';
import avatar from '../Images/No-profile.png'
import styles from '../styles/Username.module.css';
function Username() {
  return (
    <div className="container mx-auto">
        <div className="flex h-screen">
            <div className={styles.glass}>
            <div className="title flex flex-col items-center">
                <h4 className='text-5xl font-bold'>Login and interface page</h4>
                <span className='py-5 text-xl w-2/3 text-center text-gray-500'>Nevigation system for pages enables</span>
                <form className='py-1'>
                <div className='profile flex justify-center py-4'>
                    <img src={avatar} className={styles.profile_img}alt= "avatar"/>
                </div>
                <div className='textbox flex flex-col items-center gap-6'>
                    <input type="text" placeholder='Username'/>
                    <button type = 'submit' className={styles.btn}>Submit</button>
                </div>
                <div className='text-center py-4'>
                    <span className='text-gray-500'>
                        Not a Member      
                        <Link to="/register" className='text-red-500'> Register now</Link>
                    </span>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Username;
