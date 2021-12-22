import React from 'react'
import styles from './_sidebar.module.sass'
import {Home, Book, Clock, Activity, Power, DollarSign, File, Tool} from 'react-feather'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import DarkMode from './components/DarkMode'
import company from '../../../../../company'

const IconButton = ({name, icon, link, underConstruction}) => {
    return (
        <NavLink className={styles.iconButton} to={link} activeClassName={styles.activeIconButton} exact={link===`/${company.subsidiary}/dashboard`}>
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
            link: `/${company.subsidiary}/dashboard`,
            underConstruction: true
        },
        {
            name: company.journals,
            icon: <Book />,
            link: allRoutes&&allRoutes['date']&&allRoutes['book']&&allRoutes[allRoutes['book']][allRoutes['date']]?`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/${company.subsidiary}/dashboard/${company.journals}`,
            underConstruction: false
        },
        {
            name: company.schedule,
            icon: <Clock />,
            link: allRoutes&&allRoutes['scheduleSection']?`/${company.subsidiary}/dashboard/${company.schedule}/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'all':allRoutes['scheduleSection']==='events'?allRoutes['event']?allRoutes['event']:'':''}`:`/${company.subsidiary}/dashboard/${company.schedule}/habits`,
            underConstruction: false
        },
        {
            name: company.notes,
            icon: <File />,
            link: `/${company.subsidiary}/dashboard/${company.notes}`,
            underConstruction: true
        },
        {
            name: company.finances,
            icon: <DollarSign />,
            link: `/${company.subsidiary}/dashboard/${company.finances}`,
            underConstruction: true
        },
        {
            name: company.fitness,
            icon: <Activity />,
            link: `/${company.subsidiary}/dashboard/${company.fitness}`,
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