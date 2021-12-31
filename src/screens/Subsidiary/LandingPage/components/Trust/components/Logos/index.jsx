import React from 'react'
import styles from '../../_trust.module.sass'

const logos = [
    {
        company: 'Business.com',
        quote: 'Evernote is a powerful tool that can help executives, entrepreneurs and creative people capture and arrange their ideas. All you have to do is use it.'
    }
]

const Logos = () => {
    return (
        <div className={styles.logos}>
            <div className={styles.quote}>
                <p className={styles.text}>{`"${logos[0].quote}"`}</p>
                <p className={styles.company}>- {logos[0].company}</p>
            </div>
            <div className={styles.options}>
                <img decoding='async' loading='lazy' src='/decor/trust/verge.png' alt='verge' className={styles.company} />
                <img decoding='async' loading='lazy' src='/decor/trust/forbes.png' alt='forbes' className={styles.company} />
                <img decoding='async' loading='lazy' src='/decor/trust/inc.png' alt='inc' className={styles.company} />
                <img decoding='async' loading='lazy' src='/decor/trust/entrepreneur.png' alt='entrepreneur' className={styles.company} />
                <img decoding='async' loading='lazy' src='/decor/trust/business.png' alt='business' className={styles.company} />
            </div>
        </div>
    )
}

export default Logos
