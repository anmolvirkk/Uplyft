import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import HabitSection from './components/HabitSection'
import Calendar from './components/Calendar'

const Schedule = () => (
    <div style={{display: 'flex'}}>
        <SideBar />
        <ScheduleSection />
        <HabitSection />
        <Calendar />
    </div>
)

export default Schedule