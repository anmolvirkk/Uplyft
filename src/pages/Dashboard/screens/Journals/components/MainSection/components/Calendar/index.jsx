import React, {useEffect} from 'react'
import styles from './_calendar.module.sass'

const Calendar = ({currentBook, currentDate, dates, setDates, slots}) => {
    
    let date = {
        date: new Date()
    }

    const addDate = () => {
        if(dates[currentBook]){
            dates[currentBook].push(date)
            setDates({...dates})
        }else{
            dates[currentBook] = []
            dates[currentBook].push(date)
            setDates({...dates})
        }
    }

    useEffect(()=>{
        if(Object.entries(dates).length !== 0){
            for(let key in dates){
                if(parseInt(key) === currentBook){
                    let todaysDate = new Date()
                    if(dates[key].length !== 0){
                        if(dates[key][dates[key].length-1].date.toDateString() !== todaysDate.toDateString()){
                            addDate()
                        }
                    }else{
                        addDate()
                    }
                }
            }
        }else{
            addDate()
        }
    })

    if(slots.length !== 0) {

        return <ul className={styles.calendar}>
                    <li className={styles.calendarTitle}>Day</li>
                    {dates[currentBook] ? dates[currentBook].map((item, index)=>{
                        return <li key={index}><h1 className={currentDate.toDateString() === item.date.toDateString() ? styles.activeDate : null}>{index+1}</h1><p>{item.date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></li>
                    }) : null}
                </ul>

    }else{
        return null
    }
}

export default Calendar