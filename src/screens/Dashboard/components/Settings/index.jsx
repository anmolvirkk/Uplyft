import React, { useState, useEffect } from 'react'
import { LogOut, Moon, RefreshCw, Save, Package, ChevronRight } from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { darkModeAtom } from '../../allAtoms'
import styles from './_settings.module.sass'
import premium from './premium.json'
import plus from './plus.json'
import Lottie from 'react-lottie-player'
import { useHistory } from 'react-router-dom'
import settingsAtom from './settingsAtom'
import OutsideClickHandler from 'react-outside-click-handler-lite/build/OutsideClickHandler'
import { stripeSecret } from '../../../Pricing/components/Plan'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import updatedAtom from '../../updatedAtom'
import priceAtom from '../../../Checkout/priceAtom'
import { getAuth, signOut } from 'firebase/auth'

const Settings = React.memo(({updateBackend, updateAtoms}) => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
    const Toggle = React.memo(({state, setState}) => {
        return (
            <div className={`${styles.toggle} ${state?styles.active:''}`} onMouseDown={()=>setState(!state)}>
                <hr />
            </div>
        )
    })
    const Blocks = React.memo(({title, blocks}) => {

        const Select = React.memo(({item, interval, blockId}) => {
            const [openDropDown, setOpenDropDown] = useState(false)
            useEffect(()=>{
                if(document.getElementById(blockId) && !document.getElementById(blockId).onmousedown){
                    document.getElementById(blockId).onmousedown = () => {
                        setOpenDropDown(true)
                    }
                }
            }, [blockId, openDropDown])
            return (
                <div className={styles.select}>
                    <div className={styles.currentOption}>
                        <p>{interval}</p>
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
        })

        return (
            <div className={styles.container}>
                {title?<div className={styles.title}>{title}</div>:null}
                {blocks?blocks.map((item, i)=>{
                    let activeInterval = ''
                    return (
                        <div key={i} id={`block${item.text}`} className={`${styles.block} ${item.active?styles.currentPlan:''}`} style={{cursor: item.type==='button'||item.type==='select'?'pointer':'default'}} onMouseDown={item.func&&item.type!=='select'?item.func:null}>
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
                                <Select item={item} interval={activeInterval} blockId={`block${item.text}`} />
                            :null}
                        </div>
                    )
                }):null}
            </div>
        )
    })

    const history = useHistory()

    const [planTitle, setPlanTitle] = useState('')

    const [price] = useRecoilState(priceAtom)

    useEffect(()=>{
        if(planTitle === ''){
            let xr = new XMLHttpRequest()
            xr.open('GET', `https://api.stripe.com/v1/prices`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(null)
            xr.onload = (prices) => {
                if(JSON.parse(prices.currentTarget.response).data.find(i=>i.id===price)){
                    switch (JSON.parse(prices.currentTarget.response).data.find(i=>i.id===price).unit_amount) {
                        case 2000:
                            setPlanTitle('Plus')
                        break
                        case 22000:
                            setPlanTitle('Plus')
                        break
                        case 2500:
                            setPlanTitle('Pro')
                        break
                        case 27500:
                            setPlanTitle('Pro')
                        break
                        default:
                            setPlanTitle('Starter')
                        break
                    }
                }
            }
        }
    }, [price, planTitle])

    const setUpdated = useSetRecoilState(updatedAtom)
    
    const logout = () => {
        const auth = getAuth()
        signOut(auth).then(()=>{
            setUpdated({snacks: false, atoms: false, upgrade: false})
            history.push('')
        })
    }

    const [settings, setSettings] = useRecoilState(settingsAtom)

    const closeSettings = (e) => {
        if(e.target.id !== 'settingsBtn'){
            setSettings(false)
        }
    }

    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const setPrice = useSetRecoilState(priceAtom)

    const setPlan = (price) => {
        if(price!==0){
            let xr = new XMLHttpRequest()
            xr.open('GET', `https://api.stripe.com/v1/prices`, true)
            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xr.send(null)
            xr.onload = (prices) => {
                if(JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===price)){
                    setPrice(JSON.parse(prices.currentTarget.response).data.find(i=>i.unit_amount===price).id)
                    history.push(`/checkout`)
                }
            }
        }else{
            setModalConfig({type: 'cancelSubscription'})
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={(e)=>closeSettings(e)}>
            <div className={`${styles.settings} ${settings?styles.show:''}`}>
                <Blocks blocks={[{icon:<Moon />, text:'Dark Mode', type:'toggle', state:darkMode, setState:setDarkMode}]} />
                {planTitle==='Pro'?<Blocks title='Data' blocks={[{icon: <RefreshCw />, text: 'Sync', type: 'button', func:updateAtoms},{icon: <Save />, text: 'Save', type: 'button', func: updateBackend}]} />:null}
                <Blocks title='Plan' blocks={[{lottie:premium, text: 'Pro', type: 'select', active: planTitle==='Pro', price: {yearly: 27500, monthly: 2500}, select: [{text: 'yearly', func: ()=>setPlan(27500)}, {text: 'monthly', func: ()=>setPlan(2500)}]},{lottie: plus, text: 'Plus', active: planTitle==='Plus', type: 'select', price: {yearly: 22000, monthly: 2000}, select: [{text: 'yearly', func: ()=>setPlan(22000)}, {text: 'monthly', func: ()=>setPlan(2000)}]},{icon: <Package />, text: 'Starter', price: 0, type: 'button', active: planTitle==='Starter', func: ()=>setPlan(0)}]} />
                <Blocks blocks={[{icon:<LogOut />, text: 'Logout', type: 'button', func: logout}]} />
            </div>
        </OutsideClickHandler>
    )
})

export default Settings