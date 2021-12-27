import React from 'react'
import { HelpCircle } from 'react-feather'
import company from '../../../../../company'
import styles from './_footer.module.sass'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.card}>
                <img loading='lazy' decoding='async' src = '/logos/subsidiary.png' alt = {company.subsidiary} />
                <h3>Become the best you can be</h3>
                <p>Get started with Uplyft to Uplyft</p>
                <button>Try for free</button>
            </div>
            <div className={styles.bottom}>
                <div className={styles.nav}>
                    <img loading='lazy' decoding='async' src = "/logos/main.png" alt = {company.main} />
                    <div>About Skyhance</div>
                    <div>Skyhance Products</div>
                    <div>Privacy</div>
                </div>
                <div className={styles.nav}>
                    <div><HelpCircle /><p>Help</p></div>
                    <div>Choose a language</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
