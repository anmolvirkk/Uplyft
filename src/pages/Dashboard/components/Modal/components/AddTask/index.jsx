import React, {useEffect, useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Plus, Minus, AlignLeft, Flag, EyeOff, Navigation, Folder } from 'react-feather'

import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors } from '../../../../variables/journalConfig'

import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'

import TaskDeadline from './components/TaskDeadline'
import './datePicker.sass'
import projectsAtom from '../../../../screens/Schedule/recoil-atoms/projectsAtom'
import allRoutesAtom from '../../../../screens/Journals/recoil-atoms/allRoutesAtom'

import OutsideClickHandler from 'react-outside-click-handler-lite'
import tagsAtom from './tagsAtom'

const AddTask = ({type, currentTask}) => {

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const date = new Date()

    const [tags, setTags] = useRecoilState(tagsAtom)

    const reorderTags = (arr) => {
        return arr.slice().sort((a, b) => a.value - b.value)
    }

    const [task, setTask] = useState(currentTask?{
        id: currentTask.id,
        color: currentTask.color,
        icon: currentTask.icon,
        name: currentTask.name,
        repeat: currentTask.repeat
    }:{
        id: date.valueOf(),
        name: '',
        repeat: {
            unique: false,
            all: [
                {
                    from: "00:00",
                    to: "12:00"
                }
            ],
            mon: [{from: "00:00", to: "12:00"}],
            tue: [{from: "00:00", to: "12:00"}],
            wed: [{from: "00:00", to: "12:00"}],
            thu: [{from: "00:00", to: "12:00"}],
            fri: [{from: "00:00", to: "12:00"}],
            sat: [{from: "00:00", to: "12:00"}],
            sun: [{from: "00:00", to: "12:00"}]
        },
        details: '',
        deadline: null,
        start: null,
        priority: reorderTags(tags.priority)[0]?reorderTags(tags.priority)[0]:{
            value: 50,
            label: ''
        },
        effortRequired: reorderTags(tags.effortRequired)[0]?reorderTags(tags.effortRequired)[0]:{
            value: 50,
            label: ''
        },
        timeRequired: reorderTags(tags.timeRequired)[0]?reorderTags(tags.timeRequired)[0]:{
            value: 50,
            label: ''
        },
        skillsRequired: [],
        roles: [],
        tags: []
    })

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const submitHabit = () => {
        let times = {
            from: {
                h: parseInt(task.repeat.all[0].from.split(':')[0]),
                m: parseInt(task.repeat.all[0].from.split(':')[1])
            },
            to: {
                h: parseInt(task.repeat.all[0].to.split(':')[0]),
                m: parseInt(task.repeat.all[0].to.split(':')[1])
            }
        }
        let fromDate = new Date()
        fromDate.setHours(times.from.h)
        fromDate.setMinutes(times.from.m)
        let toDate = new Date()
        toDate.setHours(times.to.h)
        toDate.setMinutes(times.to.m)
        if(times.to.h < times.from.h){
            toDate.setDate(toDate.getDate()+1)
        }
        if(type === 'add'){
            setProjects([...projects, {...projects.find(i=>i.id===allRoutes['project']), tasks: [...projects.find(i=>i.id===allRoutes['project']).tasks, task]}])
            setAllCalendarEvents([...allCalendarEvents, {
                title: task.name,
                start: fromDate,
                end: toDate,
                color: colors[task.color],
                id: task.id
            }])
        }else if(type==='edit'){
            let newTasks = projects.find(i=>i.id===allRoutes['project']).tasks.map((data)=>{
                let newData = {...data}
                    if(data.id === currentTask.id) {
                        newData.id = task.id
                        newData.color = task.color
                        newData.icon = task.icon
                        newData.name = task.name
                        newData.repeat = task.repeat
                        newData.times = task.times
                    }
                return newData
            })
            setProjects([...projects, {...projects.find(i=>i.id===allRoutes['project']), tasks: [...newTasks]}])

            let newAllCalendarEvents = allCalendarEvents.map((data)=>{
                let newData = {...data}
                    if(data.id === currentTask.id) {
                        newData.title = task.name
                        newData.start = fromDate
                        newData.end = toDate
                        newData.color = colors[task.color]
                    }
                return newData
            })
            setAllCalendarEvents([...newAllCalendarEvents])
        }
        setModalConfig({type: ''})
    }
    

    const setTimeForAll = (val, index, type) => {
        let newRepeat = {}
        for(let key in task.repeat){
            if(task.repeat[key] !== null && key!=='unique'){
                let newTimes = task.repeat[key].map((data, i)=>{
                    let newData = {...data}
                        if(i === index) {
                            if(type === 'from'){
                                newData.from = val
                                newData.to = task.repeat.all[index].to
                            }else{
                                newData.from = task.repeat.all[index].from
                                newData.to = val
                            }
                        }
                    return newData
                })
                newRepeat = {...newRepeat, [key]: [...newTimes]}
            }
        }
        setTask({...task, repeat: {...task.repeat, ...newRepeat}})
    }

    const addAllTime = () => {
        let taskRepeat = {}
        for(let key in task.repeat){
            if(key!=='unique'){
                if(task.repeat[key] !== null){
                    let newData = [...task.repeat[key], {from: "00:00", to: "12:00"}]
                    taskRepeat = {...taskRepeat, [key]: [...newData]}
                }
            }else{
                taskRepeat = {...taskRepeat, [key]: task.repeat[key]}
            }
        }
        setTask({...task, repeat: {...task.repeat, ...taskRepeat}})
    }

    const removeTimeFromAll = (index) => {
        if(task.repeat.all.length!==1){
            let newTimes = task.repeat.all.filter((val, i)=>i!==index)
            setTask({...task, repeat: {...task.repeat, all: [...newTimes]}})
        }
    }

    const addUniqueTime = (day) => {
        for(let key in task.repeat){
            if(key === day){
                setTask({...task, repeat: {...task.repeat, [day]: [...task.repeat[day], {from: "00:00", to: "12:00"}]}})
            }
        }
    }

    const setTimeForUnique = (val, index, type, day) => {
        for(let key in task.repeat){
            if(key === day){
                let newTimes = task.repeat[day].map((data, i)=>{
                    let newData = {...data}
                        if(i === index) {
                            if(type === 'from'){
                                newData.from = val
                                newData.to = task.repeat[day][index].to
                            }else{
                                newData.from = task.repeat[day][index].from
                                newData.to = val
                            }
                        }
                    return newData
                })
                setTask({...task, repeat: {...task.repeat, [day]: [...newTimes]}})
            }
        }
    }
    
    const removeTimeFromUnique = (index, day) => {
        for(let key in task.repeat){
            if(key === day){
                if(task.repeat[day].length!==1){
                    let newTimes = task.repeat[day].filter((val, i)=>i!==index)
                    setTask({...task, repeat: {...task.repeat, [day]: [...newTimes]}})
                }
            }
        }
    }

    const Roles = () => {
        return (
            <div className={styles.roles}>
                <p><span>Add Role</span><EyeOff /></p>
                <ul>
                    <li>
                        <Plus />
                    </li>
                </ul>
            </div>
        )
    }

    const SkillsRequired = () => {
        return (
            <div>
                
            </div>
        )
    }

    const HabitForm = () => {

        useEffect(()=>{
            tags.priority.forEach((item)=>{
                if(item.value === task.priority.value){
                    if(item.label !== task.priority.label){
                        setTask({...task, priority: {...task.priority, label: item.label}})
                    }
                }
            })
        })

        const addTagInputWithValue = (e) => {
            if(e.target.childNodes[0]){
                if(e.target.childNodes[0].parentNode.classList){
                    e.target.childNodes[0].parentNode.classList.add(styles.tagInput)
                    e.target.childNodes[0].contentEditable = 'true'
                    e.target.childNodes[0].focus()
                }
            }
        }

        const appendTagWithValue = (e, type) => {
            let shouldAppend = true
            if(e.target.textContent === ''){
                shouldAppend = false
            }
            tags[type].forEach((item)=>{
                if(item.label === e.target.textContent){
                    shouldAppend = false
                }
                if(item.value === task[type].value){
                    shouldAppend = false
                }
            })
            if(shouldAppend){
                setTags({...tags, [type]: [...tags[type], {label: e.target.textContent, value: task[type].value}]})
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

        const removeTagWithValue = (e, type) => {
            let thisTag = {
                label: e[1].innerHTML,
                value: parseInt(e[0].innerHTML)
            }
            let newTags = tags[type].filter((item)=>{
                return item.label!==thisTag.label&&item.value!==thisTag.value
            })
            setTags({...tags, [type]: [...newTags]})
        }
        

        const appendTag = (e, type) => {
            let shouldAppend = true
            if(e.target.textContent === ''){
                shouldAppend = false
            }
            tags[type].forEach((item)=>{
                if(item === e.target.textContent){
                    shouldAppend = false
                }
            })
            if(shouldAppend){
                setTags({...tags, [type]: [...tags[type], e.target.textContent]})
                setTask({...task, [type]: [...task[type], e.target.textContent]})
            }
        }

        const removeTag = (e, type) => {
            let thisTag = e[0].innerHTML
            let newTags = tags[type].filter((item)=>{
                return item!==thisTag
            })
            let newTaskTags = task[type].filter((item)=>{
                return item!==thisTag
            })
            setTags({...tags, [type]: [...newTags]})
            setTask({...task, [type]: [...newTaskTags]})
        }
        
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.taskInput}>
                        <div className={styles.taskInputSection}>
                            <input defaultValue={task.name}  onBlur={(e)=>setTask({...task, name: e.target.value})} placeholder='New Task' />
                        </div>
                        <div className={styles.taskInputSection}>
                            <div className={styles.inputWithIcon}>
                                <AlignLeft />
                                <input type="text" placeholder="Add Details" />
                            </div>
                        </div>
                        <div className={styles.setDates}>
                            <div className={`${styles.inputWithIcon}`}>
                                <Navigation />
                                <DayPickerInput placeholder='Add Start Date' value={task.start} onDayChange={(e)=>setTask({...task, start: e})} />         
                            </div>
                            <div className={`${styles.inputWithIcon}`}>
                                <Flag />
                                <DayPickerInput placeholder='Add Deadline' value={task.deadline} onDayChange={(e)=>setTask({...task, deadline: e})} />        
                            </div>
                        </div>
                        <div className={styles.taskInputSection} style={{marginTop: '2.5vh'}}>
                            <p><span>Priority</span><EyeOff /></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.priority).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTask({...task, priority: {value: item.value, label: item.label}}):null} key={index} className={`${styles.tag} ${task.priority.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'priority')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'priority')}><span></span><div id="priorityTagValue">{task.priority.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('priorityTagValue').innerText = e.target.value} defaultValue={task.priority.value} onMouseUp={(e)=>setTask({...task, priority: {...task.priority, value: parseInt(e.target.value)}})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Time required</span><EyeOff /></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.timeRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTask({...task, timeRequired: {value: item.value, label: item.label}}):null} key={index} className={`${styles.tag} ${task.timeRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'timeRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'timeRequired')}><span></span><div id="timeRequiredTagValue">{task.timeRequired.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('timeRequiredTagValue').innerText = e.target.value} defaultValue={task.timeRequired.value} onMouseUp={(e)=>setTask({...task, timeRequired: {...task.timeRequired, value: parseInt(e.target.value)}})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Effort required</span><EyeOff /></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.effortRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTask({...task, effortRequired: {value: item.value, label: item.label}}):null} key={index} className={`${styles.tag} ${task.effortRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'effortRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'effortRequired')}><span></span><div id="effortRequiredTagValue">{task.effortRequired.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('effortRequiredTagValue').innerText = e.target.value} defaultValue={task.effortRequired.value} onMouseUp={(e)=>setTask({...task, effortRequired: {...task.effortRequired, value: parseInt(e.target.value)}})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Tags</span><EyeOff /></p>
                            <div className={styles.tags}>
                                {tags.tags.map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?task.tags.includes(item)?setTask({...task, tags: [...task.tags.filter((val)=>{return val!==item})]}):setTask({...task, tags: [...task.tags, item]}):null} key={index} className={`${styles.tag} ${task.tags.includes(item)?styles.tagActive:null}`}><span>{item}</span><X onClick={(e)=>removeTag(e.target.parentNode.childNodes, 'tags')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTag(e, 'tags')}><span></span><Plus /></div></OutsideClickHandler>
                            </div>
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Skills Required</span><EyeOff /></p>
                            <div className={styles.tags}>
                                {tags.skillsRequired.map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?task.skillsRequired.includes(item)?setTask({...task, skillsRequired: [...task.skillsRequired.filter((val)=>{return val!==item})]}):setTask({...task, skillsRequired: [...task.skillsRequired, item]}):null} key={index} className={`${styles.tag} ${task.skillsRequired.includes(item)?styles.tagActive:null}`}><span>{item}</span><X onClick={(e)=>removeTag(e.target.parentNode.childNodes, 'skillsRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTag(e, 'skillsRequired')}><span></span><Plus /></div></OutsideClickHandler>
                            </div>
                        </div>
                    </div>
                </form>
                <Roles />
                <SkillsRequired />
                <ul>
                    <li>
                        <div className={styles.tabselect} style={{marginBottom: '2vh', marginTop: '1vh'}}>
                            <div onClick={()=>setTask({...task, repeat: {...task.repeat, unique: false}})} className={!task.repeat.unique?styles.activeTab:null}>Same time for all days</div>
                            <div onClick={()=>setTask({...task, repeat: {...task.repeat, unique: true}})} className={task.repeat.unique?styles.activeTab:null}>Unique time for seperate days</div>
                        </div>

                        <div className={styles.daySelect}>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, mon: task.repeat.mon===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.mon!==null?styles.activeDay:null}>Mon</div>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, tue: task.repeat.tue===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.tue!==null?styles.activeDay:null}>Tue</div>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, wed: task.repeat.wed===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.wed!==null?styles.activeDay:null}>Wed</div>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, thu: task.repeat.thu===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.thu!==null?styles.activeDay:null}>Thu</div>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, fri: task.repeat.fri===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.fri!==null?styles.activeDay:null}>Fri</div>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, sat: task.repeat.sat===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.sat!==null?styles.activeDay:null}>Sat</div>
                                <div onClick={()=>setTask({...task, repeat: {...task.repeat, sun: task.repeat.sun===null?[{from: "00:00", to: "12:00"}]:null}})} className={task.repeat.sun!==null?styles.activeDay:null}>Sun</div>
                        </div>

                        <div className={styles.days} style={{display: !task.repeat.unique?'block':'none'}}>
                            {!task.repeat.unique?
                            <div>
                                {task.repeat.all.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForAll(e.target.value, index, 'from')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForAll(e.target.value, index, 'to')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromAll(index)} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={addAllTime} />
                            </div>
                            :null}
                        </div>
                        <div className={styles.days} style={{display: task.repeat.unique?'block':'none'}}>
                            {
                                task.repeat.mon!==null?
                                <div className={styles.day}>
                                <p>Monday</p>
                                {task.repeat.mon.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'mon')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'mon')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'mon')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('mon')} />
                                </div> : null
                            }
                            {
                                task.repeat.tue!==null?
                                <div className={styles.day}>
                                <p>Tuesday</p>
                                {task.repeat.tue.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'tue')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'tue')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'tue')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('tue')} />
                                </div> : null
                            }
                            {
                                task.repeat.wed!==null?
                                <div className={styles.day}>
                                <p>Wednesday</p>
                                {task.repeat.wed.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'wed')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'wed')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'wed')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('wed')} />
                                </div> : null
                            }
                            {
                                task.repeat.thu!==null?
                                <div className={styles.day}>
                                <p>Thurday</p>
                                {task.repeat.thu.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'thu')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'thu')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'thu')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('thu')} />
                                </div> : null
                            }
                            {
                                task.repeat.fri!==null?
                                <div className={styles.day}>
                                <p>Friday</p>
                                {task.repeat.fri.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'fri')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'fri')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'fri')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('fri')} />
                                </div> : null
                            }
                            {
                                task.repeat.sat!==null?
                                <div className={styles.day}>
                                <p>Saturday</p>
                                {task.repeat.sat.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'sat')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'sat')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'sat')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('sat')} />
                                </div> : null
                            }
                            {
                                task.repeat.sun!==null?
                                <div className={styles.day}>
                                <p>Sunday</p>
                                {task.repeat.sun.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'sun')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'sun')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'sun')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('sun')} />
                                </div> : null
                            }
                        </div>
                    </li>
                </ul>
                <div className={`${styles.footer} ${styles.taskFooter}`}>
                    <button className={styles.cancelBtn} onClick={()=>setModalConfig({type: ''})}>Back</button>
                    <button className={styles.continueBtn} onClick={submitHabit}>Continue</button>
                </div>
            </div>
        )
    }

    const [allRoutes] = useRecoilState(allRoutesAtom)
    
    return (
        <div className={`${styles.form} ${styles.addTask}`} id='modalForm'>
                <div className={styles.header}>
                    <p>{type} Task</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.taskNavigation}>
                {projects.find(i=>i.id===allRoutes['project'])?
                    <div className={styles.projectName}>
                        <Folder />
                        <p>
                            {projects.find(i=>i.id===allRoutes['project'])?projects.find(i=>i.id===allRoutes['project']).name:null}
                        </p>
                    </div>
                :null}
                </div>
                {projects.find(i=>i.id===allRoutes['project'])||task.start!==null||task.deadline!==null?<TaskDeadline start={task.start} deadline={task.deadline} project={projects.find(i=>i.id===allRoutes['project'])?projects.find(i=>i.id===allRoutes['project']):null} />:null}
                <HabitForm />
            </div>
    )
}

export default AddTask
