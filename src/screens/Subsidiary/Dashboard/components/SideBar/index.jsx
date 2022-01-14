import React from 'react'
import styles from './_sidebar.module.sass'
import {Power, Tool} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState, useSetRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import DarkMode from './components/DarkMode'
import company from '../../../../../company'
import currentMobileSectionAtom from '../../screens/Journals/recoil-atoms/currentMobileSectionAtom'

const IconButton = ({name, icon, link, underConstruction, func}) => {
    return (
        <NavLink onMouseDown={func} className={styles.iconButton} to={link} activeClassName={styles.activeIconButton} exact={link===`/${company.subsidiary}/dashboard`}>
            <div className={styles.icon}>
                <img loading='lazy' decoding='async' src={icon} alt={name} />
                {underConstruction?<div className={styles.underConstruction}><Tool /></div>:null}
            </div>
        </NavLink>
    )
}

const SideBar = () => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    const setCurrentMobileSection = useSetRecoilState(currentMobileSectionAtom)

    const sidebarButtons = [
        {
            name: company.journals,
            icon: '/logos/journals.png',
            link: allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:allRoutes&&allRoutes['date']&&allRoutes['book']?`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}`:`/${company.subsidiary}/dashboard/${company.journals}`,
            underConstruction: false,
            func: ()=>{
                if(window.innerWidth<1450){
                    if(document.getElementById('bookSection')){
                        document.getElementById('bookSection').style.transform = 'translateX(0%)'
                    }
                    if(document.getElementById('journalSideSection')){
                        document.getElementById('journalSideSection').style.transform = 'translateX(-100%)'
                    }
                    if(document.getElementById('journalMainSection')){
                        document.getElementById('journalMainSection').style.transform = 'translateX(-100%)'
                    }
                    if(document.getElementById('journalCalendar')){
                        document.getElementById('journalCalendar').style.transform = 'translateX(-100%)'
                    }
                    setCurrentMobileSection(0)
                }
            }
        },
        {
            name: company.schedule,
            icon: '/logos/schedule.png',
            link: allRoutes&&allRoutes['scheduleSection']?`/${company.subsidiary}/dashboard/${company.schedule}/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'all':allRoutes['scheduleSection']==='events'?allRoutes['event']?allRoutes['event']:'':''}`:`/${company.subsidiary}/dashboard/${company.schedule}/habits`,
            underConstruction: false,
            func: null
        },
        {
            name: company.notes,
            icon: '/logos/notes.png',
            link: `/${company.subsidiary}/dashboard/${company.notes}`,
            underConstruction: true,
            func: null
        },
        {
            name: company.finances,
            icon: '/logos/finances.png',
            link: `/${company.subsidiary}/dashboard/${company.finances}`,
            underConstruction: true,
            func: null
        },
        {
            name: company.fitness,
            icon: '/logos/fitness.png',
            link: `/${company.subsidiary}/dashboard/${company.fitness}`,
            underConstruction: true,
            func: null
        }
    ]

    return (
        <aside id='mainSideBar'>
            <div className={styles.logo}>
                <img loading='lazy' decoding='async' src='/logos/subsidiary.png' alt="Logo" />
            </div>
            {sidebarButtons.map((props)=>{
                return <IconButton {...props} key={props.name} />
            })}
            <div className={styles.options}>
                <DarkMode />
                <div className={styles.iconButton}>
                    <Power />
                    <p>Logout</p>
                </div>
            </div>
        </aside>
    )
}

export default SideBar