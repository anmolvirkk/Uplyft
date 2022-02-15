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
import { planAtom } from '../Dashboard/allAtoms'
import modalConfigAtom from '../Dashboard/recoil-atoms/modalConfigAtom'
import { windowHeight } from '../Dashboard/variables/mobileHeights'
import Lottie from 'react-lottie-player'
import loadData from '../loading.json'
import { stripeSecret } from '../Pricing/components/Plan'

const Logo = ({success}) => {
  const [auth] = useRecoilState(authAtom)
  return (
    <div className={styles.title}>
        <img src='/logos/subsidiary.png' alt={company.subsidiary} />
        <h1>{company.subsidiary}</h1>
        {success?<p>Successfully Upgraded</p>:<p>Unlock {auth.plan.title} plan</p>}
    </div>
  )
}

const Checkout = ({updateBackendless}) => {
  const history = useHistory()
  const [auth] = useRecoilState(authAtom)
  const [showForm, setShowForm] = useState(false)
  const [plan] = useRecoilState(planAtom)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{

    document.getElementsByTagName('html')[0].className = 'light'
    
      let xr = new XMLHttpRequest()
      xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
      xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
      xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xr.send(null)
      xr.onload = (sub) => {
        if(JSON.parse(sub.currentTarget.response).data[0]){
          if(JSON.parse(sub.currentTarget.response).data[0]&&JSON.parse(sub.currentTarget.response).data[0].plan.id === auth.plan.product){
            history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
          }else{
            setShowForm(true)
          }
        }else{
          setShowForm(true)
        }
      }

  }, [auth, history, plan])


  useEffect(()=>{
    if(!auth.login){
      history.push(`/${company.subsidiary}/login`)
    }
  }, [auth.login, history])


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
                  xr.send(`customer=${customer};items[0][price]=${auth.plan.product}`)
                  xr.onload = (sub) => {
                      console.log(JSON.parse(sub.currentTarget.response).plan.amount)
                      setModalConfig({type: 'upgrade', amount: JSON.parse(sub.currentTarget.response).plan.amount})  
                      if(JSON.parse(sub.currentTarget.response).plan.amount === 27500 || JSON.parse(sub.currentTarget.response).plan.amount === 2500){
                        updateBackendless()
                        setTimeout(()=>{
                          setLoading(false)
                          history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
                        }, 500)
                      }else{
                        setLoading(false)
                        history.push(`/${company.subsidiary}/dashboard/${company.journals}`)
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
        if(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===auth.login)){
          createcard(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===auth.login).id)
        }else{
          let xr = new XMLHttpRequest()
          xr.open('POST', `https://api.stripe.com/v1/customers`, true)
          xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
          xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          xr.send(`email=${auth.login}`)
          xr.onload = (customer) => {
            setLoading(false)
            createcard(JSON.parse(customer.currentTarget.response).id)
          }
        }
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
                <InputBox wrapper='checkoutWrapper' error={error.type==='card'||error.type==='all'?error.message:null} type="number" name='Card number' autoComplete='cc-number' value={card.current.num} onChange={(e)=>card.current.num=e.target.value} />
              </div>
              <div className={styles.time}>
                <InputBox wrapper='checkoutWrapper' error={error.type==='month'||error.type==='all'?error.message:null} type='number' name='MM' autoComplete='cc-exp-month' onChange={(e)=>card.current.mm=e.target.value} />
                <InputBox wrapper='checkoutWrapper' error={error.type==='year'||error.type==='all'?error.message:null} type='number' name='YY' autoComplete='cc-exp-year' onChange={(e)=>card.current.yy=e.target.value} />
                <InputBox wrapper='checkoutWrapper' error={error.type==='cvv'||error.type==='all'?error.message:null} type='number' name='CVC' autocomplete='cc-csc' onChange={(e)=>card.current.cvv=e.target.value} />
              </div>
              <div className={styles.cta} onMouseDown={(e)=>makepayment(e)}>Start {auth.plan.title} Plan</div>
          </div>
          :null}
          </div>
        </div>
    )
}

export default Checkout
