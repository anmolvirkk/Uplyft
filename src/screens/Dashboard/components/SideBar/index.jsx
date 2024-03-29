import React from 'react'
import styles from './_sidebar.module.sass'
import {Sliders, Tool} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState, useSetRecoilState} from 'recoil'
import company from '../../../../company'
import isMobileAtom from '../../recoil-atoms/isMobileAtom'
import {scheduleSideMenuAtom, scheduleHeaderAtom, currentMobileSectionAtom, allRoutesAtom} from '../../allAtoms'
import settingsAtom from '../Settings/settingsAtom'

const IconButton = ({name, icon, link, underConstruction, func}) => {
    return (
        <NavLink onMouseDown={func} className={styles.iconButton} to={link} activeClassName={styles.activeIconButton} exact={link===`/dashboard`}>
            <div className={styles.icon}>
                <img loading='lazy' decoding='async' src={icon} alt={name} />
                {underConstruction?<div className={styles.underConstruction}><Tool /></div>:null}
            </div>
        </NavLink>
    )
}

const SideBar = React.memo(() => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    const setCurrentMobileSection = useSetRecoilState(currentMobileSectionAtom)
    const setScheduleHeader = useSetRecoilState(scheduleHeaderAtom)
    const setScheduleSideMenu = useSetRecoilState(scheduleSideMenuAtom)
    const [isMobile] = useRecoilState(isMobileAtom)

    const sidebarButtons = [
        {
            name: company.journals,
            icon: '/logos/journals.png',
            link: allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:allRoutes&&allRoutes['date']&&allRoutes['book']?`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}`:`/dashboard/${company.journals}`,
            underConstruction: false,
            func: ()=>{
                if(isMobile){
                    if(document.getElementById('bookSection')){
                        document.getElementById('bookSection').style.transform = 'translateX(0%)'
                        document.getElementById('bookSection').style.display = 'block'
                        document.getElementById('bookSection').style.position = 'static'
                    }
                    if(document.getElementById('journalSideSection')){
                        document.getElementById('journalSideSection').style.transform = 'translateX(-100%)'
                        document.getElementById('journalSideSection').style.display = 'none'
                    }
                    if(document.getElementById('journalMainSection')){
                        document.getElementById('journalMainSection').style.transform = 'translateX(-100%)'
                        document.getElementById('journalMainSection').style.display = 'none'
                    }
                    if(document.getElementById('journalCalendar')){
                        document.getElementById('journalCalendar').style.transform = 'translateX(-100%)'
                        document.getElementById('journalCalendar').style.display = 'none'
                    }
                    setCurrentMobileSection(0)
                }
            }
        },
        {
            name: company.schedule,
            icon: '/logos/schedule.png',
            link: allRoutes&&allRoutes['scheduleSection']?`/dashboard/${company.schedule}/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'all':allRoutes['scheduleSection']==='events'?allRoutes['event']?allRoutes['event']:'':''}`:`/dashboard/${company.schedule}/habits`,
            underConstruction: false,
            func: () => {
                if(isMobile){
                    setScheduleHeader({title: 'Schedule', onAdd: null})
                    setScheduleSideMenu(false)
                    if(document.getElementById('scheduleSideSection')){
                        document.getElementById('scheduleSideSection').style.transform = 'translateX(-100%)'
                    }
                }
            }
        },
        {
            name: company.notes,
            icon: '/logos/notes.png',
            link: `/dashboard/${company.notes}`,
            underConstruction: true,
            func: null
        },
        {
            name: company.finances,
            icon: '/logos/finances.png',
            link: `/dashboard/${company.finances}`,
            underConstruction: true,
            func: null
        },
        {
            name: company.fitness,
            icon: '/logos/fitness.png',
            link: `/dashboard/${company.fitness}`,
            underConstruction: true,
            func: null
        }
    ]

    const [settings, setSettings] = useRecoilState(settingsAtom)

    return (
        <aside id='mainSideBar'>
            <div className={styles.logo}>
                <img loading='lazy' decoding='async' src='/logos/main.png' alt="Logo" />
            </div>
            {sidebarButtons.map((props)=>{
                return <IconButton {...props} key={props.name} />
            })}
            <div className={styles.options}>
                <div className={styles.iconButton} onMouseDown={()=>setSettings(!settings)} id='settingsBtn'>
                    <Sliders />
                    <p>Settings</p>
                </div>
            </div>
        </aside>
    )
})

export default SideBar