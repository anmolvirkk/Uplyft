import React from 'react'
import styles from './_hero.module.sass'
import company from '../../../../../company'

const Hero = () => {
    const toolContents = {
        journals: {
            subheading: 'Your private, 100% customizable online journal.',
            colors: {
                primary: '#FF00A1',
                secondary: '#FF66C4'
            }
        },
        schedule: {
            subheading: 'Safely backed up schedule helping you track your habits, tasks and events.',
            colors: {
                primary: '#0065FE',
                secondary: '#38B6FF'
            }
        },
        notes: {
            subheading: 'Capture and arrange your ideas to remember everything.',
            colors: {
                primary: '#3A1582',
                secondary: '#A400FE'
            }
        },
        finances: {
            subheading: 'Budget tracking, Smart Investing, Future Planning, Tax Saving, and more',
            colors: {
                primary: '#FE3200',
                secondary: '#FF914D'
            }
        },
        fitness: {
            subheading: 'Track calories, log workouts, create custom routines and diet plans.',
            colors: {
                primary: '#FFE500',
                secondary: '#42D104'
            }
        }
    }
    const Tool = ({type}) => {
        return (
            <div className={styles.toolContent}>
                <img loading='lazy' decoding='async' src = {`/logos/${type}.png`} alt={company[type]} className={styles.icon} />
                <img loading='lazy' decoding='async' className={styles.subLogo} src = {`/logos/${type}Text.png`} alt={company[type]} />
                <h3>{toolContents[type].subheading}</h3>
            </div>
        )
    }
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                <img loading='lazy' decoding='async' className={styles.mainLogo} src="/logos/subsidiaryText.png" alt={company.subsidiary} />
                <h1>The ultimate toolkit to manage your life</h1>
                <button className={styles.cta}>Try for free</button>
            </div>
            <div className={styles.tools}>
                    <Tool type="journals" />
                    <Tool type="schedule" />
                    <Tool type="notes" />
                    <Tool type="finances" />
                    <Tool type="fitness" />
            </div>
        </div>
    )
}

export default Hero
