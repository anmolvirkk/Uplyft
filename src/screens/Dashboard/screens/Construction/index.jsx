import React from 'react'
import { NavLink } from 'react-router-dom'
import company from '../../../../company'
import SideBar from '../../components/SideBar'
import styles from './_construction.module.sass'

const Construction = ({color}) => {
    const isMobile = (window.innerWidth < 1450)
    return (
        <div style={{display: 'flex', flexFlow: isMobile?'column-reverse':null}}>
        <SideBar />
        <div className={styles.mainSection} style={{height: `${window.innerHeight-80}px`}}>
                <h1 style={{backgroundImage: color}}>This Section is Coming Soon</h1>
                <p>Until Then, Enjoy These Instead!</p>
                <div className={styles.alternatives}>
                    <NavLink to={`/dashboard/${company.journals}`}>
                        <img src='/logos/journals.png' alt={company.journals} />
                        {company.journals}
                    </NavLink>
                    <NavLink to={`/dashboard/${company.schedule}`}>
                        <img src='/logos/schedule.png' alt={company.journals} />
                        {company.schedule}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Construction
