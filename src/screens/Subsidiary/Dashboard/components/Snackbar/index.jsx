import React from 'react'
import styles from './_snackbar.module.sass'
import {X} from 'react-feather'
import checkData from '../Modal/check.json'
import Lottie from 'react-lottie-player'
import { useRecoilState } from 'recoil'
import snacksAtom from './snacksAtom'
import { useEffect } from 'react'
import { useRef } from 'react'

const Snack = React.memo(({text, item, snacks, setSnacks, animate}) => {
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
                    play={animate}
                    goTo={animate?null:120}
                    loop={false}
                    animationData={checkData}
                    style={{ width: 50, height: 50 }}
                />
                <p>{text}</p>
            </div>
            <X className={styles.close} onMouseDown={removeSnack} />
        </div>
    )
})

const Snackbar = React.memo(() => {

    const [snacks, setSnacks] = useRecoilState(snacksAtom)

    const timeout = useRef(null)
    
    useEffect(()=>{
        clearTimeout(timeout.current)
        timeout.current = setTimeout(()=>{
            if(document.getElementsByClassName(styles.snack)[0]){
                document.getElementsByClassName(styles.snack)[0].style.opacity = 0
                setTimeout(()=>{
                    let newSnacks = [...snacks.filter((x,i)=>i!==0)]
                    newSnacks = newSnacks.map((item)=>{
                        let newItem = {...item}
                        newItem.animate = false
                        return newItem
                    })
                    setSnacks([...newSnacks])
                }, 200)
            }else{
                clearTimeout(timeout.current)
            }
        }, 3000)
    }, [snacks, setSnacks])

    const Container = React.memo(() => {
        const [snacks] = useRecoilState(snacksAtom)
        return (
            <div className={styles.wrapper} style={{maxHeight: window.innerHeight-80+'px'}}>
                {snacks.map((item, i)=><Snack key={i} text={item.text} item={i} snacks={snacks} setSnacks={setSnacks} animate={item.animate} />)}
            </div>
        )
    })

    return (
        <div>
            <Container />
        </div>
    )
})

export default Snackbar