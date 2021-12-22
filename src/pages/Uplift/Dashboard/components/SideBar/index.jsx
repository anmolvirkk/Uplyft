import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, Clock, Activity, Power, DollarSign, File, Tool} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import DarkMode from './components/DarkMode'

const IconButton = ({name, icon, link, underConstruction}) => {
    return (
        <NavLink className={styles.iconButton} to={link} activeClassName={styles.activeIconButton} exact={link==='/uplift/dashboard'}>
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
            link: '/uplift/dashboard',
            underConstruction: true
        },
        {
            name: 'journals',
            icon: <Book />,
            link: allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/uplift/dashboard/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:'/uplift/dashboard/journals',
            underConstruction: false
        },
        {
            name: 'schedule',
            icon: <Clock />,
            link: allRoutes&&allRoutes['scheduleSection']?`/uplift/dashboard/schedule/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'all':allRoutes['scheduleSection']==='events'?allRoutes['event']?allRoutes['event']:'':''}`:'/uplift/dashboard/schedule/habits',
            underConstruction: false
        },
        {
            name: 'notes',
            icon: <File />,
            link: '/uplift/dashboard/notes',
            underConstruction: true
        },
        {
            name: 'finances',
            icon: <DollarSign />,
            link: '/uplift/dashboard/finances',
            underConstruction: true
        },
        {
            name: 'fitness',
            icon: <Activity />,
            link: '/uplift/dashboard/fitness',
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