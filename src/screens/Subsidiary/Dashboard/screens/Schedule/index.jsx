import React from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'
import { useRecoilState } from 'recoil'
import { Redirect } from 'react-router'
import allRoutesAtom from '../Journals/recoil-atoms/allRoutesAtom'
import company from '../../../../../company'
import MobileHeader from './components/MobileHeader'

const Schedule = () => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    // const isMobile = (window.innerWidth < 1450)
    return (
        <div style={{display: 'flex'}}>
            <Redirect to={allRoutes&&allRoutes['scheduleSection']?`/${company.subsidiary}/dashboard/${company.schedule}/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'':''}`:`/${company.subsidiary}/dashboard/${company.schedule}/habits`} />
            <SideBar />
            <ScheduleSection />
            <MainCalendar />
            <MobileHeader />
        </div>
    )
}

export default Schedule