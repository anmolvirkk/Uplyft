import React from 'react'
import styles from './_calendar.module.sass'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import datesAtom from '../../recoil-atoms/datesAtom'
import slotsAtom from '../../recoil-atoms/slotsAtom'
import company from '../../../../../../../company'

const Calendar = () => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates] = useRecoilState(datesAtom)
    const [slots] = useRecoilState(slotsAtom)

    const setDateRoute = (date) => {
        setAllRoutes({...allRoutes, date: date})  
    }

    if(slots.length !== 0) {

        return <ul className={styles.calendar} id='journalCalendar'>
                    {dates ? dates.map((item, index)=>{
                        let date = new Date(item)
                        return <NavLink onMouseUp={()=>setDateRoute(date.valueOf())} to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${date.valueOf()}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} key={index} activeClassName={styles.activeDate}><h1>{index+1}</h1><p>{date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></NavLink>
                    }) : null}
                </ul>

    }else{
        return null
    }
}

export default Calendar