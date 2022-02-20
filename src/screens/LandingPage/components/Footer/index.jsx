import React from 'react'
import company from '../../../../company'
import styles from './_footer.module.sass'
import CTA from '../CTA'

const Footer = ({type}) => {
    return (
        <div className={styles.footer}>
            <div className={styles.card}>
                <img loading='lazy' decoding='async' src = '/logos/subsidiary.png' alt = {company.subsidiary} />
                <h3>Become the best you can be</h3>
                <p>Get started with Uplyft to uplift yourself</p>
                <CTA type={type} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.nav}>
                    <img loading='lazy' decoding='async' src = "/logos/main.png" alt = {company.main} />
                </div>
            </div>
        </div>
    )
}

export default Footer
