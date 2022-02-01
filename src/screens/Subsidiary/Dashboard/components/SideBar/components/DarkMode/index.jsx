import React from 'react'
import styles from '../../_sidebar.module.sass'
import { Moon, Sun } from 'react-feather'

import {useRecoilState} from 'recoil'
import {darkModeAtom} from '../../../../allAtoms'

const DarkMode = () => {

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)

    const darkModeToggle = () => {
        setDarkMode(!darkMode)
    }

    return (
        <button className={styles.iconButton} onClick={darkModeToggle}>
            {darkMode ? <Sun /> : <Moon />}
            <p>{darkMode ? 'Light' : 'Dark'}</p>
        </button>
    )
}

export default DarkMode
