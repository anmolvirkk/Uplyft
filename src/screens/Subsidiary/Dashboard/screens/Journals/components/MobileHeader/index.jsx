import React from 'react'
import styles from './_mobileHeader.module.sass'
import {MoreVertical, Plus} from 'react-feather'

const MobileHeader = () => {
    return (
        <div className={styles.header}>
            <p>Spirit</p>
            <div className={styles.options}>
                <Plus />
                <MoreVertical />
            </div>
        </div>
    )
}

export default MobileHeader
