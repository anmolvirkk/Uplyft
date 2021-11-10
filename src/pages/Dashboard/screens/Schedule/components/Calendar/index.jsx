import React from 'react'
import styles from './_main.module.sass'

import habitsAtom from '../../recoil-atoms/habitsAtom'
import { useRecoilState } from 'recoil'
import { colors } from '../../../../variables/journalConfig'

const getTimes = () => {
    let times = []
    for(let i=0; i<24; i++){
        if(i < 12){
            if(i !== 0){
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
        )
        date.setDate(date.getDate() +1)
    }
    return week
}



document.addEventListener('mouseover', function(e) {
    if(e.target.classList.contains(styles.calendarItem)){
        if(e.target.getElementsByTagName('h3')[0].scrollWidth > e.target.getElementsByTagName('h3')[0].offsetWidth){
             e.target.classList.add(styles.overflownSlot)
        }else if(e.target.classList.contains(styles.overflownSlot)) {
            e.target.classList.remove(styles.overflownSlot)
        }
    }
})

const CalendarItem = ({color, time, name, slot, width, zIndex}) => {
    let to = {
        h: time.to.split(':')[0],
        m: time.to.split(':')[1]
    }
    let from = {
        h: time.from.split(':')[0],
        m: time.from.split(':')[1]
    }
    const convertTileLocation = () => {
        if(to.h < from.h){
            return {
                top: `${(from.h/24+from.m/60)*100}%`,
                height: `calc(${(((24-from.h)/24+(to.m-from.m)/60)*100)}%)`,
                extended: {
                    top: `0%`,
                    height: `calc(${(((to.h)/24+(to.m-from.m)/60)*100)}%)`
                }
            }
        }else{
            return {
                top: `${(from.h/24+from.m/60)*100}%`,
                height: `calc(${(((to.h-from.h)/24+(to.m-from.m)/60)*100)}%)`,
                extended: null
            }
        }
    }
    const convertTimeFormat = (time24) => {
        let ts = time24
        let H = +ts.substr(0, 2)
        let h = (H % 12) || 12
        let ampm = H < 12 ? " am" : " pm"
        ts = h + ts.substr(2, 3) + ampm
        return ts
    }
    
    return (
        <div>
            <div data-title={name} className={`${styles.calendarItem} calendarItem`} id={`${slot.day}_${slot.habit}`} style={{backgroundColor: color, top: convertTileLocation().top, height: convertTileLocation().height, width: width, zIndex: zIndex}}>
                <h3>{name}</h3>
                <p>{convertTimeFormat(time.from)} - {convertTimeFormat(time.to)}</p>
            </div>
            {convertTileLocation().extended!==null?
                <div data-title={name} className={`${styles.calendarItem} calendarItem`} style={{backgroundColor: color, top: convertTileLocation().extended.top, height: convertTileLocation().extended.height, width: width, zIndex: zIndex}}>
                    <h3>{name}</h3>
                    <p>{convertTimeFormat(time.from)} - {convertTimeFormat(time.to)}</p>
                </div>
            : null}
        </div>
    )
}

const Calendar = () => {

    const [habits] = useRecoilState(habitsAtom)

    return (
        <div className={styles.calendar}>
            <div className={styles.time}>
                <div className={styles.timeTile}>
                    <p></p><hr />
                </div>
                {getTimes().map((item, index)=>(
                    <div className={styles.timeTile} key={index}>
                        <p>{item}</p><hr />
                    </div>
                ))}
                <div className={styles.timeTile}>
                    <p></p><hr />
                </div>
            </div>
            {currentWeek().map((item, index)=>(
                <div key={index} className={styles.week} id="weekColumn">
                    <div className={styles.weekTitle}>
                        <p>{item.toLocaleDateString('en-us', { weekday:"short"})}</p>
                        <h3>{item.toLocaleDateString('en-us', {day:"numeric"})}</h3>
                    </div>
                    <div className={styles.weekContent}>
                        {habits.map((habit, i)=>{
                            if(habit.repeat[item.toLocaleDateString('en-us', {weekday:"short"}).toLowerCase()]){
                                return habit.repeat[item.toLocaleDateString('en-us', {weekday:"short"}).toLowerCase()].map((week)=>{
                                    return <CalendarItem key={`${index}_${i}`} color={colors[habit.color]} time={week} name={habit.name} slot={{day: index, habit: i}} width={habit.width} zIndex={habit.zIndex} />
                                })
                            }
                            return null
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Calendar