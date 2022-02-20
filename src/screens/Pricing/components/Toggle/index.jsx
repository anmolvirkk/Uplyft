import React from 'react'
import styles from './_toggle.module.sass'

const Toggle = ({month, setMonth}) => {
    const isMobile = window.innerWidth < 1450
    return (
        <div className={styles.toggleWrapper}>
            <div className={styles.toggleContainer}>
                <h3 style={{opacity: month?1:0.5}}>Monthly</h3>
                <div className={styles.toggle} onMouseDown={()=>setMonth(!month)} style={{backgroundColor: !month?'rgb(var(--primary))':'rgb(var(--border))'}}>
                    <hr style={{left: month?isMobile?'5px':'0.5vh':isMobile?'calc(100% - 30px)':'calc(100% - 3.5vh)'}} />
                </div>
                <h3 style={{opacity: !month?1:0.5}}>Yearly</h3>
            </div>
            <div className={styles.tags}>
                <div className={styles.tag}>50% discount</div>
                {!month?<div className={styles.tag}>1 Month Free</div>:null}
                {!month?<div className={styles.tag}>Best Value</div>:null}
            </div>
        </div>
    )
}

export default Toggle
