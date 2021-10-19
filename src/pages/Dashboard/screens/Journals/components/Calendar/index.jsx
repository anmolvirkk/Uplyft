import React from 'react'
import styles from './_calendar.module.sass'
import { NavLink } from 'react-router-dom'

const Calendar = ({dates, slots, allRoutes, setAllRoutes}) => {
   
    const setDateRoute = (date) => {
        allRoutes['date'] = date
        setAllRoutes({...allRoutes})
    }

    if(slots.length !== 0) {

        return <ul className={styles.calendar}>
                    <li className={styles.calendarTitle}>Day</li>
                    {dates ? dates.map((item, index)=>{
                        let date = new Date(item)
                        return <NavLink onMouseDown={()=>setDateRoute(date.valueOf())} to={`/journals/${allRoutes['date']}/${allRoutes['book']}/${allRoutes[allRoutes['date']][allRoutes['book']]}`} key={index} activeClassName={styles.activeDate}><h1>{index+1}</h1><p>{date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></NavLink>
                    }) : null}
                </ul>

    }else{
        return null
    }
}

export default Calendar