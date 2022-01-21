import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import company from '../../../company'
import styles from './_auth.module.sass'
import GoogleLogin from 'react-google-login'
import {windowHeight} from '../Dashboard/variables/mobileHeights'

const Auth = () => {
    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = 'light'
    }, [])

    const scrollToView = (target) => {
        document.getElementById('authWrapper').scroll({top: target.offsetTop, behavior: 'smooth'})
    }

    return (
        <div className={styles.wrapper} style={{height: window.innerHeight+'px'}} id='authWrapper'>
            <div className={styles.auth} style={{height: windowHeight+'px'}}>
                <div className={styles.form}>
                    <div className={styles.title}>
                        <img src='/logos/main.png' alt={company.subsidiary} />
                        <h1>Skyhance</h1>
                        <p>sign up to continue to Uplyft</p>
                    </div>
                    <div className={styles.social}>
                    <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                    />
                    </div>
                    <div className={styles.divide}>
                        <hr />
                        <p>or</p>
                        <hr />
                    </div>
                    <div className={styles.input}>
                        <input onMouseDown={(e)=>scrollToView(e.target)} type='text' placeholder='Email' />
                        <input onMouseDown={(e)=>scrollToView(e.target)} type='password' placeholder='Password' />
                        <input onMouseDown={(e)=>scrollToView(e.target)} type='password' placeholder='Confirm Password' />
                        <Link to={`/${company.subsidiary}/dashboard/${company.journals}`}>Continue</Link>
                    </div>
                    <div className={styles.signin}>
                        <p>Already have an account?</p>
                        <Link to={`/${company.subsidiary}/signin`}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
