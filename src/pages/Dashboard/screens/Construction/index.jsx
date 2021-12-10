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
                    <div className={styles.button}>
                        <Book />
                        <NavLink to={'/journals'}>
                            Journals
                        </NavLink>
                    </div>
                    <div className={styles.button}>
                        <Clock />
                        <NavLink to={'/schedule'}>
                            Schedule
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Construction
