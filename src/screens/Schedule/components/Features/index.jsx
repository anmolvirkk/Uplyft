import React from 'react'
import styles from './_features.module.sass'
import Lottie from 'react-lottie-player'
import schedule from '../../../../lottie/schedule.json'
import organize from '../../../../lottie/organize.json'
import management from '../../../../lottie/management.json'

const SubHero = ({title, lottie, items}) => {
    const Feature = ({title, text}) => {
        return (
            <div className={styles.feature}>
                <div className={styles.content}>
                    {title?<h3>{title}</h3>:null}
                    <p>{text}</p>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.subhero}>
            <div className={styles.content}>
                <h2>{title}</h2>
                {items.map((item)=>{
                    return (
                        <Feature {...item} />
                    )
                })}
            </div>
            <Lottie
                play
                loop
                animationData={lottie}
                style={{ minWidth: '45vw', width: '45vw' }}
            />
        </div>
    )
}

const Features = () => {
    return (
        <div className={styles.features}>
            <SubHero title="The only productivity tool you'll ever need" lottie={schedule} items={[
                { 
                    title: 'Simplify Your Day with One Platform',
                    text:"Managing multiple calendars and tasks on a daily basis is a struggle. This is where an effective productivity tool can really help take some of the load off."
                },
                {
                    title: 'Custom Categories',
                    text: "Create categories to customize what exactly you're managing, such as Work, Personal or Life Goals."
                },
                {
                    title: 'Prioritize your tasks, events and habits',
                    text: "It can be easy to lose sight of what's important, but if you have a way to easily prioritize your tasks, projects and events you'll make sure nothing slips through the cracks."
                }]} />
            <SubHero title="Control's simple design allows you to stay on top of your day-to-day life" lottie={organize} items={[
                { 
                    title: 'Clean and Intuitive Interface',
                    text:"Control's clean and intuitive interface allows you to easily track your tasks, habits, and events, while always keeping an eye on upcoming deadlines. Instead of juggling multiple apps to stay organized, Control puts everything you need in one place."
                },
                {
                    title: 'Manage your life with ease',
                    text: "Keep track of everything with a simple interface. Control helps you stay organized, from tracking events to building habits."
                }]} />
            <SubHero title="Safe, simple and beautiful way to manage your time" lottie={management} items={[
                { 
                    title: 'Unified solution for tracking what matters',
                    text:"With any kind of personal management, it's important to know where you're at with everything. That's why we made Control — a unified solution for tracking what matters to you throughout your life."
                },
                {
                    title: 'Become more productive',
                    text: "With Control, you can easily manage and organize anything. This will help you become more productive, stay on top of your workload, and reach your goals with ease."
                }]} />
        </div>
    )
}

export default Features