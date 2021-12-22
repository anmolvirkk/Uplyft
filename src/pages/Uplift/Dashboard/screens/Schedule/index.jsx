import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'
import { useRecoilState } from 'recoil'
import allCalendarEventsAtom from './recoil-atoms/allCalendarEventsAtom'
import { Redirect } from 'react-router'
import allRoutesAtom from '../Journals/recoil-atoms/allRoutesAtom'

const Schedule = () => {
    const [allCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [allRoutes] = useRecoilState(allRoutesAtom)
    return (
        <div style={{display: 'flex'}}>
            <Redirect to={allRoutes&&allRoutes['scheduleSection']?`/schedule/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'':''}`:'/schedule/habits'} />
            <SideBar />
            <ScheduleSection />
            {allCalendarEvents.length>0?<MainCalendar />:null}
        </div>
    )
}

export default Schedule