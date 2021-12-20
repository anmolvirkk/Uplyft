import React from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'
import { useRecoilState } from 'recoil'
import eventsAtom from '../../../../../recoil-atoms/eventsAtom'
import styles from './_eventdetails.module.sass'

const TimeRemaining = () => {
    let sec, min, hour, days
    const timeLeft = () => {
        if(document.getElementById('eventTimer')){
            if(document.getElementById('eventStart').innerText && document.getElementById('eventDeadline').innerText){
                const start = new Date(document.getElementById('eventStart').innerText)
                const deadline = new Date(document.getElementById('eventDeadline').innerText)
                let now = new Date()
                if((start.getTime() - now.getTime()) <= 0){
                    if((deadline.getTime() - now.getTime()) <= 0){
                        clearInterval(startTimer)
                        document.getElementById('eventTimer').innerText = 'Time Over'
                        document.getElementById('days').innerText = 0
                        document.getElementById('hour').innerText = 0
                        document.getElementById('min').innerText = 0
                        document.getElementById('sec').innerText = 0
                    }else{
                        sec = Math.floor((deadline.getTime() - now.getTime())/1000)
                        min = Math.floor(sec/60)
                        hour = Math.floor(min/60)
                        days = Math.floor(days/24)
                        document.getElementById('eventTimer').innerText = 'Time Until Deadline'
                    }
                }else{
                    sec = Math.floor((start.getTime() - now.getTime())/1000)
                    min = Math.floor(sec/60)
                    hour = Math.floor(min/60)
                    days = Math.floor(days/24)
                    document.getElementById('eventTimer').innerText = 'Time Until Start'
                }
                hour %= 24
                min %= 60
                sec %= 60
                if(!isNaN(days)){
                    document.getElementById('days').innerText = days
                }else{
                    document.getElementById('days').innerText = 0
                }
                if(!isNaN(hour)){
                    document.getElementById('hour').innerText = hour
                }else{
                    document.getElementById('hour').innerText = 0
                }
                if(!isNaN(min)){
                    document.getElementById('min').innerText = min
                }else{
                    document.getElementById('min').innerText = 0
                }
                if(!isNaN(sec)){
                    document.getElementById('sec').innerText = sec
                }else{
                    document.getElementById('sec').innerText = 0
                }
            }
        }
    }
    let startTimer = setInterval(timeLeft, 1000)
    return (
        <div>
            <p className={styles.title} id="eventTimer">Time Until Start</p>
            <div className={styles.timer}>
                <div className={styles.timerBlock}>
                    <div id="days">0</div><span>Days</span>
                </div>
                <div className={styles.timerBlock}>
                    <div id="hour">0</div><span>Hours</span>
                </div>
                <div className={styles.timerBlock}>
                    <div id="min">0</div><span>Minutes</span>
                </div>
                <div className={styles.timerBlock}>
                    <div id="sec">0</div><span>Seconds</span>
                </div>
            </div>
        </div>
    )
}

const EventDetails = () => {
    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [events] = useRecoilState(eventsAtom)
    let activeEvent = events.filter(i=>i.id===allRoutes.event)[0]
    if(activeEvent){
        return (
            <div className={`${journalStyles.slotSection} ${styles.eventDetails}`}>
                <h3>{activeEvent.name}</h3>
                <p>{activeEvent.details}</p>
                <p className={styles.title}>Start</p>
                <div id="eventStart" className={styles.time}>{new Date(activeEvent.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                <p className={styles.title}>Deadline</p>
                <div id="eventDeadline" className={styles.time}>{new Date(activeEvent.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                <TimeRemaining />
                {activeEvent.tags.length>0?
                    <div>
                        <p className={styles.title}>Tags</p>
                        <div className={styles.tagsContainer}>
                            {activeEvent.tags.map((item, i)=><div className={styles.tags} key={i}>{item}</div>)}
                        </div>
                    </div>
                :null}
                {activeEvent.notes.length>0?
                    <div>
                        <p className={styles.title}>Notes</p>
                        <ul className={styles.notes}>
                            {activeEvent.notes.map((item, i)=>{
                                return <li key={i}>{item}</li>
                            })}
                        </ul>
                    </div>
                :null}
            </div>
        )
    }else{
        return null
    }
}

export default EventDetails
