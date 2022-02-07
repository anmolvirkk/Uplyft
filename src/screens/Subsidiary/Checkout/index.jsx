import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authAtom from '../Auth/authAtom'
import styles from './_checkout.module.sass'
import InputBox from '../Auth/components/InputBox'
import company from '../../../company'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Backendless from 'backendless'
import { planAtom } from '../Dashboard/allAtoms'

// const stripeSecret = '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'
const stripeSecret = 'sk_test_51J8IyuSHTJXUmRdNymi4GuLOt0bleHsf5zshqzLFoFzoEaKPAM6OEFOIhCrC6GxCkk8FUqS7duj0CIDzXqx3WFAs00ZQGRHWu7'

const Logo = ({success}) => {
  const [auth] = useRecoilState(authAtom)
  return (
    <div className={styles.title}>
        <img src='/logos/subsidiary.png' alt={company.subsidiary} />
        <h1>{company.subsidiary}</h1>
        {success?<p>Successfully Upgraded</p>:<p>Unlock {auth.plan.title.toLowerCase()} plan</p>}
    </div>
  )
}

const Checkout = () => {
  const history = useHistory()
  const [auth] = useRecoilState(authAtom)
  const [showForm, setShowForm] = useState(false)
  const [plan] = useRecoilState(planAtom)
  useEffect(()=>{

    document.getElementsByTagName('html')[0].className = 'light'
    if(plan===auth.plan.title.toLowerCase()){
      history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
    }else{
      setShowForm(true)
    }

  }, [auth, history, plan])
  const card = useRef({
    num: '',
    mm: '',
    yy: '',
    cvv: ''
  })
  const [error, setError] = useState({type: '', message: ''})
  const [success, setSuccess] = useState(false)
  const setPlan = useSetRecoilState(planAtom)
  const makepayment = (e) => {

    e.preventDefault()

    const createcard = (customer) => {
      if(card.current.cvv!==''){
        let xr = new XMLHttpRequest()
        xr.open('POST', `https://api.stripe.com/v1/payment_methods`, true)
        xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
        xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xr.send(`type=card;card[number]=${card.current.num};card[exp_month]=${card.current.mm};card[exp_year]=${card.current.yy};card[cvc]=${card.current.cvv}`)
        xr.onload = (paymentmethod) => {
          if(JSON.parse(paymentmethod.currentTarget.response).error){
            switch (JSON.parse(paymentmethod.currentTarget.response).error.code) {
              case 'invalid_number':
                  setError({type: 'card', message: JSON.parse(paymentmethod.currentTarget.response).error.message})
              break;
              case 'missing_payment_information':
                  setError({type: 'all', message: 'required'})
              break;
              case 'invalid_expiry_year':
                  setError({type: 'year', message: 'Invalid year'})
              break;
              case 'invalid_expiry_month':
                  setError({type: 'month', message: 'Invalid month'})
              break;
              case 'invalid_cvc':
                  setError({type: 'cvv', message: 'Invalid security code'})
              break;
              default:
                setError({type: 'card', message: JSON.parse(paymentmethod.currentTarget.response).error.message})
              break;
            }
          }else{
            setError({type: '', message: ''})
            let xr = new XMLHttpRequest()
            xr.open('POST', `https://api.stripe.com/v1/payment_methods/${JSON.parse(paymentmethod.currentTarget.response).id}/attach`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(`customer=${customer}`)
            xr.onload = (pm) => {
              let xr = new XMLHttpRequest()
              xr.open('POST', `https://api.stripe.com/v1/customers/${customer}`, true)
              xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
              xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
              xr.send(`invoice_settings[default_payment_method]=${JSON.parse(pm.currentTarget.response).id}`)
              xr.onload = (e) => {
                let xr = new XMLHttpRequest()
                xr.open('POST', `https://api.stripe.com/v1/subscriptions`, true)
                xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xr.send(`customer=${customer};items[0][price]=${auth.plan.product}`)
                xr.onload = (sub) => {
                  if(!JSON.parse(sub.currentTarget.response).error){
                    let xr = new XMLHttpRequest()
                    xr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
                    xr.send(JSON.stringify({login: auth.login, password: auth.password}))
                    xr.onload = (loggedInUser) => {
                        let user = {...JSON.parse(loggedInUser.currentTarget.response), plan: auth.plan.title.toLowerCase(), card: {...card}}
                        Backendless.UserService.update(user)
                    }
                    setPlan(auth.plan.title.toLowerCase())
                    setSuccess(true)
                  }else{
                  }
                }
              }
            }
          }
        }
      }else{
        setError({type: 'cvv', message: 'required'})
      }
    }

    let xr = new XMLHttpRequest()
    xr.open('GET', `https://api.stripe.com/v1/customers`, true)
    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
    xr.send(null)
    xr.onload = (customers) => {
      if(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===auth.login)){
        createcard(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===auth.login).id)
      }else{
        let xr = new XMLHttpRequest()
        xr.open('POST', `https://api.stripe.com/v1/customers`, true)
        xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
        xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xr.send(`email=${auth.login}`)
        xr.onload = (customer) => {
          createcard(JSON.parse(customer.currentTarget.response).id)
        }
      }
    }

  }

  const Success = () => {
    const opendashboard = () => {
      history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
    }
    return (
      <div className={styles.form}>
        <Logo success={true} />
        <div onMouseDown={opendashboard} className={styles.cta}>Open Dashboard</div>
      </div>
    )
  }

  return (
        <div className={styles.checkout} style={{height: window.innerHeight+'px'}}>
          {!success?
          showForm?
          <form className={styles.form}>
              <Logo success={false} />
                <div>
                  <div className={styles.cname}>
                    <InputBox error={error.type==='card'||error.type==='all'?error.message:null} type="number" name='Card number' autoComplete='cc-number' value={card.current.num} onChange={(e)=>card.current.num=e.target.value} />
                  </div>
                  <div className={styles.time}>
                    <InputBox error={error.type==='month'||error.type==='all'?error.message:null} type='number' name='MM' autoComplete='cc-exp-month' onChange={(e)=>card.current.mm=e.target.value} />
                    <InputBox error={error.type==='year'||error.type==='all'?error.message:null} type='number' name='YY' autoComplete='cc-exp-year' onChange={(e)=>card.current.yy=e.target.value} />
                    <InputBox error={error.type==='cvv'||error.type==='all'?error.message:null} type='number' name='CVC' autocomplete='cc-csc' onChange={(e)=>card.current.cvv=e.target.value} />
                  </div>
                  <div className={styles.cta} onMouseDown={(e)=>makepayment(e)}>Start {auth.plan.title} Plan</div>
                </div>
          </form>
          :null
          :<Success />}
        </div>
    )
}

export default Checkout
