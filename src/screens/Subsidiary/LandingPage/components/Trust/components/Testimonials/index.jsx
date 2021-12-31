import React from 'react'
import { Star } from 'react-feather'
import styles from '../../_trust.module.sass'

const reviews = [
    {
        img: '',
        user: 'x',
        description: 'It is a next level platform for personal growth, me being a personal growth enthusiast and advocate. I feel there is nothing better than healing, doing the inner work and moving ahead with love and compassion. This platform feels all about it 💞'
    },
    {
        img: '',
        user: 'x',
        description: 'LOVE this app. Visually, it is so appealing that I really enjoy using it and it makes me want to complete my habits. It is also super simple, which is great because lots of bells and whistles can overwhelm me. I really like how the pro version has unlimited storage and multiple device access.'
    },
    {
        img: '',
        user: 'x',
        description: 'helped me deal with feelings of depression and brought up healthy habits I had before and even ones I didnt :)'
    },
    {
        img: '',
        user: 'x',
        description: 'It is very user-friendly, and the bright colors make it fun and motivating! Also, I love how it shows what you have accomplished that day; it leaves you feeling very productive. A huge Thank you to Uplyft, and Skyhance!'
    },
    {
        img: '',
        user: 'x',
        description: 'I think this app is great. It reminds me of stuff to do thats important for my health, ever since I started to use this ive been doing better for my day to day life.'
    },
    {
        img: '',
        user: 'x',
        description: 'Amazing App with Great Design and really love the Simplicity.'
    },
    {
        img: '',
        user: 'x',
        description: `Long time Evernote user here, and I think I finally found "the one" to replace EN. The design and options available are just amazing, I'm thinking what I'm missing, and I can't find anything, yet.`
    },
    {
        img: '',
        user: 'x',
        description: 'Best app I have ever used, when it comes to productivity, privacy and simplicity. Highly recommended'
    },
    {
        img: '',
        user: 'x',
        description: `Just found out this app, I am very happy. Even though I don't have the budget for premium, the app itself is Gold already. Please make it stay the gorgeous app it is even in the future pls don't make it locked out for non premium users.`
    },
    {
        img: '',
        user: 'x',
        description: 'From a person that adores clean aesthetics, a good feature set and above all Privacy and total control over our own data. This app literally checks all the boxes. Kudos to the devs'
    },
    {
        img: '',
        user: 'x',
        description: 'Simple, secure and easy to use , on the go... with perfect syncing options. No ads and a sleek and neat design with no distractions. What else do you need!'
    },
    {
        img: '',
        user: 'x',
        description: 'Really pretty and has a much more intuitive layout compared to Notion and One Note. Overall, it is functional and minimalistic'
    },
    {
        img: '',
        user: 'x',
        description: 'This is the very essence of positive reinforcement'
    },
    {
        img: '',
        user: 'x',
        description: 'Best way to be organized. I love this app, this app helps me keep track with my busy schedule and have some fun aswell.'
    },
    {
        img: '',
        user: 'x',
        description: 'Only a.couple days in and my life has improved and me and my friends hold each other accountable. This app is awesome.'
    },
    {
        img: '',
        user: 'x',
        description: `So, this app is absolutely awesome. I just love it, and it's really given me the motivation to get myself organised and hold myself accountable. I love this app and this is the ONLY app I'm seriously considering money on.`
    },
    {
        img: '',
        user: 'x',
        description: `This website has become one of my best tools for holding myself accountable. It actually makes daily tasks, todo lists, and even habits, fun to track and accomplish. The tracking system, allows me and my kids to enjoy seeing our work on tasks produce some results.`
    },
    {
        img: '',
        user: 'x',
        description: `I use this app to help me stay organized with ADHD and really it's worked brilliantly. I've been using it for two months now and bought the premium (I rarely buy apps) because it's been so worthwhile.`
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    },
    {
        img: '',
        user: 'x',
        description: 'x'
    }
]

const Testimonials = () => {
    return (
        <div className={styles.testimonials}>
            <div className={styles.reviews}>
                {reviews.map((item, i)=>{
                    return(
                        <div key={i} className={styles.card}>
                            <div className={styles.header}>
                                <img src='/decor/trust/users/1.jpg' alt='' />
                                <div className={styles.info}>
                                    <div className={styles.stars}>
                                        <Star />
                                        <Star />
                                        <Star />
                                        <Star />
                                        <Star />
                                    </div>
                                    <h6>{item.user}</h6>
                                </div>
                            </div>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Testimonials
