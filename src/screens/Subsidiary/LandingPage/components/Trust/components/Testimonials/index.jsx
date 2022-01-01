import React from 'react'
import { Star } from 'react-feather'
import styles from '../../_trust.module.sass'

const reviews = [
    {
        user: 'Emilia',
        description: 'It is a next level platform for personal growth, me being a personal growth enthusiast and advocate. I feel there is nothing better than healing, doing the inner work and moving ahead with love and compassion. This platform feels all about it 💞'
    },
    {
        user: 'Regina',
        description: 'LOVE this platform. Visually, it is so appealing that I really enjoy using it and it makes me want to complete my habits. It is also super simple, which is great because lots of bells and whistles can overwhelm me. I really like how the pro version has unlimited storage and multiple device access.'
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
        user: 'Nikita',
        description: 'Amazing platform with Great Design and really love the Simplicity.'
    },
    {
        user: 'Alexis',
        description: `Long time Evernote user here, and I think I finally found "the one" to replace EN. The design and options available are just amazing, I'm thinking what I'm missing, and I can't find anything, yet.`
    },
    {
        user: 'Rachelle',
        description: 'Best platform I have ever used, when it comes to productivity, privacy and simplicity. Highly recommended'
    },
    {
        user: 'Jason',
        description: `Just found out this platform, I am very happy. Even though I don't have the budget for premium, the platform itself is Gold already. Please make it stay the gorgeous platform it is even in the future pls don't make it locked out for non premium users.`
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
        user: 'Monica',
        description: `So, this platform is absolutely awesome. I just love it, and it's really given me the motivation to get myself organised and hold myself accountable. I love this platform and this is the ONLY platform I'm seriously considering money on.`
    },
    {
        user: 'Portia',
        description: `This website has become one of my best tools for holding myself accountable. It actually makes daily tasks, todo lists, and even habits, fun to track and accomplish. The tracking system, allows me and my kids to enjoy seeing our work on tasks produce some results.`
    },
    {
        user: 'Mark',
        description: `I use this platform to help me stay organized with ADHD and really it's worked brilliantly. I've been using it for two months now and bought the premium (I rarely buy apps) because it's been so worthwhile.`
    },
    {
        user: 'Louis',
        description: 'This platform has helped me improve my lifestyle and improve my life. I try to eat on time every day, exercise, take vitamins, and do comprehensive hygiene/beauty. This is the first time I have truly achieved the goal of self-care, and most importantly, because of this application, my mental health, self-confidence and happiness are all very good. Thanks to the developers and everyone who participated in the application❤'
    },
    {
        user: 'Alexandra',
        description: 'I love this platform so much! It help me with anxiety and never fails to make me feel better, this platform has been a lifesaver and I am thankful to have found it! My gratitude to whoever made this.'
    },
    {
        user: 'Antony',
        description: 'This platform has allowed me to take a big leap into dealing with my depression. That is not all though it also offers help for many difficult emotions and even anxiety and as I said depression. It allows you to set goals and it allows you to choose what you need help with. It can help with so many things.'
    },
    {
        user: 'Aron',
        description: 'This platform is amazing, they really worked hard on it. This platform personalized my self care actvivtes and everything. It also has a calm aestetic. It is simple to work through and calming. I definitely suggest this platform for you.'
    },
    {
        user: 'Robert',
        description: 'this is the best free self care platform out there. i tried plenty other apps & this is the first one that actually makes me feel better. the visuals are calming plus the activities seem well planned out!'
    },
    {
        user: 'Lenard',
        description: `This is the best platform I have ever come across its really gives you the sense of being aware and makes you happier it's the best thing to rejuvenate and get back yourself in high life condition many thanks to the platform creater team`
    },
    {
        user: 'Clara',
        description: 'Love it love it love it!!! Thank you so much for the hardwork and love you guys put into the platform!!! This is helping me recover from crippling depression caused by C-PTSD. Thank you so much for the platform and I hope you guys keep up the good work, it has lots of potential waiting to flourish!!'
    },
    {
        user: 'Travis',
        description: 'Great platform! Makes me feel much better focusing on what good things I did today, encouraging me to do the other options so that I can tick them off too, and gives me a break to reflect. Would definitely recommend! Cute platform, works really well :)'
    },
    {
        user: 'Zach',
        description: `I love this platform a lot. Comparing it to other apps, I think that this one is the most easy to use and also has a really nice and soothing design. I really recommend trying it out if you're looking for something to help you on your path of improvement.`
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
                            <img src={`/decor/trust/users/${i}.png`} alt='' />
                            <h6>{item.user}</h6>
                            <p>{item.description}</p>
                            <div className={styles.stars}>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Testimonials
