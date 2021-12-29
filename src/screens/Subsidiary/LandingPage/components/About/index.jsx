import React from 'react'
import company from '../../../../../company'
import styles from './_about.module.sass'

const collection = [
    {
        name: 'journals',
        about: 'Your private, 100% customizable online journal.'
    },
    {
        name: 'schedule',
        about: 'Safely backed up schedule helping you track your habits, tasks and events.'
    },
    {
        name: 'notes',
        about: 'Capture and arrange your ideas to remember everything.'
    },
    {
        name: 'finances',
        about: 'Budget tracking, Smart Investing, Future Planning, Tax Saving, and much more'
    },
    {
        name: 'fitness',
        about: 'Track calories, log workouts, create custom routines and diet plans.'
    },
]

const About = () => {
    return (
        <div className={styles.about}>
            <h2>The Collection</h2>
            <div className={styles.collection}>
                {collection.map((item, i)=>{
                    return (
                        <div key={i} className={styles.card}>
                            <img className={styles.background} src = {`/decor/card/${item.name}.jpg`} alt={company[item.name]} />
                            <div className={styles.content}>
                                <div className={styles.title}>
                                    <img src={`/logos/${item.name}.png`} alt={company[item.name]} className={styles.icon} />
                                    <img src={`/logos/${item.name}Text.png`} alt={company[item.name]} className={styles.iconText} />
                                </div>
                                <p>{item.about}</p>
                                <hr />
                                <button className={styles.cta}>Try for free</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default About
