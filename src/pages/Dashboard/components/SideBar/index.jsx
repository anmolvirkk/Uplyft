import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, RefreshCcw, Activity, Settings, Power, Menu} from 'react-feather'
import { NavLink } from 'react-router-dom'

const IconButton = ({name, icon, allRoutes, currentDate}) => {
    return (
    name!=="menu" && name!=="logout" ?
    name==="home" ?
    <NavLink exact className={styles.iconButton} to={`/`} activeClassName={styles.activeIconButton}>
        {icon}
        <p>{name}</p>
    </NavLink>
    :
    name==="journals" ?
    <NavLink className={styles.iconButton} to={currentDate&&allRoutes&&allRoutes['book']&&allRoutes[allRoutes['book']]&&allRoutes[allRoutes['book']].slot?`/${name}/${allRoutes['book']}/${currentDate.valueOf()}/${allRoutes[allRoutes['book']].slot}`:`/${name}`} activeClassName={styles.activeIconButton}>
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
        name: 'menu',
        icon: <Menu />
    },
    {
        name: 'home',
        icon: <Home />
    },
    {
        name: 'journals',
        icon: <Book />
    },
    {
        name: 'habits',
        icon: <RefreshCcw />
    },
    {
        name: 'fitness',
        icon: <Activity />
    },
    {
        name: 'settings',
        icon: <Settings />
    },
    {
        name: 'logout',
        icon: <Power />
    }
]

const SideBar = ({currentDate, allRoutes}) => {
    return (
        <aside>
            {SidebarButtons.map((props)=>{
                return <IconButton {...props} key={props.name} currentDate={currentDate} allRoutes={allRoutes} />
            })}
        </aside>
    )
}

export default SideBar