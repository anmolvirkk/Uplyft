import React, {useEffect} from 'react'
import styles from './_journal.module.sass'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'
import SideBar from '../../components/SideBar'
import { Redirect } from 'react-router'
import Calendar from './components/Calendar'

import {useRecoilState} from 'recoil'
import allRoutesAtom from './recoil-atoms/allRoutesAtom'

import setDate from './functions/setDate'
import datesAtom from './recoil-atoms/datesAtom'

const Journals = () => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates, setDates] = useRecoilState(datesAtom)

    useEffect(()=>{
        setDate(allRoutes, setAllRoutes, dates, setDates)
    }, [allRoutes, setAllRoutes, dates, setDates])

        return (
        <div style={{display: 'flex'}}>
            <Redirect to={Object.entries(allRoutes).length!==0?`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/journals`} />
            <SideBar />

            <BookSection styles={styles} />

            <SlotsSection styles={styles} />

            <MainSection styles={styles} />

            {allRoutes&&allRoutes['book']&&allRoutes[[allRoutes['book']]]?<Calendar />:null}

        </div>
    )
}

export default Journals