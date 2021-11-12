import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'

const Schedule = () => (
    <div style={{display: 'flex'}}>
        <SideBar />
        <ScheduleSection />
        <MainCalendar />
    </div>
)

export default Schedule