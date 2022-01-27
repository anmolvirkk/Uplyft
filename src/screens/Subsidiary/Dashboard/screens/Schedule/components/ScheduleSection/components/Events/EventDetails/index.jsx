import React from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'
import { useRecoilState } from 'recoil'
import eventsAtom from '../../../../../recoil-atoms/eventsAtom'
import schdetailStyles from '../../_scheduleSection.module.sass'
import styles from './_eventdetails.module.sass'
import modalStyles from '../../../../../../../components/Modal/_modal.module.sass'

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
        <div id="eventtimersection" className={styles.eventTimerSection}>
            <p className={schdetailStyles.title} id="eventtimer">Time Until Start</p>
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
                <p className={schdetailStyles.title}>Event</p>
                <h3>{activeEvent.name}</h3>
                {activeEvent.tags.length>0?
                    <div className={styles.tags}>
                        <p className={schdetailStyles.title}>Tags</p>
                        <div className={modalStyles.tags}>
                            {activeEvent.tags.map((item, i)=><div className={`${modalStyles.tag} ${modalStyles.tagActive}`} key={i}><span>{item}</span></div>)}
                        </div>
                    </div>
                :null}
                {activeEvent.details!==''?
                    <div className={styles.detailsWrapper}>
                        <p className={schdetailStyles.title}>Details</p>
                        <p className={styles.details}>{activeEvent.details}</p>
                    </div>
                :null}
                {activeEvent.start||activeEvent.deadline?
                    <div className={styles.eventTimes}>
                        {activeEvent.start?
                            <div className={styles.eventTimesWrapper}>
                                <p className={schdetailStyles.title}>Start</p>
                                <div className={styles.eventDateWrapper}>
                                    <div className={styles.eventDateBlock}>
                                        <div className={styles.eventDateDay}>
                                            {new Date(activeEvent.start).toLocaleDateString('en-US', {day: '2-digit'})}
                                        </div>
                                        <div className={styles.eventDate}>
                                            {new Date(activeEvent.start).toLocaleDateString('en-US', {month: 'short', year: '2-digit'})}
                                        </div>
                                    </div>
                                    <div className={styles.eventTimeWrapper}>
                                        <div className={styles.eventTime}>
                                            <span className={styles.hour}>{new Date(activeEvent.start).toLocaleTimeString('en-US', {hour: '2-digit'}).slice(0, 2)}</span>
                                            <span className={styles.min}>:{new Date(activeEvent.start).toLocaleTimeString('en-US', {minute: '2-digit', second: '2-digit'}).slice(0, 2)}</span>
                                            <span className={styles.ampm}>{new Date(activeEvent.start).toLocaleTimeString('en-US', {hour: '2-digit'}).slice(-2)}</span>
                                        </div>
                                        <div className={styles.eventDay}>{new Date(activeEvent.start).toLocaleDateString('en-US', {weekday: 'long'})}</div>
                                    </div>
                                </div>
                            </div>
                        :null}
                        {activeEvent.start&&activeEvent.deadline?<hr className={styles.eventTimeDivider} />:null}
                        {activeEvent.deadline?
                            <div className={styles.eventTimesWrapper}>
                                <p className={schdetailStyles.title}>Deadline</p>
                                <div className={styles.eventDateWrapper}>
                                    <div className={styles.eventDateBlock}>
                                        <div className={styles.eventDateDay}>
                                            {new Date(activeEvent.deadline).toLocaleDateString('en-US', {day: '2-digit'})}
                                        </div>
                                        <div className={styles.eventDate}>
                                            {new Date(activeEvent.deadline).toLocaleDateString('en-US', {month: 'short', year: '2-digit'})}
                                        </div>
                                    </div>
                                    <div className={styles.eventTimeWrapper}>
                                        <div className={styles.eventTime}>
                                            <span className={styles.hour}>{new Date(activeEvent.deadline).toLocaleTimeString('en-US', {hour: '2-digit'}).slice(0, 2)}</span>
                                            <span className={styles.min}>:{new Date(activeEvent.deadline).toLocaleTimeString('en-US', {minute: '2-digit', second: '2-digit'}).slice(0, 2)}</span>
                                            <span className={styles.ampm}>{new Date(activeEvent.deadline).toLocaleTimeString('en-US', {hour: '2-digit'}).slice(-2)}</span>
                                        </div>
                                        <div className={styles.eventDay}>{new Date(activeEvent.deadline).toLocaleDateString('en-US', {weekday: 'long'})}</div>
                                    </div>
                                </div>
                            </div>
                        :null}
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
