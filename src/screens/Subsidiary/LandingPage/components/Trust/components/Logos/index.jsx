import React from 'react'
import styles from '../../_trust.module.sass'

const logos = [
    {
        company: 'Business.com',
        quote: 'Test'
    }
]

const Logos = () => {
    return (
        <div className={styles.logos}>
            <div className={styles.quote}>
                <p>"</p>
                <p>{`"${logos[0].quote}"`}</p>
                <p>-{logos[0].company}</p>
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
