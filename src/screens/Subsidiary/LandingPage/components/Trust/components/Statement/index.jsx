import React from 'react'
import { Star } from 'react-feather'
import styles from '../../_trust.module.sass'

const Statement = () => {
    return (
        <div className={styles.statement}>
            <h3>Trusted and loved by 150K+ users worldwide</h3>
            <ul className={styles.metrics}>
                <li>
                    <h6>5.0</h6>
                    <div className={styles.stars}>
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                        <Star />
                    </div>
                    <p>10K+ Ratings</p>
                </li>
                <li>
                    <h6>150K+</h6>
                    <p>Active Users</p>
                </li>
                <li>
                    <h6>30K+</h6>
                    <p>Premium Users</p>
                </li>
            </ul>
        </div>
    )
}

export default Statement
