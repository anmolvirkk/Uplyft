import React, {useEffect} from 'react'
import styles from './_journal.module.sass'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'
import SideBar from '../../components/SideBar'
import { Redirect } from 'react-router'
import Calendar from './components/Calendar'

import {useRecoilState} from 'recoil'

import setDate from '../../functions/setDate'
import company from '../../../../company'
import MobileHeader from './components/MobileHeader'

import { datesAtom, allRoutesAtom } from '../../allAtoms'
import Settings from '../../components/Settings'

const Journals = React.memo(({updateBackend, updateAtoms}) => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates, setDates] = useRecoilState(datesAtom)
    const isMobile = (window.innerWidth <= 640)
    useEffect(()=>{
        if(allRoutes['book']){
            setDate(allRoutes, setAllRoutes, dates, setDates)
        }
    }, [allRoutes, setAllRoutes, dates, setDates])

        return (
        <div className={styles.journals}>
            <Redirect to={Object.entries(allRoutes)&&allRoutes['book']&&allRoutes['date']?`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/dashboard/${company.journals}`} />
            
            <SideBar />

            <Settings updateBackend={updateBackend} updateAtoms={updateAtoms} />

            <BookSection styles={styles} isMobile={isMobile} />

            <SlotsSection styles={styles} isMobile={isMobile} />

            <MainSection styles={styles} isMobile={isMobile} />
            
            {allRoutes&&allRoutes['book']&&allRoutes[[allRoutes['book']]]?<Calendar isMobile={isMobile} />:null}

            {isMobile?<MobileHeader />:null}

        </div>
    )
})

export default Journals