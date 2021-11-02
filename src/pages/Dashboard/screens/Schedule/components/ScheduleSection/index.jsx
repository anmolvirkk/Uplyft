import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import {RefreshCw, Check, Calendar} from 'react-feather'
import styles from './_main.module.sass'
import journalStyles from '../../../Journals/_journal.module.sass'
import Habits from './components/Habits'
import Tasks from './components/Tasks'
import Events from './components/Events'

const ScheduleSection = () => {
    return (
    <div className={journalStyles.sideSection}>
        <div className={styles.sectionHeader}>
            <NavLink to={`/schedule/habits`} activeClassName={styles.activeSection}><RefreshCw /></NavLink>
            <NavLink to={`/schedule/tasks`} activeClassName={styles.activeSection}><Check /></NavLink>
            <NavLink to={`/schedule/events`} activeClassName={styles.activeSection}><Calendar /></NavLink>
        </div>
        <Switch>
            <Route path="/schedule/habits"><Habits /></Route>
            <Route path="/schedule/tasks"><Tasks /></Route>
            <Route path="/schedule/events"><Events /></Route>
        </Switch>
    </div>
)
}

export default ScheduleSection