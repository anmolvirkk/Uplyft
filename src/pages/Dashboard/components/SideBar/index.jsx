import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, Clock, Activity, Settings, Power, Menu} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import DarkMode from './components/DarkMode'

const IconButton = ({name, icon}) => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    return (
    name!=="menu" && name!=="logout" ?
    name==="home" ?
    <NavLink exact className={styles.iconButton} to={`/`} activeClassName={styles.activeIconButton}>
        {icon}
        <p>{name}</p>
    </NavLink>
    :
    name==="journals" ?
    <NavLink className={styles.iconButton} to={allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/journals`} activeClassName={styles.activeIconButton}>
        {icon}
        <p>{name}</p>
    </NavLink>
    :
    name==="schedule" ?
    <NavLink className={styles.iconButton} to={allRoutes&&allRoutes['habit']&&allRoutes['scheduleSection']?`/schedule/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']:''}`:`/schedule/habits`} activeClassName={styles.activeIconButton}>
        {icon}
        <p>{name}</p>
    </NavLink>
    :
    <NavLink className={styles.iconButton} to={`/${name}`} activeClassName={styles.activeIconButton}>
        {icon}
        <p>{name}</p>
    </NavLink>
    :
    <button className={styles.iconButton}>
        {icon}
        <p>{name}</p>
    </button>
)
}

const SidebarButtons = [
    {
        name: 'home',
        icon: <Home />
    },
    {
        name: 'journals',
        icon: <Book />
    },
    {
        name: 'schedule',
        icon: <Clock />
    },
    {
        name: 'fitness',
        icon: <Activity />
    },
    {
        name: 'settings',
        icon: <Settings />
    }
]

const SideBar = () => {
    return (
        <aside>
            <button className={styles.menuButton}>
                <Menu />
            </button>
            <div className={styles.sideButtons}>
                {SidebarButtons.map((props)=>{
                    return <IconButton {...props} key={props.name} />
                })}
            </div>
            <div className={styles.lastButtonSection}>
                <DarkMode />
                <button className={styles.iconButton}>
                    <Power />
                    <p>Logout</p>
                </button>
            </div>
        </aside>
    )
}

export default SideBar