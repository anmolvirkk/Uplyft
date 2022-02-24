import React from 'react'
import styles from './_features.module.sass'
import Lottie from 'react-lottie-player'
import meditate from '../../../../lottie/meditate.json'
import webdesign from '../../../../lottie/webdesign.json'
import design from '../../../../lottie/design.json'

const Features = () => {
    const Feature = ({title, text}) => {
        return (
            <div className={styles.feature}>
                <div className={styles.content}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
    const SubHero = ({title, lottie, items}) => {
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
                    style={{ minWidth: 500 }}
                />
            </div>
        )
    }
    return (
        <div className={styles.features}>
            <SubHero title="Journaling is a powerful tool for mindfulness" lottie={meditate} items={[{ title:"Stress-free journaling experience", text:"Free from ads, distractions or pressure of being perfect, Spirit will help you be as calm as possible by making space for your feelings in the moment."}, {title:"Build Healthy Thinking", text:"Journaling is proven to help reduce stress, anxiety and depression."}, {title:"Increase Positive Energy", text:"Spirit is a safe space to explore, grow and find peace in the comfort of your own thoughts."}]} />
            <SubHero title="All you need is your thoughts, and we'll do the rest" lottie={webdesign} items={[{title:"100% Private, Secure and Encrypted", text:"Journal with no fear of judgement or being judged from others reading it because your journal is secure and encrypted such that only you have access to it." }, {title:"Unparalleled Organization", text:"You'll have everything organized in one place so that when you're ready to write, there's no need to hunt around for what comes next on your list of things to do or say."}, {title:"Daily Mindfulness Practice", text:"Every day you'll receive an email or notification to take some time for yourself so that you can reflect on the things that are going well in your life today."}]} />
            <SubHero title="Create your own personalized sanctuary" lottie={design} items={[{title:"Beautiful design", text:"We have created an elegant interface with the best UX in the industry so it's easy to use even if you are not tech savvy!"}, { title:"Customizable", text:"Choose from a plethora of icons and colors to create a completely personalized experience that is perfect for you!"}]} />
        </div>
    )
}

export default Features