import React, { useState } from 'react'
import styles from './_pricing.module.sass'
import Header from '../LandingPage/components/Header'
import Toggle from './components/Toggle'
import Plan from './components/Plan'
import company from '../../../company'

const Pricing = () => {

  const [month, setMonth] = useState(false)

  const plans = [
    {
      title: 'Starter',
      subtitle: 'free forever',
      price: 0
    },
    {
      title: 'Plus',
      subtitle: 'free forever',
      price: month?40:40*12-40
    },
    {
      title: 'Pro',
      subtitle: 'free forever',
      price: month?50:50*12-50
    }
  ]

  return (
    <div className={styles.pricing}>
        <Header />
        <div className={styles.title}>
          <h1>Ready to start with <span>{company.subsidiary}</span>?</h1>
          <p>Choose the plan that suits you.</p>
        </div>
        <Toggle month={month} setMonth={setMonth} />
        <div className={styles.plans}>
          {plans.map((item, i)=>{
            return <Plan {...item} interval={month?'month':'year'} key={i} />
          })}
        </div>
    </div>
  )
}

export default Pricing
