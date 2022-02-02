import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import company from '../../../company'
import styles from './_auth.module.sass'
import GoogleLogin from 'react-google-login'
import {windowHeight} from '../Dashboard/variables/mobileHeights'
import InputBox from './components/InputBox'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import authAtom from './authAtom'

const Auth = ({type}) => {

    const history = useHistory()

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = 'light'
    }, [])

    const [error, setError] = useState({email: false, password: false})
    const setAuth = useSetRecoilState(authAtom)

    const onsubmit = () => {
        let form = {
            email: document.getElementById('authEmail').value,
            password: document.getElementById('authPassword').value,
            confirm: document.getElementById('authConfirmPassword')?document.getElementById('authConfirmPassword').value:''
        }
        if(type==='signup'){
            if(form.password === form.confirm){
                if(error.password){
                    setError({...error, password: false})
                }
                console.log('signup')
            }else{
                setError({...error, password: 'Password Mismatch'})
            }
        }else{
            let xhr = new XMLHttpRequest()
            xhr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
            xhr.send(JSON.stringify({login: form.email, password: form.password}))
            localStorage.clear()
            xhr.onload = (e) => {
                setAuth({login: form.email, password: form.password, social: false, objectId: JSON.parse(e.currentTarget.response).objectId, userToken: JSON.parse(e.currentTarget.response)['user-token']})
                history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
            }
        }
    }

    const onsocial = (social) => {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', `https://deepway.backendless.app/api/users/oauth/googleplus/login`, true)
        xhr.send(JSON.stringify({accessToken: social.accessToken}))
        localStorage.clear()
        xhr.onload = (e) => {
            setAuth({accessToken: social.accessToken, social: true, objectId: JSON.parse(e.currentTarget.response).objectId, userToken: JSON.parse(e.currentTarget.response)['user-token']})
            history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
        }
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
                        clientId="617480862173-k9bvrokkossadseq442ee6e5oatfj5os.apps.googleusercontent.com"
                        buttonText="Continue with Google"
                        onSuccess={(e)=>onsocial(e)}
                    />
                    </div>
                    <div className={styles.divide}>
                        <hr />
                        <p>or</p>
                        <hr />
                    </div>
                    <div className={styles.input} id='authForm'>
                        <InputBox error={error.email} id='authEmail' marginBottom={28} wrapper='authWrapper' name="Email" type="text" />
                        <InputBox id='authPassword' error={error.password} marginBottom={28} wrapper='authWrapper' name="Password" type="password" />
                        {type==='signup'?<InputBox error={error.password} id='authConfirmPassword' marginBottom={40} wrapper='authWrapper' name="Confirm Password" type="password" />:null}
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
