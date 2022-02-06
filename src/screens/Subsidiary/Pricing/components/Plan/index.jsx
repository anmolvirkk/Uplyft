import React from 'react'
import styles from './_plan.module.sass'
import {useHistory} from 'react-router-dom'
import company from '../../../../../company'
import { useRecoilState } from 'recoil'
import authAtom from '../../../Auth/authAtom'

const Plan = (props) => {
    let orginalPrice = props.price
    let halfPrice = orginalPrice/2
    let monthOffPrice = false
    if(!props.month){
        orginalPrice = props.price*12
        monthOffPrice = orginalPrice-props.price
        halfPrice = monthOffPrice/2
    }
    const history = useHistory()
    const [auth, setAuth] = useRecoilState(authAtom)
    const submit = {
        starter: () => {
            history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
        },
        plus: () => {
            setAuth({...auth, plan: {...props}})
            history.push(`/${company.subsidiary}/signup`)
        },
        pro: () => {
            setAuth({...auth, plan: {...props}})
            history.push(`/${company.subsidiary}/signup`)
        }
    }
    return (
        <div className={`${styles.plan} ${props.title==='Pro'?styles.recommended:null}`}>
            <div className={styles.topcard}>
                <h1>{props.title}</h1>
                <h2>{props.subtitle} {props.title!=='Pro'?<span> + xxxxx xxxxxxx + xxxxxxxxxx xxxxxx xxxxxxxx</span>:null}</h2>
                <div className={styles.price}>
                    <span className={styles.mainprice}>{`$${halfPrice}`}</span> 
                    <div className={styles.prevPrice}>
                        {props.price!==0?
                            <div className={styles.prices}>
                                {monthOffPrice?<strike>{`$${monthOffPrice}`}</strike>:null}
                                <strike>{`$${orginalPrice}`}</strike>
                            </div>
                        :null}
                        <span>per {props.interval}</span>
                    </div>
                </div>
                <div onMouseDown={submit[props.title.toLowerCase()]} className={styles.cta}>{props.price!==0?'Create Account':'Open Dashboard'}</div>
            </div>
            <div className={styles.features}>
                <div className={`${styles.feature}`}>
                    <div className={styles.title}>
                        <img src='/logos/journals.png' alt={company.journals} />
                        <img src='/logos/journalsText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {props.features.journals.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature}`}>
                    <div className={styles.title}>
                        <img src='/logos/schedule.png' alt={company.schedule} />
                        <img src='/logos/scheduleText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {props.features.schedule.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature}`}>
                    <div className={styles.title}>
                        <img src='/logos/notes.png' alt={company.notes} />
                        <img src='/logos/notesText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {props.features.notes.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature}`}>
                    <div className={styles.title}>
                        <img src='/logos/finances.png' alt={company.finances} />
                        <img src='/logos/financesText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {props.features.finances.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.feature}`}>
                    <div className={styles.title}>
                        <img src='/logos/fitness.png' alt={company.fitness} />
                        <img src='/logos/fitnessText.png' alt={company.journals} className={styles.titleText} />
                    </div>
                    <ul>
                        {props.features.fitness.map((item, i)=>{
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                </div>
            </div>
            <div onMouseDown={submit[props.title.toLowerCase()]} className={styles.cta}>{props.price!==0?'Create Account':'Open Dashboard'}</div>
        </div>
    )
}

export default Plan
