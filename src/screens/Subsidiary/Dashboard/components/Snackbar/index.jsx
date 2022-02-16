import React from 'react'
import styles from './_snackbar.module.sass'
import {X} from 'react-feather'
import checkData from '../Modal/check.json'
import loadData from '../../../loading.json'
import Lottie from 'react-lottie-player'
import { useRecoilState } from 'recoil'
import snacksAtom from './snacksAtom'
import { useEffect } from 'react'
import { useRef } from 'react'

const Snack = React.memo(({text, item, snacks, setSnacks, animate, icon}) => {
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
                    loop={icon==='load'?true:false}
                    animationData={icon==='load'?loadData:checkData}
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
                            if(newItem.icon === 'load'){
                                return null
                            }else{
                                return newItem
                            }
                        }).filter(i=>i!==null)
                        setSnacks([...newSnacks])
                    }, 200)
                }else{
                    clearTimeout(timeout.current)
                    timeout.current = null
                }
            }, 3000)
    }, [snacks, setSnacks])

    const Container = React.memo(() => {
        return (
            <div className={styles.wrapper} style={{maxHeight: window.innerHeight-80+'px'}}>
                {snacks?snacks.map((item, i)=><Snack key={i} text={item.text} icon={item.icon} item={i} snacks={snacks} setSnacks={setSnacks} animate={item.animate} />):null}
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