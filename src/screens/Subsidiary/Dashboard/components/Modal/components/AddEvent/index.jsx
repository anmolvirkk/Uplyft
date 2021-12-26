import React, { useState } from 'react'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, AlignLeft, Flag, Navigation, Plus } from 'react-feather'

import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors } from '../../../../variables/journalConfig'

import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'
import eventsAtom from '../../../../screens/Schedule/recoil-atoms/eventsAtom'
import eventTagsAtom from './eventTagsAtom'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import allRoutesAtom from '../../../../screens/Journals/recoil-atoms/allRoutesAtom'

const AddEvent = ({type, currentEvent}) => {

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const date = new Date()

    const [event, setEvent] = useState(currentEvent?{
        id: currentEvent.id,
        name: currentEvent.name,
        details: currentEvent.details,
        start: currentEvent.start!==null?new Date(currentEvent.start):null,
        deadline: currentEvent.deadline!==null?new Date(currentEvent.deadline):null,
        color: currentEvent.color,
        notes: currentEvent.notes,
        tags: currentEvent.tags
    }:{
        id: date.valueOf(),
        name: '',
        details: '',
        start: null,
        deadline: null,
        color: 0,
        notes: [],
        tags: []
    })

    const [events, setEvents] = useRecoilState(eventsAtom)

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

    const submitHabit = () => {
            if(type === 'add'){
                setEvents([...events, event])
                setAllCalendarEvents([...allCalendarEvents, {
                    title: event.name,
                    start: event.start,
                    end: event.deadline,
                    id: event.id,
                    type: 'event',
                    color: colors[event.color],
                    notes: [...event.notes],
                    tags: [...event.tags]
                }])
                setAllRoutes({...allRoutes, event: event.id})
            }else if(type==='edit'){
                let newEvents = events.map((item)=>{
                    let newItem = {...item}
                    if(item.id === event.id){
                        newItem.name = event.name
                        newItem.details = event.details
                        newItem.start = event.start
                        newItem.deadline = event.deadline
                        newItem.color = event.color
                        newItem.notes = [...event.notes]
                        newItem.tags = [...event.tags]
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

    const [notesAutoFocus, setNotesAutoFocus] = useState(false)
    const [saveCurrentNote, setSaveCurrentNote] = useState('')

    const notesOnBlur = (val) => {
        setNotesAutoFocus(false)
        setSaveCurrentNote(val)
    }

    const addNote = (e) => {
        if(e.key === 'Enter'){
            setEvent({...event, notes: [...event.notes, e.target.value]})
            setSaveCurrentNote('')
        }
    }

    const editNote = (val, index) => {
        let newNotes = event.notes.map((item, i)=>{
            let newItem = item
            if(i===index){
                if(val!==''){
                    newItem = val
                }else{
                    newItem = null
                }
            }
            return newItem
        })
        setEvent({...event, notes: newNotes.filter(i=>i!==null)})
    }

    const [tags, setTags] = useRecoilState(eventTagsAtom)

    const addTagInputWithValue = (e) => {
        if(e.target.childNodes[0]){
            if(e.target.childNodes[0].parentNode.classList){
                e.target.childNodes[0].parentNode.classList.add(styles.tagInput)
                e.target.childNodes[0].contentEditable = 'true'
                e.target.childNodes[0].focus()
            }
        }
    }

    const resetAddTagBtn = () => {
        let shouldReset = false
        let elementIndex = 0
        for(let i=0; i<document.getElementsByClassName(styles.addTag).length; i++){
            if(document.getElementsByClassName(styles.addTag)[i].childNodes[0].contentEditable === 'true'){
                shouldReset = true
                elementIndex = i
            }
        }
        if(shouldReset){
            document.getElementsByClassName(styles.addTag)[elementIndex].childNodes[0].parentNode.classList.remove(styles.tagInput)
            document.getElementsByClassName(styles.addTag)[elementIndex].childNodes[0].contentEditable = 'false'
            document.getElementsByClassName(styles.addTag)[elementIndex].childNodes[0].textContent = ''
        }
    }
    
    const appendTag = (e) => {
        let shouldAppend = true
        if(e.target.textContent === ''){
            shouldAppend = false
        }
        tags.forEach((item)=>{
            if(item.toLowerCase() === e.target.textContent.toLowerCase()){
                shouldAppend = false
            }
        })
        if(shouldAppend){
            setTags([...tags, e.target.textContent])
            setEvent({...event, tags: [...event.tags, e.target.textContent]})
        }
    }

    const removeTag = (e) => {
        let thisTag = e[0].innerHTML
        let newTags = tags.filter((item)=>{
            return item!==thisTag
        })
        let newEventTags = event.tags.filter((item)=>{
            return item!==thisTag
        })
        setTags([...newTags])
        setEvent({...event, tags: [...newEventTags]})
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
                        <div className={styles.eventNotes}>
                            <p>Notes</p>
                            <ul>
                                {event.notes.map((note, i)=>{
                                    return <li key={i}><input defaultValue={note} onBlur={(e)=>editNote(e.target.value, i)} /></li>
                                })}
                                <li>
                                    <input defaultValue={saveCurrentNote} autoFocus={notesAutoFocus} onBlur={(e)=>notesOnBlur(e.target.value)} onFocus={()=>setNotesAutoFocus(true)} type="text" onKeyUp={(e)=>addNote(e)} placeholder='Add Note...' />
                                </li>
                            </ul>
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
                        <div className={styles.taskInputSection} style={{marginTop: '1.5vh'}}>
                            <p><span>Tags</span></p>
                            <div className={styles.tags}>
                                {tags.map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?event.tags.includes(item)?setEvent({...event, tags: [...event.tags.filter((val)=>val!==item)]}):setEvent({...event, tags: [...event.tags, item]}):null} key={index} className={`${styles.tag} ${event.tags.includes(item)?styles.tagActive:null}`}><span>{item}</span><X onClick={(e)=>removeTag(e.target.parentNode.childNodes, 'tags')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTag(e)}><span></span><Plus /></div></OutsideClickHandler>
                            </div>
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