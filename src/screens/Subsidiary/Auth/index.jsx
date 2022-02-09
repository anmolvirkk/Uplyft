import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import company from '../../../company'
import styles from './_auth.module.sass'
import GoogleLogin from 'react-google-login'
import {windowHeight} from '../Dashboard/variables/mobileHeights'
import InputBox from './components/InputBox'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authAtom from './authAtom'
import { planAtom } from '../Dashboard/allAtoms'
import Lottie from 'react-lottie-player'
import loadData from '../loading.json'

const Auth = ({type}) => {

    const history = useHistory()

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = 'light'
    }, [])

    const [error, setError] = useState({email: false, password: false})
    const setPlan = useSetRecoilState(planAtom)
    const [auth, setAuth] = useRecoilState(authAtom)
    const [loading, setLoading] = useState(false)

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
                let xhr = new XMLHttpRequest()
                xhr.open('POST', `https://deepway.backendless.app/api/users/register`, true)
                xhr.setRequestHeader('Content-Type', 'application/json')
                xhr.send(JSON.stringify({email: form.email, password: form.password}))
                setLoading(true)
                xhr.onload = (e) => {
                    setLoading(false)
                    if(JSON.parse(e.currentTarget.response).code === undefined){
                        setAuth({...auth, plan: {title: JSON.parse(e.currentTarget.response).plan}, login: form.email, password: form.password, social: false, objectId: JSON.parse(e.currentTarget.response).objectId, userToken: JSON.parse(e.currentTarget.response)['user-token']})
                        setPlan(JSON.parse(e.currentTarget.response).plan)
                        if(JSON.parse(e.currentTarget.response).plan === 'free'){
                            history.push(`/${company.subsidiary}/checkout`)
                        }else{
                            history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
                        }
                    }else{
                        switch (JSON.parse(e.currentTarget.response).code) {
                            case 3006:
                                setError({password: form.password===''?'Password cannot be empty':error.password, email: form.email===''?'Email cannot be empty':error.email})
                            break
                            case 3003:
                                setError({password: 'Invalid email or password', email: 'Invalid email or password'})
                            break
                            default: setError({password: false, email: JSON.parse(e.currentTarget.response).message})
                            break
                        }
                    }
                }
            }else{
                setError({...error, password: 'Password Mismatch'})
            }
        }else{
            let xhr = new XMLHttpRequest()
            xhr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
            xhr.send(JSON.stringify({login: form.email, password: form.password}))
            setLoading(true)
            xhr.onload = (e) => {
                setLoading(false)
                if(JSON.parse(e.currentTarget.response).code === undefined){
                    setAuth({...auth, plan: {title: JSON.parse(e.currentTarget.response).plan}, login: form.email, password: form.password, social: false, objectId: JSON.parse(e.currentTarget.response).objectId, userToken: JSON.parse(e.currentTarget.response)['user-token']})
                    setPlan(JSON.parse(e.currentTarget.response).plan)
                    history.push(`/${company.subsidiary}/checkout`)
                }else{
                    switch (JSON.parse(e.currentTarget.response).code) {
                        case 3006:
                            setError({password: form.password===''?'Password cannot be empty':error.password, email: form.email===''?'Email cannot be empty':error.email})
                        break
                        case 3003:
                            setError({password: 'Invalid email or password', email: 'Invalid email or password'})
                        break
                        default: setError({password: false, email: JSON.parse(e.currentTarget.response).message})
                        break
                    }
                }
            }
        }
    }

    const onsocial = (social) => {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', `https://deepway.backendless.app/api/users/oauth/googleplus/login`, true)
        xhr.send(JSON.stringify({accessToken: social.accessToken}))
        setLoading(true)
        xhr.onload = (e) => {
            setLoading(false)
            setAuth({...auth, plan: {title: JSON.parse(e.currentTarget.response).plan}, accessToken: social.accessToken, login: JSON.parse(e.currentTarget.response).email, social: true, objectId: JSON.parse(e.currentTarget.response).objectId, userToken: JSON.parse(e.currentTarget.response)['user-token']})
            setPlan(JSON.parse(e.currentTarget.response).plan)
            history.push(`/${company.subsidiary}/checkout`)
        }
    }

    return (
        <div className={styles.wrapper} style={{height: window.innerHeight+'px'}} id='authWrapper'>
            <div className={styles.auth} style={{height: windowHeight+'px'}}>
                <div className={styles.form}>
                    {loading?
                        <div className={styles.loading}>
                            <Lottie
                                play
                                loop
                                animationData={loadData}
                                style={{ width: 250, height: 250 }}
                            />
                        </div>
                    :null}
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
                        autoLoad={false}
                        uxMode='popup'
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
