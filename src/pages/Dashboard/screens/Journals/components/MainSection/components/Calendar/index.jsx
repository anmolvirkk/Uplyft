import React, {useEffect} from 'react'
import styles from './_calendar.module.sass'
import { NavLink } from 'react-router-dom'

const Calendar = ({currentDate, dates, setDates, slots, allRoutes, setAllRoutes}) => {
    
    useEffect(()=>{

        let date = new Date()

        const addDate = () => {
            if(dates[allRoutes['book']]){
                dates[allRoutes['book']].push(date)
                setDates({...dates})
            }else{
                dates[allRoutes['book']] = []
                dates[allRoutes['book']].push(date)
                setDates({...dates})
            }
            allRoutes['date'] = date.valueOf()
            setAllRoutes({...allRoutes})
        }

        if(dates[allRoutes['book']]){

            dates[allRoutes['book']].forEach((item)=>{
                let todaysDate = new Date()
                let storedDate = new Date(item)
                if(todaysDate.toDateString() !== storedDate.toDateString()){
                    addDate()
                }
            })
            
        }else{
            addDate()
        }
    }, [allRoutes, dates, setDates, setAllRoutes])

    const setDateRoute = (date) => {
        allRoutes['date'] = date
        setAllRoutes({...allRoutes})
    }

    if(slots.length !== 0) {

        return <ul className={styles.calendar}>
                    <li className={styles.calendarTitle}>Day</li>
                    {dates[allRoutes['book']] ? dates[allRoutes['book']].map((item, index)=>{
                        let date = new Date(item)
                        return <NavLink onMouseDown={()=>setDateRoute(date.valueOf())} to={`/journals/${allRoutes['book']}/${date.valueOf()}/${allRoutes[allRoutes['book']].slot}`} key={index} activeClassName={styles.activeDate}><h1>{index+1}</h1><p>{date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></NavLink>
                    }) : null}
                </ul>

    }else{
        return null
    }
}

export default Calendar