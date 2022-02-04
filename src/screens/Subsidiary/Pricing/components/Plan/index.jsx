import React from 'react'
import styles from './_plan.module.sass'
import {useHistory} from 'react-router-dom'
import company from '../../../../../company'

const Plan = ({title, subtitle, price, interval}) => {
    let currentPrice = price-(price*0.5)
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
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <h3><span>{`$${currentPrice}`}</span> <span>per {interval}</span></h3>
            <div onMouseDown={submit[title.toLowerCase()]} className={styles.cta}>{price!==0?'Create Account':'Open Dashboard'}</div>
        </div>
    )
}

export default Plan
