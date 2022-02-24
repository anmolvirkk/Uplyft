import React from 'react'
import { Link } from 'react-router-dom'
import styles from './_cta.module.sass'

const CTA = ({type, color}) => {
    return (
        <div>
            {type==='pricing'?<div className={styles.cta}>Create Account</div>:type!=='main'?<Link className={styles.cta} to={`/pricing`}>Get Started</Link>:<Link style={{backgroundImage: `${color}`}} className={styles.cta} to={`/`}>Get Started</Link>}
            {type==='pricing'?<div className={styles.sub}>Start With Pro Account</div>:type!=='main'?<div className={styles.sub}>No Login. Free Forever.</div>:null}
        </div>
    )
}

export default CTA
