import React from 'react'
import styles from './_snackbar.module.sass'
import {X} from 'react-feather'
import checkData from '../Modal/check.json'
import Lottie from 'react-lottie-player'
import { useRecoilState } from 'recoil'
import snacksAtom from './snacksAtom'
import { useEffect } from 'react'
import { useRef } from 'react'

const Snack = ({text, item}) => {
    const [snacks, setSnacks] = useRecoilState(snacksAtom)
    const removeSnack = () => {
        let newSnacks = snacks.map((x,i)=>{
            if(i!==item){
                return x
            }else{
                return null
            }
        })
        setSnacks([...newSnacks.filter(i=>i!==null)])
    }
    return (
        <div className={styles.snack}>
            <div className={styles.title}>
                <Lottie
                    play
                    loop={false}
                    animationData={checkData}
                    style={{ width: 50, height: 50 }}
                />
                <p>{text}</p>
            </div>
            <X className={styles.close} onMouseDown={removeSnack} />
        </div>
    )
}

const Snackbar = () => {

    const [snacks, setSnacks] = useRecoilState(snacksAtom)

    let timeout = useRef(null)
    
    useEffect(()=>{
        if(document.getElementById('mainSideBar')){
            document.getElementById('mainSideBar').onmousedown = () => setSnacks([...snacks, 0])
        }
        clearTimeout(timeout.current)
        timeout.current = setTimeout(()=>{
            if(document.getElementsByClassName(styles.snack)[0]){
                document.getElementsByClassName(styles.snack)[0].style.opacity = 0
                setTimeout(()=>{
                    setSnacks([...snacks.filter((x,i)=>i!==0)])
                }, 200)
            }else{
                clearTimeout(timeout.current)
            }
        }, 3000)
    }, [snacks, setSnacks])

    const Container = () => {
        const [snacks] = useRecoilState(snacksAtom)
        return (
            <div className={styles.wrapper} style={{maxHeight: window.innerHeight-80+'px'}}>
                {snacks.map((item, i)=><Snack key={i} text={item} item={i} />)}
            </div>
        )
    }

    return (
        <div>
            <Container />
        </div>
    )
}

export default Snackbar