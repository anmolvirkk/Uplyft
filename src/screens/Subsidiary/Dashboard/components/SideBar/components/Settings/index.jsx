import React from 'react'
import { LogOut, Moon, RefreshCw, Save, Sun, Tool } from 'react-feather'
import { useRecoilState } from 'recoil'
import { darkModeAtom, planAtom } from '../../../../allAtoms'
import styles from './_settings.module.sass'
import premium from './premium.json'
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
    const Toggle = ({state, setState}) => {
        return (
            <div className={`${styles.toggle} ${state?styles.active:''}`} onMouseDown={()=>setState(!state)}>
                <hr />
            </div>
        )
    }
    const Block = ({icon, title, type, state, setState, lottie, func}) => {
        return (
            <div className={styles.block} style={{cursor: type==='button'?'pointer':'default'}} onMouseDown={func?func:null}>
                <div className={styles.title}>
                    {icon?icon:null}
                    {lottie?
                        <Lottie
                            play
                            loop
                            animationData={lottie}
                            style={{ width: 40, height: 40, marginLeft: -7, marginRight: -8 }}
                        />
                    :null}
                    <p>{title}</p>
                </div>
                {type==='toggle'?<Toggle state={state} setState={setState} />:null}
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

    const [auth] = useRecoilState(authAtom)
    const [settings, setSettings] = useRecoilState(settingsAtom)

    const closeSettings = (e) => {
        if(e.target.id !== 'settingsBtn'){
            setSettings(false)
        }
    }

    return (
        <OutsideClickHandler onOutsideClick={(e)=>closeSettings(e)}>
            <div className={`${styles.settings} ${settings?styles.show:''}`}>
                {darkMode?<Block icon={<Moon />} title='Dark Mode' type='toggle' state={darkMode} setState={setDarkMode} />:<Block icon={<Sun />} title='Dark Mode' type='toggle' state={darkMode} setState={setDarkMode} />}
                {plan==='pro'?<Block icon={<RefreshCw />} title='Sync' type='button' func={updateAtoms} />:null}
                {plan==='pro'?<Block icon={<Save />} title='Save' type='button' func={updateBackendless} />:null}
                {plan!=='pro'?<Block lottie={premium} title='Upgrade' type='button' />:null}
                {plan!=='starter'?<Block icon={<Tool />} title='Change Plan' type='button' />:null}
                {!auth.social?
                    <Block icon={<LogOut />} title='Logout' type='button' func={logout} />
                    :   
                    <GoogleLogout
                        clientId="617480862173-k9bvrokkossadseq442ee6e5oatfj5os.apps.googleusercontent.com"
                        buttonText="Logout" 
                        onLogoutSuccess={logout}
                        render={e=>(
                            <Block icon={<LogOut />} title='Logout' type='button' func={e.onClick} />
                        )}  
                    />
                }
            </div>
        </OutsideClickHandler>
    )
}

export default Settings