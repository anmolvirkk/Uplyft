import React, {useEffect, useState} from 'react'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Plus, AlignLeft, Flag, Navigation, Folder, CornerDownRight, ArrowRight, ChevronDown } from 'react-feather'

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
        name: currentTask.name,
        details: currentTask.details,
        deadline: currentTask.deadline!==null?new Date(currentTask.deadline):null,
        start: currentTask.start!==null?new Date(currentTask.start):null,
        priority: currentTask.priority,
        effortRequired: currentTask.effortRequired,
        timeRequired: currentTask.timeRequired,
        tags: currentTask.tags,
        completed: currentTask.completed
    }:{
        id: date.valueOf(),
        name: '',
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
        tags: [],
        completed: false
    })

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)

    const currentProjectId = allRoutes['project']?allRoutes['project']==='today'?'all':allRoutes['project']:'all'
    const currentProject = projects.find(i=>i.id===currentProjectId)
    const allProject = projects.find(i=>i.id==='all')
    
    const submitHabit = () => {
        if(type === 'add'){
            if(currentProject.id !== 'all'){
                let newProjects = projects.map((data)=>{
                    let newData = {...data}
                    if(data.id ===currentProjectId){
                        newData.tasks = [...currentProject.tasks, task]
                    }
                    if(data.id === 'all'){
                        newData.tasks = [...allProject.tasks, task]
                    }
                    return newData
                })
                setProjects([...newProjects])
            }else{
                let newProjects = projects.map((data)=>{
                    let newData = {...data}
                    if(data.id === 'all'){
                        newData.tasks = [...allProject.tasks, task]
                    }
                    return newData
                })
                setProjects([...newProjects])
            }

            setAllCalendarEvents([...allCalendarEvents, {
                title: task.name,
                start: task.start,
                end: task.deadline,
                color: colors[currentProject.color],
                id: task.id,
                type: 'task'
            }])
        }else if(type==='edit'){
            
            let newProjects = projects.map((data)=>{
                let newData = {...data}
                let newTasks = newData.tasks.map((data)=>{
                    let newTaskData = {...data}
                    if(newTaskData.id === task.id){
                        newTaskData.id = task.id
                        newTaskData.name = task.name
                        newTaskData.details = task.details
                        newTaskData.deadline = task.deadline!==null?new Date(task.deadline):null
                        newTaskData.start = task.start!==null?new Date(task.start):null
                        newTaskData.priority = task.priority
                        newTaskData.effortRequired = task.effortRequired
                        newTaskData.timeRequired = task.timeRequired
                        newTaskData.tags = task.tags
                        newTaskData.completed = task.completed
                    }
                    return newTaskData
                })
                newData.tasks = newTasks
                return newData
            })
            setProjects([...newProjects])
            
            let newAllCalendarEvents = allCalendarEvents.map((data)=>{
                let newData = {...data}
                    if(data.id === task.id) {
                        newData.title = task.name
                        newData.start = task.start
                        newData.end = task.deadline
                        newData.color = colors[currentProject.color]
                    }
                return newData
            })
            setAllCalendarEvents([...newAllCalendarEvents])
        }
        setModalConfig({type: ''})
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

        const addSubTask = () => {
            if(!task.subtasks){
                setTask({...task, subtasks: [{
                    id: new Date().valueOf(),
                    name: 'Test'
                }]})
                console.log(task)
            }
        }
        
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.taskInput}>
                        <div className={styles.taskInputSection}>
                            <input defaultValue={task.name} onBlur={(e)=>setTask({...task, name: e.target.value})} placeholder='New Task' />
                        </div>
                        <div className={styles.taskInputSection}>
                            <div className={styles.inputWithIcon}>
                                <AlignLeft />
                                <input type="text" defaultValue={task.details} placeholder="Add Details" onBlur={(e)=>setTask({...task, details: e.target.value})} />
                            </div>
                        </div>
                        <div className={styles.setDates}>
                            <div className={`${styles.inputWithIcon}`}>
                                <Navigation />
                                <Datetime initialValue={task.start?task.start:'Add Start Date'} onClose={(e)=>setTask({...task, start: e._d})} />         
                            </div>
                            <div className={`${styles.inputWithIcon}`}>
                                <Flag />
                                <Datetime initialValue={task.deadline?task.deadline:'Add Deadline'} onClose={(e)=>setTask({...task, deadline: new Date(e._d).getHours()===0&&new Date(e._d).getMinutes()===0?(new Date(e._d).setMinutes(new Date(e._d).getMinutes()-1)):e._d})} />        
                            </div>
                        </div>
                        <div className={styles.taskInputSection} style={{marginTop: '2.5vh'}}>
                            <p><span>Priority</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.priority).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTask({...task, priority: {value: item.value, label: item.label}}):null} key={index} className={`${styles.tag} ${task.priority.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'priority')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'priority')}><span></span><div id="priorityTagValue">{task.priority.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('priorityTagValue').innerText = e.target.value} defaultValue={task.priority.value} onMouseUp={(e)=>setTask({...task, priority: {...task.priority, value: parseInt(e.target.value)}})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Time required</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.timeRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTask({...task, timeRequired: {value: item.value, label: item.label}}):null} key={index} className={`${styles.tag} ${task.timeRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'timeRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'timeRequired')}><span></span><div id="timeRequiredTagValue">{task.timeRequired.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('timeRequiredTagValue').innerText = e.target.value} defaultValue={task.timeRequired.value} onMouseUp={(e)=>setTask({...task, timeRequired: {...task.timeRequired, value: parseInt(e.target.value)}})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Effort required</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.effortRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTask({...task, effortRequired: {value: item.value, label: item.label}}):null} key={index} className={`${styles.tag} ${task.effortRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'effortRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'effortRequired')}><span></span><div id="effortRequiredTagValue">{task.effortRequired.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('effortRequiredTagValue').innerText = e.target.value} defaultValue={task.effortRequired.value} onMouseUp={(e)=>setTask({...task, effortRequired: {...task.effortRequired, value: parseInt(e.target.value)}})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Tags</span></p>
                            <div className={styles.tags}>
                                {tags.tags.map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?task.tags.includes(item)?setTask({...task, tags: [...task.tags.filter((val)=>{return val!==item})]}):setTask({...task, tags: [...task.tags, item]}):null} key={index} className={`${styles.tag} ${task.tags.includes(item)?styles.tagActive:null}`}><span>{item}</span><X onClick={(e)=>removeTag(e.target.parentNode.childNodes, 'tags')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTag(e, 'tags')}><span></span><Plus /></div></OutsideClickHandler>
                            </div>
                        </div>
                        <div className={`${styles.taskInputSection} ${styles.moreTasks}`}>
                            <p onClick={addSubTask} className={styles.addSubTask}><CornerDownRight /><span>Add Subtask</span></p>  
                            <p onClick={addSubTask} className={styles.addSubTask}><ArrowRight /><span>Add Parallel Task</span></p>      
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

    const NavItem = ({task, allTasks}) => {
        const [dropDownOpen, setDropDownOpen] = useState(false)
        return (
            <div className={styles.taskNav}>
                <CornerDownRight />
                <div className={styles.navContent} onMouseUp={()=>setDropDownOpen(!dropDownOpen)}>
                    <span>{task.name}</span>
                    <ChevronDown /> 
                    {dropDownOpen?
                        <OutsideClickHandler onOutsideClick={()=>setDropDownOpen(false)}>
                            <div className={styles.taskDropDown}>
                                <ul>
                                    {allTasks.map((item)=>{
                                        return (
                                            <li id={item.id}>
                                                {item.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </OutsideClickHandler>
                    :null}
                </div>
            </div>
        )
    }
    
    return (
        <div className={`${styles.form} ${styles.addTask}`} id='modalForm'>
                <div className={styles.header}>
                    <p>{type} Task</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.taskNavigation}>
                    <div className={styles.projectName}>
                        <Folder />
                        <p>
                            {currentProject.name}
                        </p>
                    </div>
                    {task.name!==''?
                        <NavItem task={task} allTasks={projects.find(i=>i.id === allRoutes['project']).tasks} />
                    :null}
                    {
                        task.subtasks?
                            task.subtasks.map((item)=>{
                                return (
                                    <NavItem task={item} allTasks={task.subtasks} />
                                )
                            })
                        : null
                    }
                </div>
                {currentProjectId!=='all'?<TaskDeadline start={task.start} deadline={task.deadline} project={currentProject} />:task.start!==null?<TaskDeadline start={task.start} deadline={task.deadline} project={null} />:null}
                <HabitForm />
            </div>
    )
}

export default AddTask
