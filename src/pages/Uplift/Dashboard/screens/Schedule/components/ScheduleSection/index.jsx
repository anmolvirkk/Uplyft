import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import {RefreshCw, Check, Calendar} from 'react-feather'
import styles from './_main.module.sass'
import journalStyles from '../../../Journals/_journal.module.sass'
import Habits from './components/Habits'
import Tasks from './components/Tasks'
import Events from './components/Events'
import HabitDetails from './components/Habits/HabitDetails'
import { useRecoilState } from 'recoil'
import allRoutesAtom from '../../../Journals/recoil-atoms/allRoutesAtom'
import TaskDetails from './components/Tasks/TaskDetails'
import EventDetails from './components/Events/EventDetails'

const SideSection = () => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

    const setRoute = (id) => {
        if(!allRoutes.project && id==='tasks'){
            setAllRoutes({...allRoutes, project: 'all', scheduleSection: id})
        }else{
            setAllRoutes({...allRoutes, scheduleSection: id})
        }
    }

    return (
        <div className={journalStyles.sideSection}>
            <div className={styles.sectionHeader}>
                <NavLink onMouseUp={()=>setRoute('habits')} to={allRoutes['habit']?`/schedule/habits/${allRoutes['habit']}`:`/schedule/habits`} activeClassName={styles.activeSection}><RefreshCw /></NavLink>
                <NavLink onMouseUp={()=>setRoute('tasks')} to={allRoutes['project']?`/schedule/tasks/${allRoutes['project']}`:`/schedule/tasks/all`} activeClassName={styles.activeSection}><Check /></NavLink>
                <NavLink onMouseUp={()=>setRoute('events')} to={allRoutes['event']?`/schedule/events/${allRoutes['event']}`:`/schedule/events`} activeClassName={styles.activeSection}><Calendar /></NavLink>
            </div>
            <Switch>
                <Route path="/schedule/habits"><Habits /></Route>
                <Route path="/schedule/tasks"><Tasks /></Route>
                <Route path="/schedule/events"><Events /></Route>
            </Switch>
        </div>
    )
}

const DetailSection = () => (
    
    <div className={`${journalStyles.sideSection} ${journalStyles.detailSection}`}>
        <Switch>
            <Route path="/schedule/habits"><HabitDetails /></Route>
            <Route path="/schedule/tasks"><TaskDetails /></Route>
            <Route path="/schedule/events"><EventDetails /></Route>
        </Switch>
    </div>

)

const ScheduleSection = () => {
    return (
        <React.Fragment>
            <SideSection />
            <DetailSection />
        </React.Fragment>
)
}

export default ScheduleSection