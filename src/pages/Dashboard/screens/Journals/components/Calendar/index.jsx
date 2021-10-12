import React from 'react'
import styles from './_calendar.module.sass'

const Calendar = ({journalData, currentBook, currentDate}) => {
    if(journalData.length !== 0) {

        return <ul className={styles.calendar}>
                    {journalData.map((props)=>{
                        if(props.id === currentBook){
                            return props.dates.map((props2, index)=>{
                                return <li key={index}><h1 className={currentDate.toDateString() === props2.date.toDateString() ? styles.activeDate : null}>Day <span>{index+1}</span></h1><p>{props2.date.toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"})}</p></li>
                            })
                        }
                        return null
                    })}    
                </ul>

    }else{
        return null
    }
}

export default Calendar