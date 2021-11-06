import React, {useState} from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'

import { Check } from 'react-feather'

const CheckBtn = ({times}) => {

    const [checked, setChecked] = useState(false)

    const [timesCompleted, setTimesCompleted] = useState(0)

    const onClick = (e) => {
        if(timesCompleted === times-1){
            if(checked===false){
                confetti({
                    particleCount: 150,
                    spread: 60,
                    origin: {
                        x: e.clientX/window.innerWidth,
                        y: e.clientY/window.innerHeight
                    }
                })
                setChecked(true)
            }else{
                setChecked(false)
                setTimesCompleted(0)
            }
        }else{
            setTimesCompleted(timesCompleted+1)
        }
    }

    return (
        <div className={`${styles.checkBtn} ${checked?styles.activeCheck:null}`} onMouseDown={(e)=>onClick(e)}>
            <div className={styles.progress} style={{width: `${timesCompleted/times*100}%`}} />
            {checked?<Check />:<div className={styles.timesIndicator}>{timesCompleted}/{times}</div>}
        </div>
    )
}

export default CheckBtn
