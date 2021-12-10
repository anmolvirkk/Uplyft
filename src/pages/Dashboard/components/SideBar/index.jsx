import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, Clock, Activity, Settings, Power, Menu, DollarSign, File} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import DarkMode from './components/DarkMode'

const IconButton = ({name, icon}) => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    return (
    name!=="menu" ?
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
    <NavLink className={styles.iconButton} to={allRoutes&&allRoutes['scheduleSection']?`/schedule/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'':''}`:`/schedule/habits`} activeClassName={styles.activeIconButton}>
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
        name: 'notes',
        icon: <File />
    },
    {
        name: 'finances',
        icon: <DollarSign />
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
            {SidebarButtons.map((props)=>{
                return <IconButton {...props} key={props.name} />
            })}
            <DarkMode />
            <IconButton name="Logout" icon={<Power />} />
        </aside>
    )
}

export default SideBar