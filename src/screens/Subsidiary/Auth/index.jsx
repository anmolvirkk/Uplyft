import React, { useEffect, useRef, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import company from '../../../company'
import styles from './_auth.module.sass'
import GoogleLogin from 'react-google-login'
import {windowHeight} from '../Dashboard/variables/mobileHeights'
import InputBox from './components/InputBox'
import Backendless from 'backendless'
import { useSetRecoilState } from 'recoil'
import authAtom from './authAtom'

const Auth = ({type}) => {

    const inputText = useRef({
        email: '',
        password: '',
        confirmpassword: ''
    })

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = 'light'
    }, [])

    useEffect(()=>{
        if(document.getElementById('authEmail')){
            inputText.current.email = document.getElementById('authEmail').innerText
        }
        if(document.getElementById('authPassword')){
            inputText.current.password = document.getElementById('authPassword').innerText
        }
        if(document.getElementById('authConfirmPassword')){
            inputText.current.confirmpassword = document.getElementById('authConfirmPassword').innerText
        }
    }, [inputText])

    const [error, setError] = useState({email: false, password: false})
    const setAuth = useSetRecoilState(authAtom)

    const onsubmit = () => {
        let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
        let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
        Backendless.initApp(APP_ID, API_KEY)
        if(type==='signup'){
            if(inputText.current.password === inputText.current.confirmpassword){
                if(error.password){
                    setError({...error, password: false})
                }
                let user = new Backendless.User()
                user.email = inputText.current.email
                user.password = inputText.current.password
                setAuth({email: inputText.current.email, password: inputText.current.password})
                Backendless.UserService.register( user ).then(()=>{
                    setRedirect(true)
                }).catch((err)=>setError({...error, email: err.message}))
            }else{
                setError({...error, password: 'Password Mismatch'})
            }
        }else{
            Backendless.UserService.login(inputText.current.email, inputText.current.password, true).then(()=>{
                setAuth({email: inputText.current.email, password: inputText.current.password})
                setRedirect(true)
            }).catch((err)=>setError({...error, password: err.message}))
        }
    }

    const [redirect, setRedirect] = useState(false)

    return (
        <div className={styles.wrapper} style={{height: window.innerHeight+'px'}} id='authWrapper'>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}`} />:null}
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
                    <div className={styles.input} id='authForm'>
                        <InputBox error={error.email} id='authEmail' onBlur={(e)=>inputText.current.email=e.target.value} onLoad={(e)=>inputText.current.email=e.target.value} onChange={(e)=>inputText.current.email=e.target.value} marginBottom={28} wrapper='authWrapper' name="Email" type="text" />
                        <InputBox id='authPassword' onBlur={(e)=>inputText.current.email=e.target.value} onLoad={(e)=>inputText.current.password=e.target.value} error={error.password} onChange={(e)=>inputText.current.password=e.target.value} marginBottom={28} wrapper='authWrapper' name="Password" type="password" />
                        {type==='signup'?<InputBox error={error.password} id='authConfirmPassword' onChange={(e)=>inputText.current.confirmpassword=e.target.value} marginBottom={40} wrapper='authWrapper' name="Confirm Password" type="password" />:null}
                        <button onMouseDown={onsubmit}>Continue</button>
                    </div>
                    {type==='signup'?
                        <div className={styles.signin}>
                            <p>Already have an account?</p>
                            <Link to={`/${company.subsidiary}/login`}>Sign In</Link>
                        </div>
                    :<div className={styles.signin}>
                        <p>Don't have an account?</p>
                        <Link to={`/${company.subsidiary}/signup`}>Create Account</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Auth
