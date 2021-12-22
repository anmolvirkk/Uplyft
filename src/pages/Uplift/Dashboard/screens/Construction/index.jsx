import React from 'react'
import { Book, Clock } from 'react-feather'
import { NavLink } from 'react-router-dom'
import company from '../../../../../company'
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
                    <NavLink to={`/${company.subsidiary}/dashboard/${company.journals}`}>
                        <Book />
                        {company.journals}
                    </NavLink>
                    <NavLink to={`/${company.subsidiary}/dashboard/${company.schedule}`}>
                        <Clock />
                        {company.schedule}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Construction
