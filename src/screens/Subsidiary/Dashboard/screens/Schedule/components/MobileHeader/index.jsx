import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, Menu} from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import MoreMenu from '../../../../components/MoreMenu'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'
import { allRoutesAtom, darkModeAtom, scheduleAddDropDownAtom, scheduleSideMenuAtom, scheduleHeaderAtom } from '../../../../allAtoms'
import { useHistory } from 'react-router-dom'
import Backendless from 'backendless'

const MobileHeader = ({updateBackendless, updateAtoms}) => {
    const setScheduleAddDropDown = useSetRecoilState(scheduleAddDropDownAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
  
    const [redirect] = useState(false)

    const [scheduleSideMenu, setScheduleSideMenu] = useRecoilState(scheduleSideMenuAtom)

    const [scheduleHeader] = useRecoilState(scheduleHeaderAtom)
    
    const history = useHistory()

    const logout = () => {
        updateBackendless()
        localStorage.clear()
        Backendless.UserService.logout().then(()=>{
            history.push(`/${company.subsidiary}`)
        })
    }

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                <Menu onMouseDown={()=>setScheduleSideMenu(!scheduleSideMenu)} id='mobileHeaderMenuBtn' />
                <p>{scheduleHeader.title}</p>
            </div>
            <div className={styles.options}>
                <Plus onMouseDown={scheduleHeader.onAdd!==null?()=>scheduleHeader.onAdd():()=>setScheduleAddDropDown(true)} id='mobileHeaderAddBtn' />
                <div className={styles.moremenu}>
                    <MoreMenu items={[{name: `${darkMode ? 'Light' : 'Dark'} Mode`, function: ()=>setDarkMode(!darkMode)}, {name: "Save", function: updateBackendless}, {name: "Sync", function: updateAtoms}, {name: "Logout", function: logout}]} pos={{right: '0', top: '6vh'}} />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
