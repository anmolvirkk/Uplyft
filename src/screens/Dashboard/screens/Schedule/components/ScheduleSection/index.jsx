import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import {RefreshCw, Check, Calendar} from 'react-feather'
import styles from './_main.module.sass'
import Habits from './components/Habits'
import Tasks from './components/Tasks'
import Events from './components/Events'
import HabitDetails from './components/Habits/HabitDetails'
import { useRecoilState } from 'recoil'
import TaskDetails from './components/Tasks/TaskDetails'
import EventDetails from './components/Events/EventDetails'
import company from '../../../../../../company'
import { allRoutesAtom } from '../../../../allAtoms'


const isMobile = window.innerWidth < 639

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
        <div className={styles.sideSection} style={isMobile?{display: 'none'}:null}>
            <div className={styles.sectionHeader}>
                <NavLink onMouseUp={()=>setRoute('habits')} to={allRoutes['habit']?`/dashboard/${company.schedule}/habits/${allRoutes['habit']}`:`/dashboard/${company.schedule}/habits`} activeClassName={styles.activeSection}><RefreshCw /></NavLink>
                <NavLink onMouseUp={()=>setRoute('tasks')} to={allRoutes['project']?`/dashboard/${company.schedule}/tasks/${allRoutes['project']}`:`/dashboard/${company.schedule}/tasks/all`} activeClassName={styles.activeSection}><Check /></NavLink>
                <NavLink onMouseUp={()=>setRoute('events')} to={allRoutes['event']?`/dashboard/${company.schedule}/events/${allRoutes['event']}`:`/dashboard/${company.schedule}/events`} activeClassName={styles.activeSection}><Calendar /></NavLink>
            </div>
            <Switch>
                <Route path={`/dashboard/${company.schedule}/habits`}><Habits /></Route>
                <Route path={`/dashboard/${company.schedule}/tasks`}><Tasks /></Route>
                <Route path={`/dashboard/${company.schedule}/events`}><Events /></Route>
            </Switch>
        </div>
    )
}

const DetailSection = ({mobileHeight}) => {
    return (
        <div className={`${styles.sideSection}`} style={isMobile?{height: mobileHeight}:null} id='scheduleSideSection'>
            <Switch>
                <Route path={`/dashboard/${company.schedule}/habits`}><HabitDetails /></Route>
                <Route path={`/dashboard/${company.schedule}/tasks`}><TaskDetails /></Route>
                <Route path={`/dashboard/${company.schedule}/events`}><EventDetails /></Route>
            </Switch>
        </div>
    )
}

const ScheduleSection = () => {
    const mobileHeight = window.innerHeight - 80 - 60

    return (
        <React.Fragment>
            <SideSection />
            <DetailSection mobileHeight={mobileHeight} />
        </React.Fragment>
)
}

export default ScheduleSection