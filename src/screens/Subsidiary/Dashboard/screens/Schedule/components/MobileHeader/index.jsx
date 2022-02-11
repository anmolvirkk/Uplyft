import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, Menu, MoreVertical} from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'
import { allRoutesAtom, scheduleAddDropDownAtom, scheduleSideMenuAtom, scheduleHeaderAtom } from '../../../../allAtoms'
import settingsAtom from '../../../../components/SideBar/components/Settings/settingsAtom'

const MobileHeader = ({updateBackendless, updateAtoms}) => {
    const setScheduleAddDropDown = useSetRecoilState(scheduleAddDropDownAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)
  
    const [redirect] = useState(false)

    const [scheduleSideMenu, setScheduleSideMenu] = useRecoilState(scheduleSideMenuAtom)

    const [scheduleHeader] = useRecoilState(scheduleHeaderAtom)

    const [settings, setSettings] = useRecoilState(settingsAtom)
    
    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                <Menu onMouseDown={()=>setScheduleSideMenu(!scheduleSideMenu)} id='mobileHeaderMenuBtn' />
                <p>{scheduleHeader.title}</p>
            </div>
            <div className={styles.options}>
                <Plus onMouseDown={scheduleHeader.onAdd!==null?()=>scheduleHeader.onAdd():()=>setScheduleAddDropDown(true)} id='mobileHeaderAddBtn' />
                <div className={styles.moremenu} onMouseDown={()=>setSettings(!settings)} id='settingsBtn'>
                    <MoreVertical />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
