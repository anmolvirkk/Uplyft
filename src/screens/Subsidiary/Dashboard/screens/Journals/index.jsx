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

import setDate from '../../functions/setDate'
import datesAtom from './recoil-atoms/datesAtom'
import company from '../../../../../company'

const Journals = () => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates, setDates] = useRecoilState(datesAtom)

    useEffect(()=>{
        if(allRoutes['book']){
            setDate(allRoutes, setAllRoutes, dates, setDates)
        }
    }, [allRoutes, setAllRoutes, dates, setDates])

        return (
        <div className={styles.journals}>
            <Redirect to={Object.entries(allRoutes)&&allRoutes['book']&&allRoutes['date']&&allRoutes['book']?`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/${company.subsidiary}/dashboard/${company.journals}`} />
            <SideBar />

            <BookSection styles={styles} />

            <SlotsSection styles={styles} />

            <MainSection styles={styles} />

            {allRoutes&&allRoutes['book']&&allRoutes[[allRoutes['book']]]?<Calendar />:null}

        </div>
    )
}

export default Journals