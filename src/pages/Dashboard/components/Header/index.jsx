import React from 'react'
import styles from './_header.module.sass'

const Header = ({type, edited}) => {
    switch (type) {
        case 'editor':
            return <header>
                        <p className={styles.date}>Last edited on {edited}</p>
                    </header>
        default:
            return <header></header>
    }
}

export default Header