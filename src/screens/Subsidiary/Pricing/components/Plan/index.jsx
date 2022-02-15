import React from 'react'
import styles from './_plan.module.sass'
import {useHistory} from 'react-router-dom'
import company from '../../../../../company'
import { useRecoilState } from 'recoil'
import authAtom from '../../../Auth/authAtom'

// const stripeSecret = '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'
export const stripeSecret = 'sk_test_51J8IyuSHTJXUmRdNymi4GuLOt0bleHsf5zshqzLFoFzoEaKPAM6OEFOIhCrC6GxCkk8FUqS7duj0CIDzXqx3WFAs00ZQGRHWu7'

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
            const authSet = async () => {
                setAuth({plan: {...props}})
            }
            authSet().then(()=>{
                history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
            })
        },
        plus: () => {
            let xr = new XMLHttpRequest()
            xr.open('GET', `https://api.stripe.com/v1/prices`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(null)
            xr.onload = (prices) => {
                if(JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===halfPrice*100)){
                    setAuth({...auth, plan: {...props, product: JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===halfPrice*100).id}})
                    history.push(`/${company.subsidiary}/signup`)
                }
            }
        },
        pro: () => {
            let xr = new XMLHttpRequest()
            xr.open('GET', `https://api.stripe.com/v1/prices`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(null)
            xr.onload = (prices) => {
              setAuth({...auth, plan: {...props, product: JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===halfPrice*100).id}})
              history.push(`/${company.subsidiary}/signup`)
            }
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
