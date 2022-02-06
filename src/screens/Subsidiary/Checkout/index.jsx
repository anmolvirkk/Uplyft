import React from 'react'
import { useRecoilState } from 'recoil'
import authAtom from '../Auth/authAtom'
import Header from '../LandingPage/components/Header'
import styles from './_checkout.module.sass'
import InputBox from '../Auth/components/InputBox'
import company from '../../../company'

const Logo = ({auth}) => {
  return (
    <div className={styles.title}>
        <img src='/logos/subsidiary.png' alt={company.subsidiary} />
        <h1>{company.subsidiary}</h1>
        <p>Unlock {auth.plan.title.toLowerCase()} plan</p>
    </div>
  )
}

const Checkout = () => {
  const [auth] = useRecoilState(authAtom)
  const Form = () => {
    return (
      <form className={styles.form}>
        <Logo auth={auth} />
        <div className={styles.cname}>
          <InputBox type='text' name='Card number' autoComplete='cc-number' />
        </div>
        <div className={styles.time}>
          <InputBox autoComplete='on' type='text' name='MM' autoComplete='cc-exp-month' />
          <InputBox autoComplete='on' type='text' name='YY' autoComplete='cc-exp-year' />
          <InputBox autoComplete='on' type='text' name='CVC' autocomplete='cc-csc' />
        </div>
        <button className={styles.cta}>Start {auth.plan.title} Plan</button>
      </form>
    )
  }
  return (
        <div className={styles.checkout} style={{height: window.innerHeight+'px'}}>
          <Header type='pro' />
          <Form />
        </div>
    )
}

export default Checkout
