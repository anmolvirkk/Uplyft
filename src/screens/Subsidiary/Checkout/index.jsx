import React from 'react'
import { useRecoilState } from 'recoil'
import authAtom from '../Auth/authAtom'
import Header from '../LandingPage/components/Header'
import styles from './_checkout.module.sass'
import InputBox from '../Auth/components/InputBox'
import company from '../../../company'
import { useRef } from 'react'
import { useEffect } from 'react'

const Logo = () => {
  const [auth] = useRecoilState(authAtom)
  return (
    <div className={styles.title}>
        <img src='/logos/subsidiary.png' alt={company.subsidiary} />
        <h1>{company.subsidiary}</h1>
        <p>Unlock {auth.plan.title.toLowerCase()} plan</p>
    </div>
  )
}

const Checkout = () => {
  useEffect(()=>{
    document.getElementsByTagName('html')[0].className = 'light'
  }, [])
  const [auth] = useRecoilState(authAtom)
  const card = useRef({
    num: '',
    mm: '',
    yy: '',
    cvv: ''
  })
  const makepayment = () => {

    const startsubscription = (customer) => {
      let xr = new XMLHttpRequest()
      xr.open('POST', `https://api.stripe.com/v1/subscriptions`, true)
      xr.setRequestHeader('Authorization', 'Bearer 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' )
      xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xr.send(`customer=${customer};items[0][price]=${0}`)
      xr.onload = (sub) => {
        console.log(sub)
      }
    }

    let xr = new XMLHttpRequest()
    xr.open('GET', `https://api.stripe.com/v1/customers`, true)
    xr.setRequestHeader('Authorization', 'Bearer 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' )
    xr.send(null)
    xr.onload = (customers) => {
      if(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===auth.login)){
        startsubscription(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===auth.login).id)
      }else{
        let xr = new XMLHttpRequest()
        xr.open('POST', `https://api.stripe.com/v1/customers`, true)
        xr.setRequestHeader('Authorization', 'Bearer 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' )
        xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xr.send(`email=${auth.login}`)
        xr.onload = (customer) => {
          startsubscription(JSON.parse(customer.currentTarget.response).id)
        }
      }
    }

  }
  const Form = () => {
    return (
        <form className={styles.form}>
            <Logo />
            <div className={styles.cname}>
              <InputBox type="number" name='Card number' autoComplete='cc-number' value={card.current.num} onChange={(e)=>card.current.num=e.target.value} />
            </div>
            <div className={styles.time}>
              <InputBox type='number' name='MM' autoComplete='cc-exp-month' onChange={(e)=>card.current.mm=e.target.value} />
              <InputBox type='number' name='YY' autoComplete='cc-exp-year' onChange={(e)=>card.current.yy=e.target.value} />
              <InputBox type='number' name='CVC' autocomplete='cc-csc' onChange={(e)=>card.current.cvv=e.target.value} />
            </div>
            <button className={styles.cta} onMouseDown={makepayment}>Start {auth.plan.title} Plan</button>
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
