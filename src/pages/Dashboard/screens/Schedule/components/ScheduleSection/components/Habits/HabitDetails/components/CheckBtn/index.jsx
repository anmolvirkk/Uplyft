import React, {useState, useCallback} from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'

import { Check } from 'react-feather'

const CheckBtn = () => {
    const [checked, setChecked] = useState(false)

    const onClick = (e) => {
        if(!checked){
            confetti({
                particleCount: 150,
                spread: 60,
                origin: {
                    x: e.clientX/window.innerWidth,
                    y: e.clientY/window.innerHeight
                }
            })
        }
        setChecked(!checked)
    }

    return (
        <div className={`${styles.checkBtn} ${checked?styles.activeCheck:null}`} onMouseDown={(e)=>onClick(e)}>
            <Check />
        </div>
    )
}

export default CheckBtn
