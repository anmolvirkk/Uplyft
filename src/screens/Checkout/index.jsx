import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from './_checkout.module.sass'
import InputBox from '../Auth/components/InputBox'
import company from '../../company'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { planAtom } from '../Dashboard/allAtoms'
import modalConfigAtom from '../Dashboard/recoil-atoms/modalConfigAtom'
import { windowHeight } from '../Dashboard/variables/mobileHeights'
import Lottie from 'react-lottie-player'
import loadData from '../loading.json'
import { stripeSecret } from '../Pricing/components/Plan'
import priceAtom from './priceAtom'
import dataAtom from '../Dashboard/dataAtom'

const Logo = ({success}) => {
  return (
    <div className={styles.title}>
        <img src='/logos/main.png' alt={company.subsidiary} />
        <h1>{company.subsidiary}</h1>
        {success?<p>Successfully Upgraded</p>:<p>Unlock plan</p>}
    </div>
  )
}

const Checkout = ({updateBackend}) => {
  const history = useHistory()
  const [showForm, setShowForm] = useState(false)
  const [plan] = useRecoilState(planAtom)
  const [loading, setLoading] = useState(false)
  const [price] = useRecoilState(priceAtom)
  const [data] = useRecoilState(dataAtom)
  
  useEffect(()=>{
      document.getElementsByTagName('html')[0].className = 'light'
      if(!data.email){
        history.push(`/login`)
      }else{
        let xr = new XMLHttpRequest()
        xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
        xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
        xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xr.send(null)
        xr.onload = (sub) => {
          if(JSON.parse(sub.currentTarget.response).data[0]){
            if(JSON.parse(sub.currentTarget.response).data[0]&&JSON.parse(sub.currentTarget.response).data[0].plan.id === price){
              history.push(`/dashboard/${company.journals}`)
            }else{
              setShowForm(true)
            }
          }else{
            setShowForm(true)
          }
        }
      }

  }, [history, plan, data.email, price])

  const card = useRef({
    num: '',
    mm: '',
    yy: '',
    cvv: ''
  })
  const [error, setError] = useState({type: '', message: ''})
  const setModalConfig = useSetRecoilState(modalConfigAtom)

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
            setLoading(false)
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
              xr.onload = () => {
                let xr = new XMLHttpRequest()
                xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
                xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xr.send(`customer=${customer}`)
                xr.onload = (sub) => {
                  JSON.parse(sub.currentTarget.response).data.forEach((item)=>{
                    let xr = new XMLHttpRequest()
                    xr.open('DELETE', `https://api.stripe.com/v1/subscriptions/${item.id}`, true)
                    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                    xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xr.send(null)
                  })
                  let xr = new XMLHttpRequest()
                  xr.open('POST', `https://api.stripe.com/v1/subscriptions`, true)
                  xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                  xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                  xr.send(`customer=${customer};items[0][price]=${price}`)
                  xr.onload = (sub) => {
                      setModalConfig({type: 'upgrade', amount: JSON.parse(sub.currentTarget.response).plan.amount})  
                      if(JSON.parse(sub.currentTarget.response).plan.amount === 27500 || JSON.parse(sub.currentTarget.response).plan.amount === 2500){
                        updateBackend()
                        setTimeout(()=>{
                          history.push(`/dashboard/${company.journals}`)
                        }, 500)
                      }else{
                        history.push(`/dashboard/${company.journals}`)
                      }
                    }
                  }
                }
            }
          }
        }
      }else{
        setError({type: 'cvv', message: 'required'})
        setLoading(false)
      }
    }

      let xr = new XMLHttpRequest()
      xr.open('GET', `https://api.stripe.com/v1/customers`, true)
      xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
      xr.send(null)
      setLoading(true)
      xr.onload = (customers) => {
        if(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===data.email)){
          createcard(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===data.email).id)
        }else{
          let xr = new XMLHttpRequest()
          xr.open('POST', `https://api.stripe.com/v1/customers`, true)
          xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
          xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xr.send(`email=${data.email}`)
          xr.onload = (customer) => {
            createcard(JSON.parse(customer.currentTarget.response).id)
          }
        }
      }

  }

  const payonenter = (e) => {
    if(e.key === 'Enter'){
      makepayment(e)
    }
  }

  const paywithgoogle = () => {
    let xr = new XMLHttpRequest()
    xr.open('POST', `https://api.stripe.com/v1/payment_methods`, true)
    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
    xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xr.send(`type=card;card[wallet]=google_pay`)
    xr.onload = (e) => {
      console.log(JSON.parse(e.currentTarget.response))
    }
  }

  return (
        <div className={styles.wrapper} style={{height: window.innerHeight+'px'}} id='checkoutWrapper'>
          <div className={styles.checkout} style={{height: windowHeight+'px'}}>
          {showForm?
          <div className={styles.form}>
              {loading?
                  <div className={styles.loading}>
                      <Lottie
                          play
                          loop
                          animationData={loadData}
                          style={{ width: 250, height: 250 }}
                      />
                  </div>
              :null}
              <Logo success={false} />
              <div className={styles.googlepay} onMouseDown={paywithgoogle}>
                Pay with Google
              </div>
              <div className={styles.divide}>
                  <hr />
                  <p>or</p>
                  <hr />
              </div>
              <div className={styles.cname}>
                <InputBox onKeyDown={(e)=>payonenter(e)} wrapper='checkoutWrapper' error={error.type==='card'||error.type==='all'?error.message:null} type="number" name='Card number' autoComplete='cc-number' value={card.current.num} onChange={(e)=>card.current.num=e.target.value} />
              </div>
              <div className={styles.time}>
                <InputBox onKeyDown={(e)=>payonenter(e)} wrapper='checkoutWrapper' error={error.type==='month'||error.type==='all'?error.message:null} type='number' name='MM' autoComplete='cc-exp-month' onChange={(e)=>card.current.mm=e.target.value} />
                <InputBox onKeyDown={(e)=>payonenter(e)} wrapper='checkoutWrapper' error={error.type==='year'||error.type==='all'?error.message:null} type='number' name='YY' autoComplete='cc-exp-year' onChange={(e)=>card.current.yy=e.target.value} />
                <InputBox onKeyDown={(e)=>payonenter(e)} wrapper='checkoutWrapper' error={error.type==='cvv'||error.type==='all'?error.message:null} type='number' name='CVC' autocomplete='cc-csc' onChange={(e)=>card.current.cvv=e.target.value} />
              </div>
              <div className={styles.cta} onMouseDown={(e)=>makepayment(e)}>Start Plan</div>
          </div>
          :null}
          </div>
        </div>
    )
}

export default Checkout
