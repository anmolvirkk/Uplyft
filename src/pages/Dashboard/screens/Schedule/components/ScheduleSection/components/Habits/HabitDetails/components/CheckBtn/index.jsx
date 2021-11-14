import React, {useEffect} from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'

import { Check } from 'react-feather'

import habitsAtom from '../../../../../../../recoil-atoms/habitsAtom'
import { useRecoilState } from 'recoil'

const CheckBtn = ({times, id, timesCompleted, datesCompleted}) => {

    const [habits, setHabits] = useRecoilState(habitsAtom)

    let date = new Date()
    
    const resetCheck = () => {
        const resetTimes = () => {
            let newHabits = habits.map((data)=>{
                let newData = {...data}
                if(data.id === id){
                    newData.timesCompleted = 0
                }
                return newData
            })
            setHabits([...newHabits])
        }
        if(datesCompleted.length > 0){
            if(new Date(datesCompleted[datesCompleted.length-1].val).toDateString() !== date.toDateString()){
                resetTimes()
            }
        }
    }

    useEffect(()=>{
        resetCheck()
    })

    const onClick = (e) => {
                if(timesCompleted < times){

                    if(timesCompleted === times-1){
                        let newHabits = habits.map((data)=>{
                            let newData = {...data}
                                if(data.id === id) {
                                    let dateObj = {
                                        string: date.toDateString(),
                                        val: date.valueOf(),
                                        parse: Date.parse(date)
                                    }
                                    newData.timesCompleted = timesCompleted+1
                                    if(newData.datesCompleted.length > 0){
                                        if(newData.datesCompleted[newData.datesCompleted.length - 1].string !== dateObj.string){
                                            newData.datesCompleted = [...newData.datesCompleted, dateObj]
                                            confetti({
                                                particleCount: 150,
                                                spread: 60,
                                                origin: {
                                                    x: e.clientX/window.innerWidth,
                                                    y: e.clientY/window.innerHeight
                                                }
                                            })
                                        }
                                    }else{
                                        newData.datesCompleted = [...newData.datesCompleted, dateObj]
                                        confetti({
                                            particleCount: 150,
                                            spread: 60,
                                            origin: {
                                                x: e.clientX/window.innerWidth,
                                                y: e.clientY/window.innerHeight
                                            }
                                        })
                                    }
                                }
                            return newData
                        })
                        setHabits([...newHabits])
                    }else{
                        let newHabits = habits.map((data)=>{
                            let newData = {...data}
                                if(data.id === id) {
                                    newData.timesCompleted = timesCompleted+1
                                }
                            return newData
                        })
                        setHabits([...newHabits])
                    }
        
                }else {
                    
                    let newHabits = habits.map((data)=>{
                        let newData = {...data}
                            if(data.id === id) {
                                if(newData.datesCompleted.length > 1){
                                    newData.datesCompleted = newData.datesCompleted.filter(date=>date===newData.datesCompleted[newData.datesCompleted.length-1])
                                }else{
                                    newData.datesCompleted = []
                                }
                                newData.timesCompleted = 0
                            }
                        return newData
                    })
                    setHabits([...newHabits])
                }
    }

    return (
        <div className={`${styles.checkBtn} ${timesCompleted>=times?styles.activeCheck:null}`} onMouseDown={(e)=>onClick(e)}>
            <div className={styles.progress} style={{width: `${timesCompleted/times*100}%`}} />
            {timesCompleted>=times?<Check />:<div className={styles.timesIndicator}>{timesCompleted}/{times}</div>}
        </div>
    )
}

export default CheckBtn
