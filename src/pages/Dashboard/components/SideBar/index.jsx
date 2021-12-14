import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, Clock, Activity, Power, DollarSign, File, Tool} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import DarkMode from './components/DarkMode'

const IconButton = ({name, icon, link, underConstruction}) => {
    return (
        <NavLink className={styles.iconButton} to={link} activeClassName={styles.activeIconButton} exact={link==='/'}>
            {icon}
            <p>{name}</p>
            {underConstruction?<div className={styles.underConstruction}><Tool /></div>:null}
        </NavLink>
    )
}

const SideBar = () => {
    const [allRoutes] = useRecoilState(allRoutesAtom)

    const sidebarButtons = [
        {
            name: 'home',
            icon: <Home />,
            link: '/',
            underConstruction: true
        },
        {
            name: 'journals',
            icon: <Book />,
            link: allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:'/journals',
            underConstruction: false
        },
        {
            name: 'schedule',
            icon: <Clock />,
            link: allRoutes&&allRoutes['scheduleSection']?`/schedule/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'all':''}`:'/schedule/habits',
            underConstruction: false
        },
        {
            name: 'notes',
            icon: <File />,
            link: '/notes',
            underConstruction: true
        },
        {
            name: 'finances',
            icon: <DollarSign />,
            link: '/finances',
            underConstruction: true
        },
        {
            name: 'fitness',
            icon: <Activity />,
            link: '/fitness',
            underConstruction: true
        }
    ]

    return (
        <aside>
            <div className={styles.logo}>
                <img src='/logo.png' alt="Logo" />
            </div>
            {sidebarButtons.map((props)=>{
                return <IconButton {...props} key={props.name} />
            })}
            <DarkMode />
            <div className={styles.iconButton}>
                <Power />
                <p>Logout</p>
            </div>
        </aside>
    )
}

export default SideBar