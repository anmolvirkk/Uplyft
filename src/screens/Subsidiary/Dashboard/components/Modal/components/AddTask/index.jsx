import React, {useEffect, useState, useCallback, useRef} from 'react'
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

import InputBox from '../../../../../Auth/components/InputBox'

const AddTask = ({type, currentTask, currentActiveTask}) => {

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const date = new Date()

    const [tags, setTags] = useRecoilState(tagsAtom)

    const reorderTags = (arr) => {
        return arr.slice().sort((a, b) => a.value - b.value)
    }

    let taskText = useRef({
        id: '',
        name: '',
        details: '',
        start: null,
        deadline: null,
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
        tagText: {val: '', type: false}
    })

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
    
    const currentTaskRoute = useCallback(() => {

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
    }, [task.subtasks])

    const [savedActiveTask, setSavedActiveTask] = useState(currentActiveTask?currentActiveTask:false)
    let activeTask = savedActiveTask?savedActiveTask:currentTaskRoute().length>0?currentTaskRoute()[currentTaskRoute().length-1]:task
    const setActiveTask = (key, val) => {
        let newActiveTask = {...activeTask}
        if(taskText.current.id === activeTask.id){
            newActiveTask = {...activeTask, name: taskText.current.name, details: taskText.current.details}
        }
        if(activeTask.id === task.id){
            newActiveTask[key] = val
            setTask({...newActiveTask})
        }else{
            let newTask = {...task}
            const setSubtasks = (subtasks) => subtasks.map((item)=>{
                let newItem = {...item}
                if(item.id === activeTask.id){
                    newItem[key] = val
                    if(taskText.current.id === activeTask.id){
                        newActiveTask = {...newItem, name: taskText.current.name, details: taskText.current.details}
                    }else{
                        newActiveTask = {...newItem}
                    }
                }else if(item.subtasks){
                    newItem.subtasks = setSubtasks(item.subtasks)
                }
                return newItem
            })
            newTask.subtasks = setSubtasks(newTask.subtasks)
            setTask({...newTask})
        }
        setSavedActiveTask({...newActiveTask})
    }

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
            let allSubtasksEvents = []
            const setAllSubtasksEvents = (subtasks) => subtasks.forEach((item)=>{
                let event = {
                    title: item.name,
                    start: item.start,
                    end: item.deadline,
                    color: colors[currentProject.color],
                    id: item.id,
                    type: 'task'
                }
                allSubtasksEvents.push(event)
                if(item.subtasks){
                    setAllSubtasksEvents(item.subtasks)
                }
            })
            if(task.subtasks){
                setAllSubtasksEvents(task.subtasks)
            }
            setAllCalendarEvents([...allCalendarEvents, {
                title: task.name,
                start: task.start,
                end: task.deadline,
                color: colors[currentProject.color],
                id: task.id,
                type: 'task'
            }, ...allSubtasksEvents])
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
                    }
                return newData
            })
            const setAllSubtasksEvents = (subtasks) => subtasks.forEach((item)=>{
                newAllCalendarEvents = newAllCalendarEvents.map((data)=>{
                    let newData = {...data}
                        if(item.id === newData.id){
                            newData.title = item.name
                            newData.start = item.start
                            newData.end = item.deadline
                        }
                    return newData
                })
                if(item.subtasks){
                    setAllSubtasksEvents(item.subtasks)
                }
            })
            if(task.subtasks){
                setAllSubtasksEvents(task.subtasks)
            }
            setAllCalendarEvents([...newAllCalendarEvents])
        }
        setModalConfig({type: ''})
    }

    const HabitForm = () => {

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
                taskText.current.tagText = {val: '', type: false}
            }
        }

        const appendTagWithValue = useCallback((type) => {
            let shouldAppend = true
            if(taskText.current.tagText.val === ''){
                shouldAppend = false
            }
            console.log(tags)
            console.log(type)
            console.log(tags[type])
            tags[type].forEach((item)=>{
                if(item.label.toLowerCase() === taskText.current.tagText.val.toLowerCase()){
                    shouldAppend = false
                }
                if(item.value === taskText.current[type].value){
                    shouldAppend = false
                }
            })
            if(shouldAppend){
                setTags({...tags, [type]: [...tags[type], {label: taskText.current.tagText.val, value: taskText.current[type].value}]})
            }
            resetAddTagBtn()
        }, [])

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
        
        const appendTag = useCallback((type) => {
            let shouldAppend = true
            if(taskText.current.tagText.val === ''){
                shouldAppend = false
            }
            tags[type].forEach((item)=>{
                if(item.toLowerCase() === taskText.current.tagText.val.toLowerCase()){
                    shouldAppend = false
                }
            })
            if(shouldAppend){
                setTags({...tags, [type]: [...tags[type], taskText.current.tagText.val]})
                setTask({...task, [type]: [...task[type], taskText.current.tagText.val]})
                setActiveTask('tags', [...activeTask.tags, taskText.current.tagText.val])
            }
            resetAddTagBtn()
        }, [])

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
            if(task.name !== ''){
                let subTaskInfo = {
                    id: new Date().valueOf(),
                    name: 'Sub Task',
                    completed: activeTask.completed
                }
                if(!activeTask.subtasks){
                    setActiveTask('subtasks', [{...taskformat, ...subTaskInfo}])
                }else{
                    setActiveTask('subtasks', [...activeTask.subtasks, {...taskformat, ...subTaskInfo}])
                }
                setSavedActiveTask({...taskformat, ...subTaskInfo})
            }
        }

        const addParallelTask = () => {
            let parallelTaskInfo = {
                id: new Date().valueOf(),
                name: 'Sub Task',
                completed: activeTask.completed
            }
            let parent = {subtasks: []}
            if(currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]){
                parent = currentTaskRoute()[currentTaskRoute().findIndex(i=>i.id===activeTask.id)-1]
                const newSubtasks = task.subtasks.map((item)=>{
                    let newItem = {...item}
                    const checkSubtasks = (task) => task.subtasks.forEach((item)=>{
                        if(item.id === activeTask.id){
                            task.subtasks = [{...taskformat, ...parallelTaskInfo}, ...task.subtasks]
                        }else if(item.subtasks){
                            checkSubtasks(item)
                        }
                    })
                    if(item.subtasks){
                        checkSubtasks(newItem)
                    }
                    return newItem
                })
                setTask({...task, subtasks: newSubtasks})
            }else{
                parent = task
                setTask({...task, subtasks: [{...taskformat, ...parallelTaskInfo} ,...task.subtasks]})
            }
            setSavedActiveTask(parent.subtasks.find(i=>i.id===parallelTaskInfo.id))
        }
        

        useEffect(()=>{
            if(!document.getElementsByClassName('form-control')[0].readOnly){
                for(let i=0; i<document.getElementsByClassName('form-control').length; i++){
                    document.getElementsByClassName('form-control')[i].onmousedown = (e) => {
                        e.preventDefault()
                        e.target.parentNode.childNodes[1].onmousedown = (e) => {
                            e.preventDefault()
                        }
                    }
                    document.getElementsByClassName('form-control')[i].readOnly = true
                }
            }
        })

        const setTaskText = (key) => {
            if(taskText.current[key] !== '' && taskText.current[key]!==activeTask[key] && taskText.current.id === activeTask.id){
                setActiveTask([key], taskText.current[key])
            }
        }

        useEffect(()=>{
            if(taskText.current.id===activeTask.id){
                if(taskText.current.name !== activeTask.name && taskText.current.name!==''){
                    setTaskText('name')
                }
                if(taskText.current.details !== activeTask.details && taskText.current.details!==''){
                    setTaskText('details')
                }
                if(taskText.current.start !== activeTask.start && taskText.current.start!==''){
                    setActiveTask('start', taskText.current.start)
                }
                if(taskText.current.deadline !== activeTask.deadline && taskText.current.deadline!==''){
                    setActiveTask('deadline', taskText.current.deadline)
                }
                if(taskText.current.priority !== activeTask.priority){
                    setActiveTask('priority', taskText.current.priority)
                }
                if(taskText.current.timeRequired !== activeTask.timeRequired){
                    setActiveTask('timeRequired', taskText.current.timeRequired)
                }
                if(taskText.current.effortRequired !== activeTask.effortRequired){
                    setActiveTask('effortRequired', taskText.current.effortRequired)
                }
                if(taskText.current.tagText.val !== ''){
                    if(taskText.current.tagText.type){
                        appendTagWithValue(taskText.current.tagText.type)
                    }else{
                        appendTag('tags')
                    }
                }
            }
        }, [appendTag, appendTagWithValue])

        const setTaskTags = (item, key) => {
            taskText.current[key] = {value: item.value, label: item.label}
            setActiveTask(key, {value: item.value, label: item.label})
        }

        const setSlider = (key, val) => {
            taskText.current[key] = {...taskText.current[key], value: val}
            setActiveTask(key, {...activeTask[key], value: parseInt(val)})
        }

        const setTextTags = (val) => {
            taskText.current.tags = [...val]
            setActiveTask('tags', [...val])
        }

        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.taskInput}>
                        <div className={styles.taskInputSection}>
                            <InputBox onBlur={()=>setTaskText('name')} onTouchEnd={()=>setTaskText('name')} onFocus={()=>taskText.current.id = activeTask.id} onChange={(e)=>taskText.current.name = e.target.value} autoComplete='off' id='taskText' type='text' name='New Task' value={taskText.current.name!==''&&taskText.current.id===activeTask.id?taskText.current.name:activeTask.name} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <InputBox onBlur={()=>setTaskText('details')} onTouchEnd={()=>setTaskText('details')} onFocus={()=>taskText.current.id=activeTask.id} onChange={(e)=>taskText.current.details=e.target.value} autoComplete='off' id='taskDetails' icon={<AlignLeft />} type='text' name='Add Details' value={taskText.current.details!==''&&taskText.current.id===activeTask.id?taskText.current.details:activeTask.details} />
                        </div>
                        <div className={styles.setDates}>
                            <div className={`${styles.inputWithIcon}`}>
                                <Navigation />
                                <Datetime onOpen={()=>taskText.current.id = activeTask.id} initialValue={taskText.current.start!==null&&taskText.current.id===activeTask.id?taskText.current.start:activeTask.start!==null?activeTask.start:'Add Start'} onChange={(e)=>taskText.current.start=e._d} onClose={()=>setActiveTask('start', taskText.current.start)} />         
                            </div>
                            <div className={`${styles.inputWithIcon}`}>
                                <Flag />
                                <Datetime initialValue={taskText.current.deadline!==null&&taskText.current.id===activeTask.id?taskText.current.deadline:activeTask.deadline!==null?activeTask.deadline:'Add Deadline'} onChange={(e)=>taskText.current.deadline=new Date(e._d).getHours()===0&&new Date(e._d).getMinutes()===0?(new Date(e._d).setMinutes(new Date(e._d).getMinutes()-1)):e._d} onClose={()=>setActiveTask('deadline', taskText.current.deadline)} />        
                            </div>
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Priority</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.priority).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTaskTags(item, 'priority'):null} key={index} className={`${styles.tag} ${taskText.current.priority.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'priority')} /></div>
                                })}
                                <div className={styles.addTag} onMouseDown={()=>taskText.current.id = activeTask.id} onClick={(e)=>addTagInputWithValue(e)} onBlur={()=>appendTagWithValue('priority')} onMouseOut={()=>appendTagWithValue('priority')}><span onFocus={()=>taskText.current.tagText.type='priority'} onInput={(e)=>taskText.current.tagText.val = e.target.textContent}></span><div id="priorityTagValue">{taskText.current.priority.value}</div><Plus /></div>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('priorityTagValue').innerText = e.target.value} defaultValue={taskText.current.priority.value} onMouseUp={(e)=>setSlider('priority', parseInt(e.target.value))} onTouchEnd={(e)=>setSlider('priority', parseInt(e.target.value))} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Time required</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.timeRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTaskTags(item, 'timeRequired'):null} key={index} className={`${styles.tag} ${taskText.current.timeRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'timeRequired')} /></div>
                                })}
                                <div className={styles.addTag} onMouseDown={()=>taskText.current.id = activeTask.id} onClick={(e)=>addTagInputWithValue(e)} onBlur={()=>appendTagWithValue('timeRequired')} onMouseOut={()=>appendTagWithValue('timeRequired')}><span onFocus={()=>taskText.current.tagText.type='timeRequired'} onInput={(e)=>taskText.current.tagText.val = e.target.textContent}></span><div id="timeRequiredTagValue">{taskText.current.timeRequired.value}</div><Plus /></div>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('timeRequiredTagValue').innerText = e.target.value} defaultValue={taskText.current.timeRequired.value} onMouseUp={(e)=>setSlider('timeRequired', parseInt(e.target.value))} onTouchEnd={(e)=>setSlider('timeRequired', parseInt(e.target.value))} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Effort required</span></p>
                            <div className={styles.tags}>
                                {reorderTags(tags.effortRequired).map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?setTaskTags(item, 'effortRequired'):null} key={index} className={`${styles.tag} ${taskText.current.effortRequired.value===item.value?styles.tagActive:null}`}><div>{item.value}</div><span>{item.label}</span><X onClick={(e)=>removeTagWithValue(e.target.parentNode.childNodes, 'effortRequired')} /></div>
                                })}
                                <div className={styles.addTag} onMouseDown={()=>taskText.current.id = activeTask.id} onClick={(e)=>addTagInputWithValue(e)} onBlur={()=>appendTagWithValue('effortRequired')} onMouseOut={()=>appendTagWithValue('effortRequired')}><span onFocus={()=>taskText.current.tagText.type='effortRequired'} onInput={(e)=>taskText.current.tagText.val = e.target.textContent}></span><div id="effortRequiredTagValue">{taskText.current.effortRequired.value}</div><Plus /></div>
                            </div>
                            <input type="range" onChange={(e)=>document.getElementById('effortRequiredTagValue').innerText = e.target.value} defaultValue={taskText.current.effortRequired.value} onMouseUp={(e)=>setSlider('effortRequired', parseInt(e.target.value))} onTouchEnd={(e)=>setSlider('effortRequired', parseInt(e.target.value))} />
                        </div>
                        <div className={styles.taskInputSection}>
                            <p><span>Tags</span></p>
                            <div className={styles.tags}>
                                {tags.tags.map((item, index)=>{
                                    return <div onClick={(e)=>e.target.nodeName!=='svg'?taskText.current.tags.includes(item)?setTextTags([...taskText.current.tags.filter((val)=>val!==item)]):setTextTags([...taskText.current.tags, item]):null} key={index} className={`${styles.tag} ${taskText.current.tags.includes(item)?styles.tagActive:null}`}><span>{item}</span><X onClick={(e)=>removeTag(e.target.parentNode.childNodes, 'tags')} /></div>
                                })}
                                <div className={styles.addTag} onMouseDown={()=>taskText.current.id = activeTask.id} onClick={(e)=>addTagInputWithValue(e)} onBlur={()=>appendTag('tags')} onMouseOut={()=>appendTag('tags')}><span onFocus={()=>taskText.current.tagText.type=false} onInput={(e)=>taskText.current.tagText.val = e.target.textContent}></span><Plus /></div>
                            </div>
                        </div>
                        <div className={`${styles.taskInputSection} ${styles.moreTasks}`}>
                            <p onClick={addSubTask} className={styles.addSubTask}><CornerDownRight /><span>Add Subtask</span></p>  
                            {task.id !== activeTask.id ? <p onClick={addParallelTask} className={styles.addSubTask}><ArrowRight /><span>Add Parallel Task</span></p> : null}   
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
                    {allTasks&&allTasks.length>1?
                    <OutsideClickHandler onOutsideClick={()=>setDropDownOpen(false)}>
                        <div className={styles.navSubTaskSelect} onMouseUp={()=>setDropDownOpen(!dropDownOpen)}>
                            <div className={styles.subTaskNum}>{allTasks.length-1}</div>
                            {dropDownOpen?<ChevronUp />:<ChevronDown />}
                        </div>
                    </OutsideClickHandler>
                    :null}
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
                        <NavItem thisTask={task} allTasks={null} />
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
                {currentProjectId!=='all'?<TaskDeadline task={task} project={currentProject} />:task.start!==null?<TaskDeadline task={task} project={null} />:null}
                <HabitForm />
            </div>
    )
}

export default AddTask
