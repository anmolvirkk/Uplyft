import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'
import { useRecoilState } from 'recoil'
import allCalendarEventsAtom from './recoil-atoms/allCalendarEventsAtom'

const Schedule = () => {
    const [allCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    return (
        <div style={{display: 'flex'}}>
            <SideBar />
            <ScheduleSection />
            {allCalendarEvents.length>0?<MainCalendar />:null}
        </div>
    )
}

export default Schedule