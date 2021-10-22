import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import HabitSection from './components/HabitSection'

const Schedule = () => (
    <div style={{display: 'flex'}}>
        <SideBar />
        <ScheduleSection />
        <HabitSection />
    </div>
)

export default Schedule