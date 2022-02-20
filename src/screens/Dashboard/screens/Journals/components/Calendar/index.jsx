import React, {useEffect} from 'react'
import styles from './_calendar.module.sass'
import { NavLink } from 'react-router-dom'

import {useRecoilState} from 'recoil'
import company from '../../../../../../company'
import { allRoutesAtom, datesAtom, slotsAtom } from '../../../../allAtoms'

const Calendar = ({isMobile}) => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates] = useRecoilState(datesAtom)
    const [slots] = useRecoilState(slotsAtom)

    const setDateRoute = (date) => {
        setAllRoutes({...allRoutes, date: date})  
    }

    useEffect(()=>{
        if(document.getElementById('journalCalendar')){
            if(isMobile){
                document.getElementById('journalCalendar').scrollLeft = document.getElementById('journalCalendar').scrollWidth
            }else{
                document.getElementById('journalCalendar').scrollTop = document.getElementById('journalCalendar').scrollHeight
            }
        }
    })

    const showCalendar = slots&&slots[allRoutes.book]&&slots[allRoutes.book][allRoutes.date]?slots[allRoutes.book][allRoutes.date]:false

    return <ul className={styles.calendar} id='journalCalendar' style={{opacity: showCalendar?1:0}}>
                {dates ? dates.map((item, index)=>{
                    let date = new Date(item)
                    return <NavLink onMouseUp={()=>setDateRoute(date.valueOf())} to={`/dashboard/${company.journals}/${allRoutes['book']}/${date.valueOf()}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} key={index} activeClassName={styles.activeDate}><h1>{index+1}</h1><p>{date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></NavLink>
                }) : null}
            </ul>
}

export default Calendar