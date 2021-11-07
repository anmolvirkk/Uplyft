import React from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'

import { Check } from 'react-feather'

import habitsAtom from '../../../../../../../recoil-atoms/habitsAtom'
import { useRecoilState } from 'recoil'

const CheckBtn = ({times, id, timesCompleted}) => {

    const [habits, setHabits] = useRecoilState(habitsAtom)

    const onClick = (e) => {
        if(timesCompleted < times){

            if(timesCompleted === times-1){
                confetti({
                    particleCount: 150,
                    spread: 60,
                    origin: {
                        x: e.clientX/window.innerWidth,
                        y: e.clientY/window.innerHeight
                    }
                })
                let date = new Date()
                let newHabits = habits.map((data)=>{
                    let newData = {...data}
                        if(data.id === id) {
                            newData.datesCompleted = [...newData.datesCompleted, date]
                            newData.timesCompleted = timesCompleted+1
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
