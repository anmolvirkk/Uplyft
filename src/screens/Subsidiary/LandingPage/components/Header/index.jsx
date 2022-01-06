import React from 'react'
import styles from './_header.module.sass'
import company from '../../../../../company'
import { Link } from 'react-router-dom'

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
                <Link className={styles.login} to={`/${company.subsidiary}/login`}>Login</Link>
                <Link className={styles.ctaBtn} to={`/${company.subsidiary}/signup`}>Sign Up</Link>
            </div>
        </div>
    )
}

export default Header
