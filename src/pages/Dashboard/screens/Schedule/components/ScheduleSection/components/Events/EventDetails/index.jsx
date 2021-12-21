import React, {useState} from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'
import { useRecoilState } from 'recoil'
import eventsAtom from '../../../../../recoil-atoms/eventsAtom'
import styles from './_eventdetails.module.sass'

let allIntervals = []

const TimeRemaining = () => {
    let sec, min, hour, days
    const [showTimer, setShowTimer] = useState(false)
    const timeLeft = () => {
        if(!showTimer){
            setShowTimer(true)
        }
        if(document.getElementById('timer')){
            let start, deadline
            let now = new Date()
            if(document.getElementById('eventStart')){
                if((new Date(document.getElementById('eventStart').innerText).getTime() - now.getTime()) > 0){
                    start = new Date(document.getElementById('eventStart').innerText)
                    sec = Math.floor((start.getTime() - now.getTime())/1000)
                    min = Math.floor(sec/60)
                    hour = Math.floor(min/60)
                    days = Math.floor(hour/24)
                    document.getElementById('timer').innerText = 'Time Until Start'
                }
            }
            if(document.getElementById('eventDeadline')){
                if(!start && (new Date(document.getElementById('eventDeadline').innerText).getTime() - now.getTime()) > 0){
                    deadline = new Date(document.getElementById('eventDeadline').innerText)
                    sec = Math.floor((deadline.getTime() - now.getTime())/1000)
                    min = Math.floor(sec/60)
                    hour = Math.floor(min/60)
                    days = Math.floor(hour/24)
                    document.getElementById('timer').innerText = 'Time Until Deadline'
                }
            }
            hour %= 24
            min %= 60
            sec %= 60
            if(days||hour||min||sec){
                document.getElementById('days').innerText = days
                document.getElementById('hour').innerText = hour
                document.getElementById('min').innerText = min
                document.getElementById('sec').innerText = sec
            }else{
                clearInterval(startTimer)
                setShowTimer(false)
            }
        }
    }
    allIntervals.forEach((item)=>{
        clearInterval(item)
    })
    let startTimer = setInterval(timeLeft, 1000)
    allIntervals.push(startTimer)
    if(showTimer){
        return (
            <div>
                <p className={styles.title} id="timer">Time Until Start</p>
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
    }else{
        return null
    }
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
                {activeEvent.start?
                    <div>
                        <p className={styles.title}>Start</p>
                        <div id="eventStart" className={styles.time}>{new Date(activeEvent.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                :null}
                {activeEvent.deadline?
                    <div>
                        <p className={styles.title}>Deadline</p>
                        <div id="eventDeadline" className={styles.time}>{new Date(activeEvent.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                :null}
                <TimeRemaining start={new Date(activeEvent.start)} deadline={new Date(activeEvent.deadline)} />
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
