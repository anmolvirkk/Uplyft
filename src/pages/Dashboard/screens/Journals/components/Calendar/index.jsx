import React, {useState} from 'react'
import styles from './_calendar.module.sass'
import { NavLink, Redirect } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import datesAtom from '../../recoil-atoms/datesAtom'
import slotsAtom from '../../recoil-atoms/slotsAtom'

const Calendar = () => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates] = useRecoilState(datesAtom)
    const [slots] = useRecoilState(slotsAtom)

    const [newDate, setNewDate] = useState(null)

    let resetDate = async () => {
        setNewDate(null)
    }
   
    const setDateRoute = (date) => {
        resetDate().then(()=>{
            setAllRoutes({...allRoutes, date: date})    
            setNewDate(date.valueOf())
            console.log(date.valueOf())
        })
    }

    if(slots.length !== 0) {

        return <ul className={styles.calendar} id='journalCalendar'>
                    {newDate ? <Redirect to={`/journals/${allRoutes['book']}/${newDate}/`} /> : null}
                    <li className={styles.calendarTitle}>Day</li>
                    {dates ? dates.map((item, index)=>{
                        let date = new Date(item)
                        return <NavLink onMouseUp={()=>setDateRoute(date.valueOf())} to={`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} key={index} activeClassName={styles.activeDate}><h1>{index+1}</h1><p>{date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></NavLink>
                    }) : null}
                </ul>

    }else{
        return null
    }
}

export default Calendar