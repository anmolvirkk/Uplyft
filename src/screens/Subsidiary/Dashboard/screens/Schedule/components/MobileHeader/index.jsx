import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, Menu} from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import allRoutesAtom from '../../../Journals/recoil-atoms/allRoutesAtom'
import MoreMenu from '../../../../components/MoreMenu'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'
import darkModeAtom from '../../../../components/SideBar/components/DarkMode/darkModeAtom'
import scheduleAddDropDownAtom from '../../recoil-atoms/scheduleAddDropDownAtom'
import scheduleSideMenuAtom from '../../recoil-atoms/scheduleSideMenuAtom'

const MobileHeader = () => {
    const setScheduleAddDropDown = useSetRecoilState(scheduleAddDropDownAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
  
    const [redirect] = useState(false)

    const [scheduleSideMenu, setScheduleSideMenu] = useRecoilState(scheduleSideMenuAtom)

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                <Menu onMouseDown={()=>setScheduleSideMenu(!scheduleSideMenu)} id='mobileHeaderMenuBtn' />
                <p>Schedule</p>
            </div>
            <div className={styles.options}>
                <Plus onMouseDown={()=>setScheduleAddDropDown(true)} />
                <div className={styles.moremenu}>
                    <MoreMenu items={[{name: `${darkMode ? 'Light' : 'Dark'} Mode`, function: ()=>setDarkMode(!darkMode)}, {name: "Logout", function: null}]} pos={{right: '0', top: '6vh'}} />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
