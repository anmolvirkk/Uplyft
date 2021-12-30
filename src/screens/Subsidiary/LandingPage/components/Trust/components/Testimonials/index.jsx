import React from 'react'
import { Star } from 'react-feather'
import styles from '../../_trust.module.sass'

const reviews = [
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    },
    {
        user: 'x',
        title: 'x',
        description: 'x'
    }
]

const Testimonials = () => {
    return (
        <div className={styles.testimonials}>
            <div className={styles.title}>
                <h2>Ratings and Reviews</h2>
                <div className={styles.metric}>
                    <p><span>5</span> out of 5</p>
                    <p>70K+ ratings</p>
                </div>
            </div>
            <div className={styles.reviews}>
                {reviews.map((item, i)=>{
                    return(
                        <div key={i} className={styles.card}>
                            <div className={styles.stars}>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                            <h6>{item.user}</h6>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Testimonials
