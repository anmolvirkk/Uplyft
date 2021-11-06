import React from 'react'
import styles from './_calendar.module.sass'

import { ChevronLeft, ChevronRight } from 'react-feather'

const getDaysInMonth = (month, year) => {
    var thisMonthDate = new Date(year, month, 1)
    var days = []
    while (thisMonthDate.getMonth() === month) {
      days.push(new Date(thisMonthDate))
      thisMonthDate.setDate(thisMonthDate.getDate() + 1)
    }
    return days
}

const Calendar = ({item}) => {

    let date = new Date()
    
    const changeMonth = {
        back: () => {
            console.log('month')
        },
        forward: () => {
            console.log('year')
        }
    }

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <ChevronLeft onClick={changeMonth.back} />
                    <p>{date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</p>
                <ChevronRight onClick={changeMonth.forward} />
            </div>
            <div className={styles.week}>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
            </div>
            <div className={styles.dates}>
                {getDaysInMonth(date.getMonth(), date.getFullYear()).map((item, index)=>{
                    return <div className={styles.date} key={index}>{item.getDate()}</div>
                })}
            </div>
        </div>
    )
}

export default Calendar
