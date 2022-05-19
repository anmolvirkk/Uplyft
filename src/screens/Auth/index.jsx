import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import company from '../../company'
import styles from './_auth.module.sass'
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
                    <div onMouseDown={onsocial} className={styles.social}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                                </g>
                            </svg>
                            <span>Sign in with Google</span>
                        </button>
                    </div>
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
