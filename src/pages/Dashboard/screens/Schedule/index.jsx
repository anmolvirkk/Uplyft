import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import Calendar from './components/Calendar'

const Schedule = () => (
    <div style={{display: 'flex'}}>
        <SideBar />
        <ScheduleSection />
        <Calendar />
    </div>
)

export default Schedule