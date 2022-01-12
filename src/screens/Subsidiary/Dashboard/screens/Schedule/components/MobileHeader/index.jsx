import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, ArrowLeft} from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import allRoutesAtom from '../../../Journals/recoil-atoms/allRoutesAtom'
import MoreMenu from '../../../../components/MoreMenu'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'
import darkModeAtom from '../../../../components/SideBar/components/DarkMode/darkModeAtom'
import currentScheduleMobileSectionAtom from '../../recoil-atoms/currentScheduleMobileSectionAtom'
import scheduleAddDropDownAtom from '../../recoil-atoms/scheduleAddDropDownAtom'

const MobileHeader = () => {
    const [currentScheduleMobileSection] = useRecoilState(currentScheduleMobileSectionAtom)
    const setScheduleAddDropDown = useSetRecoilState(scheduleAddDropDownAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
  
    const [redirect] = useState(false)

    const sections = [
        {
            title: 'Schedule',
            onAdd: ()=>{
                setScheduleAddDropDown(true)
            },
            onBack: null
        }
    ]

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                {currentScheduleMobileSection===0?null:<ArrowLeft onMouseDown={sections[currentScheduleMobileSection].onBack} />}
                <p>{sections[currentScheduleMobileSection].title}</p>
            </div>
            <div className={styles.options}>
                {sections[currentScheduleMobileSection].onAdd?<Plus onMouseDown={sections[currentScheduleMobileSection].onAdd} />:null}
                <div className={styles.moremenu}>
                    <MoreMenu items={[{name: `${darkMode ? 'Light' : 'Dark'} Mode`, function: ()=>setDarkMode(!darkMode)}, {name: "Logout", function: null}]} pos={{right: '0', top: '6vh'}} />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
