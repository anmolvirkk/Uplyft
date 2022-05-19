import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import company from '../../company'
import styles from './_auth.module.sass'
import GoogleLogin from 'react-google-login'
import {windowHeight} from '../Dashboard/variables/mobileHeights'
import InputBox from './components/InputBox'
import { useHistory } from 'react-router-dom'
import Lottie from 'react-lottie-player'
import loadData from '../loading.json'
import dataAtom from '../Dashboard/dataAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import priceAtom from '../Checkout/priceAtom'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db } from '../../firebase'
import { setDoc, doc } from 'firebase/firestore'

const Auth = ({type}) => {

    const history = useHistory()
    const setData = useSetRecoilState(dataAtom)

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = 'light'
    }, [])

    const [error, setError] = useState({email: false, password: false})
    const [loading, setLoading] = useState(false)
    const [price] = useRecoilState(priceAtom)

    const onsubmit = () => {
        let form = {
            email: document.getElementById('authEmail').value,
            password: document.getElementById('authPassword').value,
            confirm: document.getElementById('authConfirmPassword')?document.getElementById('authConfirmPassword').value:''
        }
        setLoading(true)
        if(type==='signup'){
            if(form.password === form.confirm){
                if(error.password){
                    setError({...error, password: false})
                }else{
                    const auth = getAuth()
                    createUserWithEmailAndPassword(auth, form.email, form.password).then((e)=>{
                        setDoc(doc(db, 'users', e.user.uid), {}).then(()=>{
                            setData({
                                email: form.email,
                                uid: e.user.uid
                            })
                            if(price){
                                history.push(`/checkout`)
                            }else{
                                history.push(`/dashboard/${company.journals}`)
                            }
                        }).catch(err=>{
                            setError({...error, email: JSON.parse(JSON.stringify(err)).code.replaceAll('auth/', '').replaceAll('-', ' ')})
                            setLoading(false)
                        })
                    }).catch(err=>{
                        if(Object.keys(JSON.parse(JSON.stringify(err))).length !== 0){
                            setError({...error, email: JSON.parse(JSON.stringify(err)).code.replaceAll('auth/', '').replaceAll('-', ' ')})
                        }else{
                            setError({...error, email: 'unknown error occured, please try again later'})
                        }
                        setLoading(false)
                    })
                }
            }else{
                setError({...error, password: 'Password Mismatch'})
                setLoading(false)
            }
        }else{
            const auth = getAuth()
            signInWithEmailAndPassword(auth, form.email, form.password).then(e=>{
                setDoc(doc(db, 'users', e.user.uid), {}).then(()=>{
                    setData({
                        email: form.email,
                        uid: e.user.uid
                    })
                    history.push(`/dashboard/${company.journals}`)
                }).catch(err=>{
                    setError({...error, email: JSON.parse(JSON.stringify(err)).code.replaceAll('auth/', '').replaceAll('-', ' ')})
                    setLoading(false)
                })
            }).catch(err=>{
                if(Object.keys(JSON.parse(JSON.stringify(err))).length !== 0){
                    setError({...error, email: JSON.parse(JSON.stringify(err)).code.replaceAll('auth/', '').replaceAll('-', ' ')})
                }else{
                    setError({...error, email: 'unknown error occured, please try again later'})
                }
                setLoading(false)
            })
        }
    }

    const onsocial = () => {
        setLoading(true)
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider).then(e => {
            setDoc(doc(db, 'users', e.user.uid), {}).then(()=>{
                setData({
                    email: e.user.email,
                    uid: e.user.uid
                })
                history.push(`/dashboard/${company.journals}`)
            }).catch(err=>{
                setError({...error, email: JSON.parse(JSON.stringify(err)).code.replaceAll('auth/', '').replaceAll('-', ' ')})
                setLoading(false)
            })
          }).catch((error) => {
            setError({...error, email: error.message})
            setLoading(false)
        })
    }
    

    const onenter = (e) => {
        if(e.key === 'Enter'){
            onsubmit()
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
                        <h1>Uplyft</h1>
                        <p>sign up to continue</p>
                    </div>
                    <div className={styles.social}>
                    <GoogleLogin
                        clientId="549639525326-vmcir7a4lr9dd9vna0b399p59ddbt6u5.apps.googleusercontent.com"
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
                        <InputBox onKeyDown={(e)=>onenter(e)} error={error.email} id='authEmail' marginBottom={28} wrapper='authWrapper' name="Email" type="text" />
                        <InputBox onKeyDown={(e)=>onenter(e)} id='authPassword' error={error.password} marginBottom={28} wrapper='authWrapper' name="Password" type="password" />
                        {type==='signup'?<InputBox onKeyDown={(e)=>onenter(e)} error={error.password} id='authConfirmPassword' marginBottom={40} wrapper='authWrapper' name="Confirm Password" type="password" />:null}
                        <button onMouseDown={onsubmit}>Continue</button>
                    </div>
                    {type==='signup'?
                        <div className={styles.signin}>
                            <p>Already have an account?</p>
                            <Link to={`/login`}>Sign In</Link>
                        </div>
                    :<div className={styles.signin}>
                        <p>Don't have an account?</p>
                        <Link to={`/signup`}>Create Account</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Auth
