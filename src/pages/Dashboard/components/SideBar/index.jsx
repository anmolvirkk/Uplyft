import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, RefreshCcw, Activity, Settings, Power, Menu} from 'react-feather'
import { NavLink } from 'react-router-dom'

const IconButton = ({name, icon, allRoutes}) => {
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

const SideBar = ({allRoutes}) => {
    return (
        <aside>
            {SidebarButtons.map((props)=>{
                return <IconButton {...props} key={props.name} allRoutes={allRoutes} />
            })}
        </aside>
    )
}

export default SideBar