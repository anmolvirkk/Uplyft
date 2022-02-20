import React from 'react'
import styles from './_header.module.sass'
import company from '../../../../company'
import { Link } from 'react-router-dom'
import {LogIn, UserPlus} from 'react-feather'

const Header = ({type}) => {
    const isMobile = window.innerWidth < 640
    return (
        <div className={styles.header}>
            <div className={styles.navigation}>
                <Link className={styles.ctaBtn} to={`/`}>
                    <div className={styles.logo}>
                        <img loading='lazy' decoding='async' src="/logos/mainText.png" alt={company.main} />
                    </div>
                </Link>
            </div>
            {isMobile?
            <div className={styles.mobileCta}>
                {type==='pricing'?<Link className={styles.loginBtn} to={`/login`}><LogIn /></Link>:<Link className={styles.ctaBtn} to={`/pricing`}><UserPlus /></Link>}
            </div>
            :
            <div className={styles.cta}>
                {type==='pricing'?<Link className={styles.loginBtn} to={`/login`}>Login</Link>:<Link className={styles.ctaBtn} to={`/pricing`}>Get Started</Link>}
            </div>}
        </div>
    )
}

export default Header
