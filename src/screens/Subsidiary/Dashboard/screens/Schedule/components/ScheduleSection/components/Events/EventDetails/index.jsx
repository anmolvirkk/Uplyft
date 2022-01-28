import React from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'
import { useRecoilState } from 'recoil'
import eventsAtom from '../../../../../recoil-atoms/eventsAtom'
import schdetailStyles from '../../_scheduleSection.module.sass'
import styles from './_eventdetails.module.sass'
import modalStyles from '../../../../../../../components/Modal/_modal.module.sass'
import {AlignLeft, Clock} from 'react-feather'

let allIntervals = []

const isMobile = window.innerWidth < 1450

const TimeRemaining = ({activeEvent}) => {
    let sec, min, hour, days
    const timeLeft = () => {
        if(document.getElementById('eventtimer')){
            let start, deadline
            let now = new Date()
            if(activeEvent.start){
                if((new Date(activeEvent.start).getTime() - now.getTime()) > 0){
                    start = new Date(activeEvent.start)
                    sec = Math.floor((start.getTime() - now.getTime())/1000)
                    min = Math.floor(sec/60)
                    hour = Math.floor(min/60)
                    days = Math.floor(hour/24)
                    document.getElementById('eventtimer').innerText = 'Time Until Start'
                }
            }
            if(activeEvent.deadline){
                if(!start && (new Date(activeEvent.deadline).getTime() - now.getTime()) > 0){
                    deadline = new Date(activeEvent.deadline)
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
                if(window.innerWidth < 1450){
                    document.getElementById('eventtimersection').style.display = 'flex'
                }else{
                    document.getElementById('eventtimersection').style.display = 'block'
                }
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
        <div id="eventtimersection" className={styles.eventTimerSection}>
            <p className={styles.title}>
                <Clock />
                <span id="eventtimer">Time Until Start</span>
            </p>
            <div className={styles.timer}>
                <div className={styles.timerBlock}>
                    <div id="eventdays">0</div><span>Days</span>
                </div>
                <div className={styles.timerBlock}>
                    <div id="eventhour">0</div><span>Hours</span>
                </div>
                <div className={styles.timerBlock}>
                    <div id="eventmin">0</div><span>Minutes</span>
                </div>
                <div className={styles.timerBlock}>
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
            <div className={`${journalStyles.slotSection} ${schdetailStyles.details} ${styles.eventSection}`} style={isMobile?{height: (window.innerHeight-80-60)+'px'}:null}>
                <h3>
                    <div className={styles.eventTitle}>
                        <span className={styles.colorTag} />
                        <span>{activeEvent.name}</span>
                    </div>
                    <div className={styles.eventDate}>
                        {activeEvent.start?new Date(activeEvent.start).toLocaleDateString('en-US', {weekday: 'long', day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'}):null} - <br />
                        {activeEvent.deadline?new Date(activeEvent.deadline).toLocaleDateString('en-US', {weekday: 'long', day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'}):null}
                    </div>
                </h3>
                {activeEvent.tags.length>0?
                    <div className={styles.tags}>
                        <div className={modalStyles.tags}>
                            {activeEvent.tags.map((item, i)=><div className={`${modalStyles.tag} ${modalStyles.tagActive}`} key={i}><span>{item}</span></div>)}
                        </div>
                    </div>
                :null}
                {activeEvent.details!==''?
                    <div className={styles.detailsWrapper}>
                        <p className={styles.title}>
                            <AlignLeft />
                            <span>Details</span>
                        </p>
                        <p className={styles.details}>{activeEvent.details}</p>
                    </div>
                :null}
                {activeEvent.start||activeEvent.deadline?<TimeRemaining activeEvent={activeEvent} />:null}
            </div>
        )
    }else{
        return null
    }
}

export default EventDetails
