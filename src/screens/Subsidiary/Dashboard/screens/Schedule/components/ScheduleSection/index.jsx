import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import {RefreshCw, Check, Calendar} from 'react-feather'
import styles from './_main.module.sass'
import Habits from './components/Habits'
import Tasks from './components/Tasks'
import Events from './components/Events'
import HabitDetails from './components/Habits/HabitDetails'
import { useRecoilState } from 'recoil'
import allRoutesAtom from '../../../Journals/recoil-atoms/allRoutesAtom'
import TaskDetails from './components/Tasks/TaskDetails'
import EventDetails from './components/Events/EventDetails'
import company from '../../../../../../../company'


const isMobile = window.innerWidth < 1450
const mobileHeight = window.innerHeight - 80 - 60

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
        <div className={styles.sideSection} style={isMobile?{height: mobileHeight}:null}>
            <div className={styles.sectionHeader}>
                <NavLink onMouseUp={()=>setRoute('habits')} to={allRoutes['habit']?`/${company.subsidiary}/dashboard/${company.schedule}/habits/${allRoutes['habit']}`:`/${company.subsidiary}/dashboard/${company.schedule}/habits`} activeClassName={styles.activeSection}><RefreshCw /></NavLink>
                <NavLink onMouseUp={()=>setRoute('tasks')} to={allRoutes['project']?`/${company.subsidiary}/dashboard/${company.schedule}/tasks/${allRoutes['project']}`:`/${company.subsidiary}/dashboard/${company.schedule}/tasks/all`} activeClassName={styles.activeSection}><Check /></NavLink>
                <NavLink onMouseUp={()=>setRoute('events')} to={allRoutes['event']?`/${company.subsidiary}/dashboard/${company.schedule}/events/${allRoutes['event']}`:`/${company.subsidiary}/dashboard/${company.schedule}/events`} activeClassName={styles.activeSection}><Calendar /></NavLink>
            </div>
            <Switch>
                <Route path={`/${company.subsidiary}/dashboard/${company.schedule}/habits`}><Habits /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.schedule}/tasks`}><Tasks /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.schedule}/events`}><Events /></Route>
            </Switch>
        </div>
    )
}

const DetailSection = () => (
    
    <div className={`${styles.sideSection}`} style={isMobile?{height: mobileHeight}:null}>
        <Switch>
            <Route path={`/${company.subsidiary}/dashboard/${company.schedule}/habits`}><HabitDetails /></Route>
            <Route path={`/${company.subsidiary}/dashboard/${company.schedule}/tasks`}><TaskDetails /></Route>
            <Route path={`/${company.subsidiary}/dashboard/${company.schedule}/events`}><EventDetails /></Route>
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