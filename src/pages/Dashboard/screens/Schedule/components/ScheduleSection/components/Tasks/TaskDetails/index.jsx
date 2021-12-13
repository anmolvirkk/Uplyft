import React, { useState, useEffect, useCallback } from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import AddButton from '../../../../AddButton'
import { ChevronUp, ChevronDown, CornerDownRight, ChevronRight, Folder } from 'react-feather'
import styles from './_taskdetails.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../../Journals/recoil-atoms/modalConfigAtom'
import projectsAtom from '../../../../../recoil-atoms/projectsAtom'
import MoreMenu from '../../../../../../../components/MoreMenu'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'
import CheckBtn from './components/CheckBtn'
import allCalendarEventsAtom from '../../../../../recoil-atoms/allCalendarEventsAtom'
import completedOpenAtom from '../../../../../recoil-atoms/completedOpenAtom'

const TaskDetails = () => {
    
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [projects, setProjects] = useRecoilState(projectsAtom)
    const [allRoutes] = useRecoilState(allRoutesAtom)

    useEffect(() => {
        const setTodayTasks = () => {
            if(allRoutes['project']==='today'){
                const setTasks = () => {
                    let tasks = []
                    let today = new Date().toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: '2-digit'})
                    const getSubtasks = (subtasks) => subtasks.forEach((item)=>{
                        if(new Date(item.start).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: '2-digit'}) === today){
                            tasks = [...tasks, item]
                        }else if(item.subtasks){
                            getSubtasks(item.subtasks)
                        }
                    })
                    getSubtasks(projects[1].tasks)
                    return tasks
                }
                if(setTasks().length !== projects[0].tasks.length){
                    let newProjects = projects.map((item)=>{
                        let newData = {...item}
                        if(newData.id === 'today'){
                            newData.tasks = setTasks()
                        }
                        return newData
                    })
                    setProjects([...newProjects])
                }
            }
        }

        setTodayTasks()

    }, [allRoutes, projects, setProjects])

    const Filters = () => {
        const [filterOpen, setFilterOpen] = useState(false)
        return (
            <div className={styles.filters}>
                <div onClick={()=>setFilterOpen(!filterOpen)} className={styles.filterTitle}><span>Filters</span><ChevronUp /></div>
                {filterOpen?
                <OutsideClickHandler onOutsideClick={()=>setFilterOpen(false)}>
                <div className={styles.filterTab}>
                    <div className={styles.activeFilters}>

                    </div>
                    <div className={styles.allFilters}>
                        <div className={styles.roles}>

                        </div>
                        <div className={styles.tags}>
                            
                        </div>
                        <div className={styles.elements}>

                        </div>
                    </div>
                </div>
                </OutsideClickHandler>
                : null}
            </div>
        )
    }

    const [completedOpen, setCompletedOpen] = useRecoilState(completedOpenAtom)

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)

    const [openSubtasks, setOpenSubtasks] = useState({subtasks: false, nav: []})

    const deleteTask = (id) => {
        const newProjects = projects.map((item)=>{
            let data = {...item}
            const deleteTask = (tasks) => tasks.map((item)=>{
                let newTask = {...item}
                if(newTask.id === id){
                    return null
                }
                if(newTask.subtasks){
                    newTask.subtasks = deleteTask(newTask.subtasks).filter(i=>i!==null)
                }
                return newTask
            })
            if(data.tasks){
                data.tasks = deleteTask(data.tasks).filter(i=>i!==null)
            }
            setOpenSubtasks({nav: deleteTask(openSubtasks.nav), subtasks: deleteTask(openSubtasks.subtasks).filter(i=>i!==null)})
            return data
        })
        setProjects([...newProjects])
        
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setAllCalendarEvents([...newAllCalendarEvents])
    }

    const [currentTask, setCurrentTask] = useState()

    const showSubtasks = useCallback(
        (task) => {
            if(task){
                if(task.subtasks){
                    if(openSubtasks.nav.includes(task)){
                        openSubtasks.nav.length = openSubtasks.nav.indexOf(task) + 1
                        setOpenSubtasks({subtasks: task.subtasks, nav: [...openSubtasks.nav]})
                    }else{
                        setOpenSubtasks({subtasks: task.subtasks, nav: [...openSubtasks.nav, task]})
                    }
                }else{
                    setOpenSubtasks({subtasks: [], nav: [...openSubtasks.nav, task]})
                }
            }else{
                setOpenSubtasks({subtasks: false, nav: []})
            }
            setCurrentTask(task)
        },
        [openSubtasks.nav]
    )

    useEffect(()=>{
        if(openSubtasks.nav[0]){
            if(projects.filter(i=>i.id===allRoutes['project'])[0].tasks.filter(i=>i.id===openSubtasks.nav[0].id).length===0){
                showSubtasks(false)
            }
        }
    }, [allRoutes, openSubtasks, showSubtasks, projects])
    
    if(currentTask){
        let currentSubtasks
        const findSubtasks = (tasks) => tasks.forEach((item)=>{
            if(item.id === currentTask.id){
                currentSubtasks = item.subtasks
            }else if(item.subtasks){
                findSubtasks(item.subtasks)
            }
        })
        projects.filter(i=>i.id===allRoutes['project'])[0].tasks.forEach((item)=>{
            if(item.id === currentTask.id){
                currentSubtasks = item.subtasks
            }else if(item.subtasks){
                findSubtasks(item.subtasks)
            }
        })
        if(currentSubtasks !== openSubtasks.subtasks){
            if(currentSubtasks){
                setOpenSubtasks({...openSubtasks, subtasks: currentSubtasks})
            }
        }
    }

    const editTaskModal = (task) => {
        const editTask = (thisTask) => {
            setModalConfig({type: 'editTask', task: thisTask, activeTask: task})
        }
        let currentTask
        const checkAllSubtasks = (tasks) => tasks.forEach((item)=>{
            if(item.id === task.id){
                editTask(currentTask)
            }else if(item.subtasks){
                checkAllSubtasks(item.subtasks)
            }
        })
        projects.filter(i=>i.id===allRoutes['project'])[0].tasks.forEach((item)=>{
            if(item.id === task.id){
                currentTask = item
                editTask(currentTask)
            }else if(item.subtasks){
                currentTask = item
                checkAllSubtasks(item.subtasks)
            }
        })
    }

    const TaskDetails = ({task}) => {
        const TimeRemaining = () => {
            let start = new Date(task.start)
            let deadline = new Date(task.deadline)
            let sec, min, hour, days
            const timeLeft = () => {
                if(document.getElementById('timer')){
                    let now = new Date()
                    if((start.getTime() - now.getTime()) <= 0){
                        if((deadline.getTime() - now.getTime()) <= 0){
                            clearInterval(startTimer)
                            document.getElementById('timer').innerText = 'Time Over'
                            document.getElementById('days').innerText = 0
                            document.getElementById('hour').innerText = 0
                            document.getElementById('min').innerText = 0
                            document.getElementById('sec').innerText = 0
                        }else{
                            sec = Math.floor((deadline.getTime() - now.getTime())/1000)
                            min = Math.floor(sec/60)
                            hour = Math.floor(min/60)
                            days = Math.floor(days/24)
                            document.getElementById('timer').innerText = 'Time Until Deadline'
                        }
                    }else{
                        sec = Math.floor((start.getTime() - now.getTime())/1000)
                        min = Math.floor(sec/60)
                        hour = Math.floor(min/60)
                        days = Math.floor(days/24)
                        document.getElementById('timer').innerText = 'Time Until Start'
                    }
                    hour %= 24
                    min %= 60
                    sec %= 60
                    if(!isNaN(days)){
                        document.getElementById('days').innerText = days
                    }else{
                        document.getElementById('days').innerText = 0
                    }
                    if(!isNaN(hour)){
                        document.getElementById('hour').innerText = hour
                    }else{
                        document.getElementById('hour').innerText = 0
                    }
                    if(!isNaN(min)){
                        document.getElementById('min').innerText = min
                    }else{
                        document.getElementById('min').innerText = 0
                    }
                    if(!isNaN(sec)){
                        document.getElementById('sec').innerText = sec
                    }else{
                        document.getElementById('sec').innerText = 0
                    }
                }
            }
            let startTimer = setInterval(timeLeft, 1000)
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
        }
        return (
            <div className={styles.taskdetails}>
                <h3>{task.name}</h3>
                <p className={styles.details}>{task.details}</p>
                <div className={styles.completed}>
                    <div className={styles.amount}>
                        {task.subtasks?Math.round(task.subtasks.filter(i=>i.completed===true).length/task.subtasks.length*100):task.completed/1*100}% Completed
                    </div>
                    <div className={styles.progress}>
                        <hr style={{width: `${task.subtasks?task.subtasks.filter(i=>i.completed===true).length/task.subtasks.length*100:task.completed/1*100}%`}} />
                    </div>
                </div>
                <div className={styles.time}>
                    <div>
                        <p className={styles.title}>Start</p>
                        <div>{new Date(task.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <div>
                        <p className={styles.title}>Deadline</p>
                        <div>{new Date(task.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <TimeRemaining />
                </div>
                <div className={styles.metrics}>
                    <div>
                        <div className={styles.metricTitle}>
                            <p>Priority</p>
                            <p>{task.priority.label}</p>
                        </div>
                        <p className={styles.metricValue}>{task.priority.value}%</p>
                        <div className={styles.progress}>
                            <hr style={{width: `${task.priority.value}%`}} />
                        </div>
                    </div>
                    <div>
                        <div className={styles.metricTitle}>
                            <p>Effort</p>
                            <p>{task.effortRequired.label}</p>
                        </div>
                        <p className={styles.metricValue}>{task.effortRequired.value}%</p>
                        <div className={styles.progress}>
                            <hr style={{width: `${task.effortRequired.value}%`}} />
                        </div>
                    </div>
                    <div>
                        <div className={styles.metricTitle}>
                            <p>Time</p>
                            <p>{task.timeRequired.label}</p>
                        </div>
                        <p className={styles.metricValue}>{task.timeRequired.value}%</p>
                        <div className={styles.progress}>
                            <hr style={{width: `${task.timeRequired.value}%`}} />
                        </div>
                    </div>
                </div>
                {task.tags.length>0?
                    <div>
                        <p className={styles.title}>Tags</p>
                        {task.tags.map((item, i)=><div className={styles.tags} key={i}>{item}</div>)}
                    </div>
                :null}
            </div>
        )
    }

    const TaskTile = ({task}) => {
        return (
            <div className={styles.sideSectionSlot} data-title={task.name}>
                <div className={styles.slotContent} onClick={()=>showSubtasks(task)}>
                    <p>{task.name}</p>
                    {task.subtasks?
                        <div className={styles.subtasks}>
                            <CornerDownRight />
                            <p>{task.subtasks.length}</p>
                        </div>
                    :null}
                    {task.subtasks?
                        <div className={styles.progress}>
                            <hr style={{width: `${task.subtasks.filter(i=>i.completed===true).length/task.subtasks.length*100}%`}} />
                        </div>
                    :null}
                </div>
                <MoreMenu items={[{name: "edit", function: ()=>editTaskModal(task)}, {name: "delete", function: ()=>deleteTask(task.id)}]} id={`scheduleSlotsMoreMenu${task.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                <CheckBtn task={task} openSubtasks={openSubtasks} setOpenSubtasks={setOpenSubtasks} />
            </div>
        )
    }

    const SubTasks = ({subtasks, showCompleted}) => {
        if(subtasks){
            return (
                <div>
                    {subtasks.map((task)=>{
                        if(task.completed === showCompleted){
                            return (
                                <TaskTile task={task} key={task.id} />
                            )
                        }else{
                            return null
                        }
                    })}
                </div>
            )
        }else{
            return null
        }
    }
    
    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 80px - 40px)'}}>
                {openSubtasks.nav.length>0?
                    <div className={styles.tasksNav}>
                        <div onClick={()=>showSubtasks(false)} className={styles.navContent}><Folder /></div>
                        {openSubtasks.nav.map((item)=>{
                            return <div key={item.id} onClick={()=>showSubtasks(item)} className={styles.navContent}><ChevronRight /><p>{item.name}</p></div>
                        })}
                    </div>
                :null}
                {currentTask?<TaskDetails task={currentTask} />:null}
                {!openSubtasks.subtasks||openSubtasks.subtasks.length>0?
                    <h3 className={styles.slotLabel}>
                        <span>Remaining</span>
                        <div>
                            {openSubtasks.subtasks?openSubtasks.subtasks.filter(i=>i.completed===false).length
                            :projects.filter(i=>i.id===allRoutes['project'])[0]?projects.filter(i=>i.id===allRoutes['project'])[0].tasks?projects.filter(i=>i.id===allRoutes['project'])[0].tasks.filter(i=>i.completed===false).length: 0: 0}
                        </div>
                    </h3>
                :null}
                {
                    openSubtasks.subtasks?
                    <SubTasks subtasks={openSubtasks.subtasks} showCompleted={false} />
                    :
                    projects.map((item)=>{
                        if(item.id === allRoutes['project']){
                            return item.tasks.map((task)=>{
                                if(!task.completed){
                                    return (
                                        <TaskTile task={task} key={task.id} />
                                    )
                                }
                                return null
                            })
                        }
                        return null
                    })
                }
                {!openSubtasks.subtasks||openSubtasks.subtasks.length>0?
                    <h3 className={styles.slotLabel} onClick={()=>setCompletedOpen(!completedOpen)}>
                        <span>Completed</span>{completedOpen?<ChevronUp />:<ChevronDown />}
                    </h3>
                :null}
                {
                    completedOpen?
                    openSubtasks.subtasks?
                    <SubTasks subtasks={openSubtasks.subtasks} showCompleted={true} />
                    :
                    projects.map((item)=>{
                        if(item.id === allRoutes['project']){
                            return item.tasks.map((task)=>{
                                if(task.completed){
                                    return (
                                        <TaskTile task={task} key={task.id} />
                                    )
                                }
                                return null
                            })
                        }
                        return null
                    })
                    : null
                }
            </div>
            <Filters />
            <AddButton name="task" onclick={()=>setModalConfig({type: 'addTask'})} />
        </div>
    )
}

export default TaskDetails
