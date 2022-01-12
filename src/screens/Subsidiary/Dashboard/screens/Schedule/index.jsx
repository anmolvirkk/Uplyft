import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Redirect } from 'react-router'
import allRoutesAtom from '../Journals/recoil-atoms/allRoutesAtom'
import company from '../../../../../company'
import MobileHeader from './components/MobileHeader'
import scheduleAddDropDownAtom from './recoil-atoms/scheduleAddDropDownAtom'
import styles from './_schedule.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite/build/OutsideClickHandler'
import { Calendar, Check, Folder, RefreshCw } from 'react-feather'
import modalConfigAtom from '../Journals/recoil-atoms/modalConfigAtom'

const Schedule = () => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    const isMobile = (window.innerWidth < 1450)
    const [scheduleAddDropDown, setScheduleAddDropDown] = useRecoilState(scheduleAddDropDownAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    return (
        <div style={{display: 'flex'}}>
            <Redirect to={allRoutes&&allRoutes['scheduleSection']?`/${company.subsidiary}/dashboard/${company.schedule}/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'':''}`:`/${company.subsidiary}/dashboard/${company.schedule}/habits`} />
            <SideBar />
            <ScheduleSection />
            <MainCalendar isMobile={isMobile} />
            <MobileHeader />
            {scheduleAddDropDown?
                    <div className={styles.scheduleAddDropDown}>
                        <OutsideClickHandler onOutsideClick={()=>setScheduleAddDropDown(false)}>
                            <button onClick={()=>setModalConfig({type: 'addhabit'})}><RefreshCw /><p>Add Habit</p></button>
                            <button onClick={()=>setModalConfig({type: 'addProject'})}><Folder /><p>Add Project</p></button>
                            <button onClick={()=>setModalConfig({type: 'addTask'})}><Check /><p>Add Task</p></button>
                            <button onClick={()=>setModalConfig({type: 'addEvent'})}><Calendar /><p>Add Event</p></button>
                        </OutsideClickHandler>
                    </div>
            :null}
        </div>
    )
}

export default Schedule