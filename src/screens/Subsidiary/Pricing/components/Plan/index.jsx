import React from 'react'
import styles from './_plan.module.sass'
import {useHistory} from 'react-router-dom'
import company from '../../../../../company'

const Plan = ({title, subtitle, price, interval, month, features}) => {
    let orginalPrice = price
    let halfPrice = orginalPrice/2
    let monthOffPrice = false
    if(!month){
        orginalPrice = price*12
        monthOffPrice = orginalPrice-price
        halfPrice = monthOffPrice/2
    }
    const history = useHistory()
    const submit = {
        starter: () => {
            history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
        },
        plus: () => {
            console.log('plus')
        },
        pro: () => {
            console.log('pro')
        }
    }
    return (
        <div className={`${styles.plan} ${title==='Pro'?styles.recommended:null}`}>
            <div className={styles.topcard}>
                <h1>{title}</h1>
                <h2>{subtitle} {title!=='Pro'?<span> + xxxxx xxxxxxx + xxxxxxxxxx xxxxxx xxxxxxxx</span>:null}</h2>
                <div className={styles.price}>
                    <span className={styles.mainprice}>{`$${halfPrice}`}</span> 
                    <div className={styles.prevPrice}>
                        {price!==0?
                            <div className={styles.prices}>
                                {monthOffPrice?<strike>{`$${monthOffPrice}`}</strike>:null}
                                <strike>{`$${orginalPrice}`}</strike>
                            </div>
                        :null}
                        <span>per {interval}</span>
                    </div>
                </div>
                <div onMouseDown={submit[title.toLowerCase()]} className={styles.cta}>{price!==0?'Create Account':'Open Dashboard'}</div>
            </div>
            <div className={styles.features}>
                <div className={`${styles.feature} ${styles.journals}`}>
                    <div className={styles.title}>
                        <img src='/logos/journals.png' alt={company.journals} />
                        <img src='/logos/journalsText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {features.journals.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature} ${styles.schedule}`}>
                    <div className={styles.title}>
                        <img src='/logos/schedule.png' alt={company.schedule} />
                        <img src='/logos/scheduleText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {features.schedule.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature} ${styles.notes}`}>
                    <div className={styles.title}>
                        <img src='/logos/notes.png' alt={company.notes} />
                        <img src='/logos/notesText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {features.notes.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature} ${styles.finances}`}>
                    <div className={styles.title}>
                        <img src='/logos/finances.png' alt={company.finances} />
                        <img src='/logos/financesText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {features.finances.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature} ${styles.fitness}`}>
                    <div className={styles.title}>
                        <img src='/logos/fitness.png' alt={company.fitness} />
                        <img src='/logos/fitnessText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {features.fitness.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div onMouseDown={submit[title.toLowerCase()]} className={styles.cta}>{price!==0?'Create Account':'Open Dashboard'}</div>
        </div>
    )
}

export default Plan
