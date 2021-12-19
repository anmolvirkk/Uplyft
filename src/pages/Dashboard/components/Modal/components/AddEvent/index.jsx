import React, { useState } from 'react'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, AlignLeft, Flag, Navigation } from 'react-feather'

import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors } from '../../../../variables/journalConfig'

import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'
import eventsAtom from '../../../../screens/Schedule/recoil-atoms/eventsAtom'

const AddEvent = ({type, currentEvent}) => {

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const date = new Date()

    const [event, setEvent] = useState(currentEvent?{
        id: currentEvent.id,
        name: currentEvent.name,
        details: currentEvent.details,
        start: currentEvent.start!==null?new Date(currentEvent.start):null,
        deadline: currentEvent.deadline!==null?new Date(currentEvent.deadline):null,
        color: currentEvent.color
    }:{
        id: date.valueOf(),
        name: '',
        details: '',
        start: null,
        deadline: null,
        color: 0
    })

    const [events, setEvents] = useRecoilState(eventsAtom)

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)

    const submitHabit = () => {
            if(type === 'add'){
                setEvents([...events, event])
                setAllCalendarEvents([...allCalendarEvents, {
                    title: event.name,
                    start: event.start,
                    end: event.deadline,
                    id: event.id,
                    type: 'event',
                    color: colors[event.color]
                }])
            }else if(type==='edit'){
                let newEvents = events.map((item)=>{
                    let newItem = {...item}
                    if(item.id === event.id){
                        newItem.name = event.name
                        newItem.details = event.details
                        newItem.start = event.start
                        newItem.deadline = event.deadline
                        newItem.color = event.color
                    }
                    return newItem
                })
                setEvents([...newEvents])
                let newAllCalendarEvents = allCalendarEvents.map((data)=>{
                    let newData = {...data}
                        if(data.id === event.id) {
                            newData.title = event.name
                            newData.start = event.start
                            newData.end = event.deadline
                            newData.color = colors[event.color]
                        }
                    return newData
                })
                setAllCalendarEvents([...newAllCalendarEvents])
            }
        setModalConfig({type: ''})
    }

    const HabitForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.taskInput}>
                        <div className={styles.taskInputSection}>
                            <input defaultValue={event.name} onBlur={(e)=>setEvent({...event, name: e.target.value})} placeholder='New Task' />
                        </div>
                        <div className={styles.taskInputSection}>
                            <div className={styles.inputWithIcon}>
                                <AlignLeft />
                                <input type="text" defaultValue={event.details} placeholder="Add Details" onBlur={(e)=>setEvent({...event, details: e.target.value})} />
                            </div>
                        </div>
                        <div className={styles.setDates}>
                            <div className={`${styles.inputWithIcon}`}>
                                <Navigation />
                                <Datetime initialValue={event.start?event.start:'Add Start Date'} onClose={(e)=>setEvent({...event, start: e._d})} />         
                            </div>
                            <div className={`${styles.inputWithIcon}`}>
                                <Flag />
                                <Datetime initialValue={event.deadline?event.deadline:'Add Deadline'} onClose={(e)=>setEvent({...event, deadline: new Date(e._d).getHours()===0&&new Date(e._d).getMinutes()===0?(new Date(e._d).setMinutes(new Date(e._d).getMinutes()-1)):e._d})} />        
                            </div>
                        </div>
                        <div className={`${styles.editJournal} ${styles.addHabit} ${styles.habitCustomize}`}>
                            <ul>
                                <li className={styles.eventColors}>
                                    <ol className={styles.colors}>
                                        {colors.map((color, i)=><li className="colorButtons" onClick={()=>setEvent({...event, color: i})} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===event.color ? styles.activeButton : null} /></li>)}
                                    </ol>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
                <div className={`${styles.footer} ${styles.taskFooter}`}>
                    <button className={styles.cancelBtn} onClick={()=>setModalConfig({type: ''})}>Back</button>
                    <button className={styles.continueBtn} onClick={submitHabit}>Continue</button>
                </div>
            </div>
        )
    }

    return (
        <div className={`${styles.form} ${styles.addTask}`} id='modalForm'>
                <div className={styles.header}>
                    <p>{type} Event</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <HabitForm />
            </div>
    )
}

export default AddEvent
