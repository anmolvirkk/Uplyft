import React from 'react'
import { Edit2 } from 'react-feather'
import styles from './_features.module.sass'
import company from '../../../../../company'

const features = {
    journals: [
        {
            title: '',
            description: '',
            icon: <Edit2 />,
            img: 'journals.png'
        }
    ],
    schedule: [
        {
            title: '',
            description: '',
            icon: <Edit2 />,
            img: ''
        }
    ],
    notes: [
        {
            title: '',
            description: '',
            icon: <Edit2 />,
            img: ''
        }
    ],
    finances: [
        {
            title: '',
            description: '',
            icon: <Edit2 />,
            img: ''
        }
    ],
    fitness: [
        {
            title: '',
            description: '',
            icon: <Edit2 />,
            img: ''
        }
    ]
}

const Features = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icons}>
                <img src='/logos/journals.png' alt={company.journals} />
                <img src='/logos/schedule.png' alt={company.schedule} />
                <img src='/logos/notes.png' alt={company.notes} />
                <img src='/logos/finances.png' alt={company.finances} />
                <img src='/logos/fitness.png' alt={company.fitness} />
            </div>
            <div className={styles.features}>
                {features.journals.map((item)=>{
                    return (
                        <div className={styles.feature}>
                            <div className={styles.title}>
                                {item.icon}
                                <h3>{item.title}</h3>
                            </div>
                            <p className={styles.description}>{item.description}</p>
                        </div>
                    )
                })}
            </div>
            <div className={styles.content}>
                <img src={`/screens/${features.journals[0].img}`} alt='' />
            </div>
        </div>
    )
}

export default Features