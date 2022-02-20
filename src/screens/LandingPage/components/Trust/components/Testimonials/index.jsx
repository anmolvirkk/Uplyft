import React from 'react'
import { Star } from 'react-feather'
import styles from '../../_trust.module.sass'

const reviews = [
    {
        user: 'Emilia',
        description: 'It is a next level platform for personal growth, me being a personal growth enthusiast and advocate. I feel there is nothing better than healing, doing the inner work and moving ahead with love and compassion. This platform feels all about it 💞'
    },
    {
        user: 'Ruby',
        description: 'helped me deal with feelings of depression and brought up healthy habits I had before and even ones I didnt :)'
    },
    {
        user: 'Elliott',
        description: 'It is very user-friendly, and the bright colors make it fun and motivating! Also, I love how it shows what you have accomplished that day; it leaves you feeling very productive. A huge Thank you to Uplyft, and Skyhance!'
    },
    {
        user: 'Ileana',
        description: 'I think this platform is great. It reminds me of stuff to do thats important for my health, ever since I started to use this ive been doing better for my day to day life.'
    },
    {
        user: 'Alexis',
        description: 'Amazing platform with Great Design and really love the Simplicity.'
    },
    {
        user: 'Nikita',
        description: `Long time Evernote user here, and I think I finally found "the one" to replace EN. The design and options available are just amazing, I'm thinking what I'm missing, and I can't find anything, yet.`
    },
    {
        user: 'Rachelle',
        description: 'Best platform I have ever used, when it comes to productivity, privacy and simplicity. Highly recommended'
    },
    {
        user: 'Lindsey',
        description: 'From a person that adores clean aesthetics, a good feature set and above all Privacy and total control over our own data. This platform literally checks all the boxes. Kudos to the devs'
    },
    {
        user: 'Irene',
        description: 'Simple, secure and easy to use , on the go... with perfect syncing options. No ads and a sleek and neat design with no distractions. What else do you need!'
    },
    {
        user: 'Denise',
        description: 'Really pretty and has a much more intuitive layout compared to Notion and One Note. Overall, it is functional and minimalistic'
    },
    {
        user: 'Gwen',
        description: 'This is the very essence of positive reinforcement'
    },
    {
        user: 'Luke',
        description: 'Best way to be organized. I love this platform, this platform helps me keep track with my busy schedule and have some fun aswell.'
    },
    {
        user: 'Judith',
        description: 'Only a.couple days in and my life has improved and me and my friends hold each other accountable. This platform is awesome.'
    },
    {
        user: 'Mark',
        description: `I use this platform to help me stay organized with ADHD and really it's worked brilliantly. I've been using it for two months now and bought the premium (I rarely buy apps) because it's been so worthwhile.`
    },
    {
        user: 'Alexandra',
        description: 'I love this platform so much! It help me with anxiety and never fails to make me feel better, this platform has been a lifesaver and I am thankful to have found it! My gratitude to whoever made this.'
    },
    {
        user: 'Sophie',
        description: 'Absolutely love it! The platform is constantly evolving and they are adding new features. Its great to see the evolution.'
    }
]

const Testimonials = () => {
    return (
        <div className={styles.testimonials}>
            <div className={styles.reviews}>
                {reviews.map((item, i)=>{
                    return(
                        <div key={i} className={styles.card}>
                            <p>{item.description}</p>
                            <div className={styles.user}>
                                <img src={`/decor/trust/users/${i}.png`} alt='' />
                                <div className={styles.content}>
                                    <h6>{item.user}</h6>
                                    <div className={styles.stars}>
                                        <Star />
                                        <Star />
                                        <Star />
                                        <Star />
                                        <Star />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Testimonials
