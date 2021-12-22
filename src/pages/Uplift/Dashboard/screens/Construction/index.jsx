import React from 'react'
import { Book, Clock } from 'react-feather'
import { NavLink } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import styles from './_construction.module.sass'

const Construction = () => {
    return (
        <div style={{display: 'flex'}}>
        <SideBar />
        <div className={styles.mainSection}>
                <h1>This Section is Coming Soon</h1>
                <p>Until Then, Enjoy These Instead!</p>
                <div className={styles.alternatives}>
                    <NavLink to={'/uplift/dashboard/journals'}>
                        <Book />
                        Journals
                    </NavLink>
                    <NavLink to={'/uplift/dashboard/schedule'}>
                        <Clock />
                        Schedule
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Construction
