import React from 'react'
import { LogOut, Moon, RefreshCw, Save, Package, Key, Mail, LifeBuoy, AlertTriangle, Send, ChevronRight } from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { darkModeAtom, planAtom } from '../../../../allAtoms'
import styles from './_settings.module.sass'
import premium from './premium.json'
import plus from './plus.json'
import Lottie from 'react-lottie-player'
import Backendless from 'backendless'
import { useHistory } from 'react-router-dom'
import company from '../../../../../../../company'
import authAtom from '../../../../../Auth/authAtom'
import { GoogleLogout } from 'react-google-login'
import settingsAtom from './settingsAtom'
import OutsideClickHandler from 'react-outside-click-handler-lite/build/OutsideClickHandler'
import { plans } from '../../../../../Pricing'
import { stripeSecret } from '../../../../../Pricing/components/Plan'
import { useState } from 'react'
import { useEffect } from 'react'
import modalConfigAtom from '../../../../recoil-atoms/modalConfigAtom'

const Settings = ({updateBackendless, updateAtoms}) => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
    const [auth, setAuth] = useRecoilState(authAtom)
    const Toggle = ({state, setState}) => {
        return (
            <div className={`${styles.toggle} ${state?styles.active:''}`} onMouseDown={()=>setState(!state)}>
                <hr />
            </div>
        )
    }
    const Blocks = ({title, blocks}) => {

        const Select = ({item}) => {
            const [openDropDown, setOpenDropDown] = useState(false)
            const [currentOption, setCurrentOption] = useState(item.select[0].text)
            useEffect(()=>{
                if(item.text==='Pro'){
                    let xr = new XMLHttpRequest()
                    xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
                    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                    xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xr.send(null)
                    xr.onload = (prices) => {
                        let amount = JSON.parse(prices.currentTarget.response).data[0].items.data[0].plan.amount
                        if(amount === 2500 || amount === 27500){
                            if(currentOption !== JSON.parse(prices.currentTarget.response).data[0].items.data[0].plan.interval+'ly'){
                                setCurrentOption(JSON.parse(prices.currentTarget.response).data[0].items.data[0].plan.interval+'ly')
                            }
                        }
                    }
                }else if(item.text==='Plus'){
                    let xr = new XMLHttpRequest()
                    xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
                    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                    xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xr.send(null)
                    xr.onload = (prices) => {
                        let amount = JSON.parse(prices.currentTarget.response).data[0].items.data[0].plan.amount
                        if(amount === 2000 || amount === 22000){
                            if(currentOption !== JSON.parse(prices.currentTarget.response).data[0].items.data[0].plan.interval+'ly'){
                                setCurrentOption(JSON.parse(prices.currentTarget.response).data[0].items.data[0].plan.interval+'ly')
                            }
                        }
                    }
                }
            }, [currentOption, item.text])
            return (
                <div className={styles.select} onClick={()=>setOpenDropDown(!openDropDown)}>
                    <div className={styles.currentOption}>
                        <p>{currentOption}</p>
                        <ChevronRight />
                    </div>
                    {openDropDown?
                        <OutsideClickHandler onOutsideClick={()=>setOpenDropDown(false)}>
                            <div className={styles.options}>
                                {item.select.map((item, i)=>{
                                    return <div key={i} className={styles.option} onMouseDown={item.func}>{item.text}</div>
                                })}
                            </div>
                        </OutsideClickHandler>
                    :null}
                </div>
            )
        }

        return (
            <div className={styles.container}>
                {title?<div className={styles.title}>{title}</div>:null}
                {blocks?blocks.map((item, i)=>{
                    return (
                        <div key={i} className={`${styles.block} ${auth.plan.title===item.text?styles.currentPlan:''}`} style={{cursor: item.type==='button'?'pointer':'default'}} onMouseDown={item.func&&item.type!=='select'?item.func:null}>
                            <div className={styles.text}>
                                {item.icon?item.icon:null}
                                {item.lottie?
                                    <Lottie
                                        play
                                        loop
                                        animationData={item.lottie}
                                        style={{ width: 40, height: 40, marginLeft: -7, marginRight: -8 }}
                                    />
                                :null}
                                <p>{item.text}</p>
                            </div>
                            {item.type==='toggle'?<Toggle state={item.state} setState={item.setState} />:null}
                            {item.select?
                                <Select item={item} />
                            :null}
                        </div>
                    )
                }):null}
            </div>
        )
    }

    const [plan] = useRecoilState(planAtom)
    const history = useHistory()
    
    const logout = () => {
        if(plan==='Pro'){
            updateBackendless()
            Backendless.UserService.logout().then(()=>{
                localStorage.clear()
                history.push(`/${company.subsidiary}`)
            })
        }else{
            history.push(`/${company.subsidiary}`)
        }
    }

    const [settings, setSettings] = useRecoilState(settingsAtom)

    const closeSettings = (e) => {
        if(e.target.id !== 'settingsBtn'){
            setSettings(false)
        }
    }

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const setPlan = (plan, price) => {
        if(price!==0){
            let xr = new XMLHttpRequest()
            xr.open('GET', `https://api.stripe.com/v1/prices`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(null)
            xr.onload = (prices) => {
                if(JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===price)){
                    setAuth({...auth, plan: {...plans.filter(i=>i.title===plan)[0], product: JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===price).id}})
                    history.push(`/${company.subsidiary}/checkout`)
                }
            }
        }else{
            let xr = new XMLHttpRequest()
            xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(null)
            xr.onload = (e) => {
                setModalConfig({type: 'cancelSubscription', amount: JSON.parse(e.currentTarget.response).data[0].plan.amount})
            }
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={(e)=>closeSettings(e)}>
            <div className={`${styles.settings} ${settings?styles.show:''}`}>
                <Blocks blocks={[{icon:<Moon />, text:'Dark Mode', type:'toggle', state:darkMode, setState:setDarkMode}]} />
                {plan==='Pro'?<Blocks title='Data Management' blocks={[{icon: <RefreshCw />, text: 'Sync', type: 'button', func:updateAtoms},{icon: <Save />, text: 'Save', type: 'button', func: updateBackendless}]} />:null}
                <Blocks title='Change Plan' blocks={[{lottie:premium, text: 'Pro', type: 'select', select: [{text: 'yearly', func: ()=>setPlan('Pro', 27500)}, {text: 'monthly', func: ()=>setPlan('Pro', 2500)}]},{lottie: plus, text: 'Plus', type: 'select', select: [{text: 'yearly', func: ()=>setPlan('Plus', 22000)}, {text: 'monthly', func: ()=>setPlan('Plus', 2000)}]},{icon: <Package />, text: 'Starter', type: 'button', func: ()=>setPlan('Starter', 0)}]} />
                <Blocks title='Account' blocks={[{icon: <Mail />, text: 'change email', type: 'button'},{icon: <Key />, text: 'change password', type: 'button'},{icon: <AlertTriangle />, text: 'delete account', type: 'button'}]} />
                <Blocks title='Support' blocks={[{icon: <LifeBuoy />, text: 'fAQ', type: 'button'},{icon: <Send />, text: 'Contact', type: 'button'}]} />
                {!auth.social?
                    <Blocks blocks={[{icon:<LogOut />, text: 'Logout', type: 'button', func: logout}]} />
                :
                    <GoogleLogout
                        clientId="617480862173-k9bvrokkossadseq442ee6e5oatfj5os.apps.googleusercontent.com"
                        buttonText="Logout" 
                        onLogoutSuccess={logout}
                        render={e=>(
                            <Blocks blocks={[{icon:<LogOut />, text: 'Logout', type: 'button', func: e.onClick}]} />
                        )}  
                    />
                }
            </div>
        </OutsideClickHandler>
    )
}

export default Settings