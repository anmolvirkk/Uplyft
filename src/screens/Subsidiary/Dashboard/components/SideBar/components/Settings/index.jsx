import React from 'react'
import { LogOut, Moon, RefreshCw, Save, Package, Key, Mail, LifeBuoy, AlertTriangle, Send } from 'react-feather'
import { useRecoilState } from 'recoil'
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

const Settings = ({updateBackendless, updateAtoms}) => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
    const [auth] = useRecoilState(authAtom)
    const Toggle = ({state, setState}) => {
        return (
            <div className={`${styles.toggle} ${state?styles.active:''}`} onMouseDown={()=>setState(!state)}>
                <hr />
            </div>
        )
    }
    const Blocks = ({title, blocks}) => {
        return (
            <div className={styles.container}>
                {title?<div className={styles.title}>{title}</div>:null}
                {blocks?blocks.map((item, i)=>{
                    return (
                        <div key={i} className={`${styles.block} ${auth.plan.title===item.text.toLowerCase()?styles.currentPlan:''}`} style={{cursor: item.type==='button'?'pointer':'default'}} onMouseDown={item.func?item.func:null}>
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
                        </div>
                    )
                }):null}
            </div>
        )
    }

    const [plan] = useRecoilState(planAtom)
    const history = useHistory()
    
    const logout = () => {
        if(plan==='pro'){
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

    return (
        <OutsideClickHandler onOutsideClick={(e)=>closeSettings(e)}>
            <div className={`${styles.settings} ${settings?styles.show:''}`}>
                <Blocks blocks={[{icon:<Moon />, text:'Dark Mode', type:'toggle', state:darkMode, setState:setDarkMode}]} />
                {plan==='pro'?<Blocks title='Data Management' blocks={[{icon: <RefreshCw />, text: 'Sync', type: 'button', func:updateAtoms},{icon: <Save />, text: 'Save', type: 'button', func: updateBackendless}]} />:null}
                {plan!=='starter'?<Blocks title='Change Plan' blocks={[{lottie:premium, text: 'Pro', type: 'button'},{lottie: plus, text: 'Plus', type: 'button'},{icon: <Package />, text: 'Starter', type: 'button'}]} />:null}
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