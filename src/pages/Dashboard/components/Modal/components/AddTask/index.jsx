import React, {useEffect, useState} from 'react'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Plus, AlignLeft, Flag, Navigation, Folder, CornerDownRight, ArrowRight, ChevronDown, ChevronUp } from 'react-feather'

import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors } from '../../../../variables/journalConfig'

import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'

import TaskDeadline from './components/TaskDeadline'
import './datePicker.sass'
import projectsAtom from '../../../../screens/Schedule/recoil-atoms/projectsAtom'
import allRoutesAtom from '../../../../screens/Journals/recoil-atoms/allRoutesAtom'

import OutsideClickHandler from 'react-outside-click-handler-lite'
import tagsAtom from './tagsAtom'

const AddTask = ({type, currentTask, currentActiveTask}) => {

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const date = new Date()

    const [tags, setTags] = useRecoilState(tagsAtom)

    const reorderTags = (arr) => {
        return arr.slice().sort((a, b) => a.value - b.value)
    }

    const taskformat = {
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
        completed: currentTask.completed,
        subtasks: currentTask.subtasks
    }:{
        ...taskformat
    })

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)

    const currentProjectId = allRoutes['project']?allRoutes['project']==='today'?'all':allRoutes['project']:'all'
    const currentProject = projects.find(i=>i.id===currentProjectId)
    const allProject = projects.find(i=>i.id==='all')
    
    const currentTaskRoute = () => {

        let currentTaskRoute = []

        if(task.subtasks){

            let layer = task.subtasks

            const addLayer = (val) => {
                layer = val[0]['subtasks']
            }

            while(layer!==undefined){
                if(layer[0]){
                    currentTaskRoute.push(layer[0])
                }
                addLayer(layer)
            }
        }
        return currentTaskRoute
    }

    const [savedActiveTask, setSavedActiveTask] = useState(currentActiveTask?currentActiveTask:false)
    let activeTask = savedActiveTask?savedActiveTask:currentTaskRoute().length>0?currentTaskRoute()[currentTaskRoute().length-1]:task
    const setActiveTask = (key, val) => {
        if(activeTask.id === task.id){
            let changeTask = {...activeTask}
            changeTask[key] = val
            setTask({...changeTask})
        }else{
            let newTask = {...task}
            const setSubtasks = (subtasks) => subtasks.map((item)=>{
                let newItem = {...item}
                if(item.id === activeTask.id){
                    newItem[key] = val
                }else if(item.subtasks){
                    newItem.subtasks = setSubtasks(item.subtasks)
                }
                return newItem
            })
            newTask.subtasks = setSubtasks(newTask.subtasks)
            setTask({...newTask})
        }
    }

    // useEffect(()=>{
    //     const currentTaskRoute = () => {

    //         let currentTaskRoute = []
    
    //         if(task.subtasks){
    
    //             let layer = task.subtasks
    
    //             const addLayer = (val) => {
    //                 layer = val[0]['subtasks']
    //             }
    
    //             while(layer!==undefined){
    //                 if(layer[0]){
    //                     currentTaskRoute.push(layer[0])
    //                 }
    //                 addLayer(layer)
    //             }
    //         }
    //         return currentTaskRoute
    //     }
    //     if(currentActiveTask){
    //         let parent
    //         if(currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]){
    //             parent = currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]
    //         }
    //         if(parent){
    //             if(parent.subtasks){
    //                 if(parent.subtasks[0]!==currentActiveTask){
    //                     parent.subtasks.sort((x,y)=>{ return x === currentActiveTask ? -1 : y === currentActiveTask ? 1 : 0 })
    //                     setTask({...task})
    //                 }
    //             }
    //         }else if(task.subtasks){
    //             if(task.subtasks[0] !== currentActiveTask){
    //                 let newSubtasks = [...task.subtasks]
    //                 newSubtasks.sort((x,y)=>{ return x === currentActiveTask ? -1 : y === currentActiveTask ? 1 : 0 })
    //                 setTask({...task, subtasks: newSubtasks})
    //             }
    //         }
    //     }
    // }, [currentActiveTask, task, activeTask.id])

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
                        newTaskData.subtasks = task.subtasks
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
                if(item.value === activeTask.priority.value){
                    if(item.label !== activeTask.priority.label){
                        setActiveTask('priority', {...task.priority, label: item.label})
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
            let subTaskInfo = {
                id: new Date().valueOf(),
                name: 'Sub Task'
            }
            if(!activeTask.subtasks){
                setActiveTask('subtasks', [{...taskformat, ...subTaskInfo}])
            }else{
                setActiveTask('subtasks', [...activeTask.subtasks, {...taskformat, ...subTaskInfo}])
            }
            setTask({...task})
            setSavedActiveTask(activeTask.subtasks.find(i=>i.id===subTaskInfo.id))
        }

        const addParallelTask = () => {
            let parallelTaskInfo = {
                id: new Date().valueOf(),
                name: 'Sub Task'
            }
            let parent = {subtasks: []}
            if(currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]){
                parent = currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]
                parent.subtasks = [{...taskformat, ...parallelTaskInfo}, ...parent.subtasks]
                setTask({...task})
            }else{
                parent = task
                setTask({...task, subtasks: [{...taskformat, ...parallelTaskInfo} ,...task.subtasks]})
            }
            setSavedActiveTask(parent.subtasks.find(i=>i.id===parallelTaskInfo.id))
        }
        
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.taskInput}>
                        <div className={styles.taskInputSection}>
                            <input defaultValue={activeTask.name} onBlur={(e)=>setActiveTask('name', e.target.value)} placeholder='New Task' />
                        </div>
                        <div className={styles.taskInputSection}>
                            <div className={styles.inputWithIcon}>
                                <AlignLeft />
                                <input type="text" defaultValue={activeTask.details} placeholder="Add Details" onBlur={(e)=>setActiveTask('details', e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.setDates}>
                            <div className={`${styles.inputWithIcon}`}>
                                <Navigation />
                                <Datetime initialValue={activeTask.start?activeTask.start:'Add Start Date'} onClose={(e)=>setActiveTask('start', e._d)} />         
                            </div>
                            <div className={`${styles.inputWithIcon}`}>
                                <Flag />
                                <Datetime initialValue={activeTask.deadline?activeTask.deadline:'Add Deadline'} onClose={(e)=>setActiveTask('deadline', new Date(e._d).getHours()===0&&new Date(e._d).getMinutes()===0?(new Date(e._d).setMinutes(new Date(e._d).getMinutes()-1)):e._d)} />        
                            </div>
                        </div>
                        <div className={styles.taskInputSection} style={{marginTop: '2.5vh'}}>
                            <p><span>Priority</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.priority).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setActiveTask('priority', {value: item.value, label: item.label}):null} key={index} className={`${styles.tag} ${activeTask.priority.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'priority')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'priority')}><span></span><div id="priorityTagValue">{activeTask.priority.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('priorityTagValue').innerText = e.target.value} defaultValue={activeTask.priority.value} onMouseUp={(e)=>setActiveTask('priority', {...activeTask.priority, value: parseInt(e.target.value)})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Time required</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.timeRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setActiveTask('timeRequired', {value: item.value, label: item.label}):null} key={index} className={`${styles.tag} ${activeTask.timeRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'timeRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'timeRequired')}><span></span><div id="timeRequiredTagValue">{activeTask.timeRequired.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('timeRequiredTagValue').innerText = e.target.value} defaultValue={activeTask.timeRequired.value} onMouseUp={(e)=>setActiveTask('timeRequired', {...activeTask.timeRequired, value: parseInt(e.target.value)})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Effort required</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.effortRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setActiveTask('effortRequired', {value: item.value, label: item.label}):null} key={index} className={`${styles.tag} ${activeTask.effortRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'effortRequired')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTagWithValue(e, 'effortRequired')}><span></span><div id="effortRequiredTagValue">{activeTask.effortRequired.value}</div><Plus /></div></OutsideClickHandler>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('effortRequiredTagValue').innerText = e.target.value} defaultValue={activeTask.effortRequired.value} onMouseUp={(e)=>setActiveTask('effortRequired', {...activeTask.effortRequired, value: parseInt(e.target.value)})} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Tags</span></p>
                            <div className={styles.tags}>
                                {tags.tags.map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?activeTask.tags.includes(item)?setActiveTask({'tags': [...activeTask.tags.filter((val)=>{return val!==item})]}):setActiveTask('tags', [...activeTask.tags, item]):null} key={index} className={`${styles.tag} ${activeTask.tags.includes(item)?styles.tagActive:null}`}><span>{item}</span><X onClick={(e)=>removeTag(e.target.parentNode.childNodes, 'tags')} /></div>
                                })}
                                <OutsideClickHandler onOutsideClick={resetAddTagBtn}><div className={styles.addTag} onClick={(e)=>addTagInputWithValue(e)} onBlur={(e)=>appendTag(e, 'tags')}><span></span><Plus /></div></OutsideClickHandler>
                            </div>
                        </div>
                        <div className={`${styles.taskInputSection} ${styles.moreTasks}`}>
                            <p onClick={addSubTask} className={styles.addSubTask}><CornerDownRight /><span>Add Subtask</span></p>  
                            <p onClick={addParallelTask} className={styles.addSubTask}><ArrowRight /><span>Add Parallel Task</span></p>      
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

    const NavItem = ({thisTask, allTasks}) => {
        const [dropDownOpen, setDropDownOpen] = useState(false)
        const setSubTaskOrder = (val) => {
            let parent
            if(currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]){
                parent = currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]
            }
            if(parent){
                parent.subtasks.sort((x,y)=>{ return x === val ? -1 : y === val ? 1 : 0 })
                setTask({...task})
            }else{
                let newSubtasks = [...task.subtasks]
                newSubtasks.sort((x,y)=>{ return x === val ? -1 : y === val ? 1 : 0 })
                setTask({...task, subtasks: newSubtasks})
            }
            setSavedActiveTask(val)
        }
        return (
            <div className={`${styles.taskNav} ${thisTask.id===activeTask.id?styles.activeTaskNav:null}`} onClick={()=>setSavedActiveTask(thisTask)}>
                <CornerDownRight />
                <div className={styles.navContent}>
                    <span>{thisTask.name}</span>
                    <OutsideClickHandler onOutsideClick={()=>setDropDownOpen(false)}>
                        {allTasks?  
                            <div className={styles.navSubTaskSelect} onMouseUp={()=>setDropDownOpen(!dropDownOpen)}>
                                <div className={styles.subTaskNum}>{allTasks.length}</div>
                                {allTasks.length>1?dropDownOpen?<ChevronUp />:<ChevronDown />:null}
                            </div>
                        : <div />}
                    </OutsideClickHandler>
                    {dropDownOpen&&allTasks.length>1?
                            <div className={styles.taskDropDown}>
                                <ul>
                                    {allTasks.map((item, i)=>{
                                        if(i!==0){
                                            return (
                                                <li key={item.id} onMouseDown={()=>setSubTaskOrder(item)}>
                                                    {item.name}
                                                </li>
                                            )
                                        }else{
                                            return null
                                        }
                                    })}
                                </ul>
                            </div>
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
                        <NavItem thisTask={task} allTasks={currentProject.tasks} />
                    :null}
                    {currentTaskRoute()&&task.name!==''?currentTaskRoute().map((item, i)=>{
                        if(i-1>=0){
                            if(currentTaskRoute()[i-1].subtasks){
                                return <NavItem key={i} thisTask={item} allTasks={currentTaskRoute()[i-1].subtasks} />
                            }else{
                                return null
                            }
                        }else{
                            return <NavItem key={i} thisTask={item} allTasks={task.subtasks} />
                        }
                    }):null}
                </div>
                {currentProjectId!=='all'?<TaskDeadline start={task.start} deadline={task.deadline} project={currentProject} />:task.start!==null?<TaskDeadline start={task.start} deadline={task.deadline} project={null} />:null}
                <HabitForm />
            </div>
    )
}

export default AddTask
