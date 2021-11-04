import React from 'react'
import styles from './_habitDetails.module.sass'

import {useRecoilState} from 'recoil' 
import habitsAtom from '../../../../../recoil-atoms/habitsAtom'

const HabitDetails = () => {

    const [habits] = useRecoilState(habitsAtom)

    return (
        <div className={styles.habitDetails}>
        </div>
    )
}

export default HabitDetails
