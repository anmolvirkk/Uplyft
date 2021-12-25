import React from 'react'
import styles from './_header.module.sass'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.navigation}>
                <div className={styles.logo}>
                    <img src="/logos/mainText.png" alt='skyhance' />
                    <hr />
                    <img src="/logos/subsidiaryText.png" alt='uplyft' />
                </div>
                <div className={styles.navigation}>
                    <div className={styles.navItem}>Products</div>
                    <div className={styles.navItem}>Pricing</div>
                    <div className={styles.navItem}>Resources</div>
                </div>
            </div>
            <div className={styles.cta}>
                <div>Try for free</div>
            </div>
        </div>
    )
}

export default Header
