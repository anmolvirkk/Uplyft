import React from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'
import { useRecoilState } from 'recoil'
import eventsAtom from '../../../../../recoil-atoms/eventsAtom'
import styles from './_eventdetails.module.sass'
import schdetailStyles from '../../_scheduleSection.module.sass'

let allIntervals = []

const TimeRemaining = () => {
    let sec, min, hour, days
    const timeLeft = () => {
        if(document.getElementById('eventtimer')){
            let start, deadline
            let now = new Date()
            if(document.getElementById('eventStart')){
                if((new Date(document.getElementById('eventStart').innerText).getTime() - now.getTime()) > 0){
                    start = new Date(document.getElementById('eventStart').innerText)
                    sec = Math.floor((start.getTime() - now.getTime())/1000)
                    min = Math.floor(sec/60)
                    hour = Math.floor(min/60)
                    days = Math.floor(hour/24)
                    document.getElementById('eventtimer').innerText = 'Time Until Start'
                }
            }
            if(document.getElementById('eventDeadline')){
                if(!start && (new Date(document.getElementById('eventDeadline').innerText).getTime() - now.getTime()) > 0){
                    deadline = new Date(document.getElementById('eventDeadline').innerText)
                    sec = Math.floor((deadline.getTime() - now.getTime())/1000)
                    min = Math.floor(sec/60)
                    hour = Math.floor(min/60)
                    days = Math.floor(hour/24)
                    document.getElementById('eventtimer').innerText = 'Time Until Deadline'
                }
            }
            hour %= 24
            min %= 60
            sec %= 60
            if(days||hour||min||sec){
                document.getElementById('eventdays').innerText = days
                document.getElementById('eventhour').innerText = hour
                document.getElementById('eventmin').innerText = min
                document.getElementById('eventsec').innerText = sec
                document.getElementById('eventtimersection').style.display = 'block'
            }else{
                clearInterval(startTimer)
                allIntervals.forEach((item)=>{
                    clearInterval(item)
                })
                document.getElementById('eventtimersection').style.display = 'none'
            }
        }else{
            clearInterval(startTimer)
            allIntervals.forEach((item)=>{
                clearInterval(item)
            })
        }
    }
    let startTimer = setInterval(timeLeft, 1000)
    allIntervals.forEach((item)=>{
        clearInterval(item)
    })
    allIntervals.push(startTimer)
    return (
        <div id="eventtimersection">
            <p className={schdetailStyles.title} id="eventtimer">Time Until Start</p>
            <div className={schdetailStyles.timer}>
                <div className={schdetailStyles.timerBlock}>
                    <div id="eventdays">0</div><span>Days</span>
                </div>
                <div className={schdetailStyles.timerBlock}>
                    <div id="eventhour">0</div><span>Hours</span>
                </div>
                <div className={schdetailStyles.timerBlock}>
                    <div id="eventmin">0</div><span>Minutes</span>
                </div>
                <div className={schdetailStyles.timerBlock}>
                    <div id="eventsec">0</div><span>Seconds</span>
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
            <div className={`${journalStyles.slotSection} ${schdetailStyles.details}`}>
                <h3>{activeEvent.name}</h3>
                <p>{activeEvent.details}</p>
                {activeEvent.start?
                    <div>
                        <p className={schdetailStyles.title}>Start</p>
                        <div id="eventStart" className={schdetailStyles.time}>{new Date(activeEvent.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                :null}
                {activeEvent.deadline?
                    <div>
                        <p className={schdetailStyles.title}>Deadline</p>
                        <div id="eventDeadline" className={schdetailStyles.time}>{new Date(activeEvent.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                :null}
                <TimeRemaining />
                {activeEvent.tags.length>0?
                    <div>
                        <p className={schdetailStyles.title}>Tags</p>
                        <div className={schdetailStyles.tagsContainer}>
                            {activeEvent.tags.map((item, i)=><div className={schdetailStyles.tags} key={i}>{item}</div>)}
                        </div>
                    </div>
                :null}
                {activeEvent.notes.length>0?
                    <div>
                        <p className={schdetailStyles.title}>Notes</p>
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
