import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'
import { useRecoilState } from 'recoil'
import habitsAtom from './recoil-atoms/habitsAtom'

const Schedule = () => {
    const [habits] = useRecoilState(habitsAtom)
    return (
        <div style={{display: 'flex'}}>
            <SideBar />
            <ScheduleSection />
            {habits.length>0?<MainCalendar />:null}
        </div>
    )
}

export default Schedule