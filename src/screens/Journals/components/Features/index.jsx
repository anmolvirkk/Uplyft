import React from 'react'
import { Lock, Smile, Sun } from 'react-feather'
import styles from './_features.module.sass'

const Features = () => {
    const Feature = ({icon, title, text}) => {
        return (
            <div className={styles.feature}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.content}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.features}>
            <h2>Journaling is a powerful tool for mindfulness</h2>
            <p>Spirit will help you to be more mindful and grateful by journaling about your day, thoughts, feelings or experiences.</p>
            <div className={styles.features}>
                <Feature icon={<Lock />} title="100% Private, Secure and Encrypted" text="Journal with no fear of judgement or being judged from others reading it because your journal is secure and encrypted such that only you have access to it." />
                <Feature icon={<Smile />} title="Stress-free journaling experience" text="Free from ads, distractions or pressure of being perfect, Spirit will help you be as calm as possible by making space for your feelings in the moment." />
                <Feature icon={<Sun />} title="Increase Positive Energy" text="Spirit is a safe space to explore, grow and find peace in the comfort of your own thoughts." />
                <Feature icon={<Sun />} title="Build Healthy Thinking" text="Journaling is proven to help reduce stress, anxiety and depression." />
                <Feature icon={<Sun />} title="Unparalleled Organization" text="You'll have everything organized in one place so that when you're ready to write, there's no need to hunt around for what comes next on your list of things to do or say." />
                <Feature icon={<Sun />} title="Daily Mindfulness Practice" text="Every day you'll receive an email or notification to take some time for yourself so that you can reflect on the things that are going well in your life today." />
                <Feature icon={<Sun />} title="Beautiful design" text="We have created an elegant interface with the best UX in the industry so it's easy to use even if you are not tech savvy!" />
                <Feature icon={<Sun />} title="Customizable" text="Choose from a plethora of icons and colors to create a completely personalized experience that is perfect for you!" />
            </div>
        </div>
    )
}

export default Features