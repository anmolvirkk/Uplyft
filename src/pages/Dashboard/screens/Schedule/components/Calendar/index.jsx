import React from 'react'
import styles from './_main.module.sass'

const getTimes = () => {
    let times = []
    for(let i=0; i<24; i++){
        if(i < 12){
            if(i === 0){
                times.push(`12 am`)
            }else{
                times.push(`${i} am`)
            }
        }else{
            if(i === 12){
                times.push(`12 pm`)
            }else{
                times.push(`${i-12} pm`)
            }
        }
    }
    return times
}

const currentWeek = () => {
    let date = new Date()    
    let week = []
    date.setDate((date.getDate() - date.getDay() +1))
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(date)
        );
        date.setDate(date.getDate() +1)
    }
    return week
}

const Calendar = () => {
    return (
        <div className={styles.calendar}>
            <div className={styles.time}>
                {getTimes().map((item, index)=>(
                    <div className={styles.timeTile} key={index}>
                        <p>{item}</p><hr />
                    </div>
                ))}
            </div>
            {currentWeek().map((item, index)=>(
                <div key={index} className={styles.week}>
                    <div className={styles.weekTitle}>
                        <p>{item.toLocaleDateString('en-us', { weekday:"short"})}</p>
                        <h3>{item.toLocaleDateString('en-us', {day:"numeric"})}</h3>
                    </div>
                    <div className={styles.weekContent}>
                        {item.toLocaleDateString('en-us', { month:"short", day:"numeric", year:"numeric"})}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Calendar