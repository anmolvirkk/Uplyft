import React from 'react'
import styles from './_header.module.sass'
import company from '../../../../../company'

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.navigation}>
                <div className={styles.logo}>
                    <img loading='lazy' decoding='async' src="/logos/mainText.png" alt={company.main} />
                </div>
                <div className={styles.navigation}>
                    <div className={styles.navItem}>Products</div>
                    <div className={styles.navItem}>Pricing</div>
                    <div className={styles.navItem}>Resources</div>
                </div>
            </div>
            <div className={styles.cta}>
                <div className={styles.login}>
                    <div className={styles.loginTextContainer}>
                        <p>Login</p>
                    </div>
                </div>
                <div className={styles.ctaBtn}>Try for free</div>
            </div>
        </div>
    )
}

export default Header
