import React, { useState, useEffect, useCallback } from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import AddButton from '../../../../AddButton'
import { ChevronUp, ChevronDown, CornerDownRight, ChevronRight, Folder, ArrowUp, ArrowDown } from 'react-feather'
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
import modalStyles from '../../../../../../../components/Modal/_modal.module.sass'
import tagsAtom from '../../../../../../../components/Modal/components/AddTask/tagsAtom'

const TaskDetails = () => {
    
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [projects, setProjects] = useRecoilState(projectsAtom)
    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [tags] = useRecoilState(tagsAtom)

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

    const [filters, setFilters] = useState({
        sort: {trend: 'decending', metric: ''},
        tags: []
    })
    const [filterOpen, setFilterOpen] = useState(false)

    let filterTags = filters.tags

    const Filters = () => {
        const [sortOpen, setSortOpen] = useState(false)
        const toggleTag = (tag) => {
            if(filters.tags.filter(i=>i===tag).length===0){
                setFilters({...filters, tags: [...filters.tags, tag]})
                filterTags = [...filters.tags, tag]
            }else{
                let newTags = filters.tags.filter(i=>i!==tag)
                setFilters({...filters, tags: [...newTags]})
                filterTags = [...newTags]
            }
        }
        const sortTasks = () => {
            if(filters.sort.trend!==''){
                const reorderTasks = (tasks) => {
                        let reorderedTasks
                        let sortOrder = filters.sort.trend==='decending'?-1:1
                        if(filters.sort.metric === 'urgency'){
                            reorderedTasks = [...tasks].sort((a, b)=>((new Date(a.deadline) < new Date(b.deadline)) ? -1*sortOrder : (new Date(a.deadline) > new Date(b.deadline)) ? 1*sortOrder : 0))
                        }else{
                            reorderedTasks = [...tasks].sort((a, b)=>(a[filters.sort.metric].value < b[filters.sort.metric].value) ? -1*sortOrder : (a[filters.sort.metric].value > b[filters.sort.metric].value) ? 1*sortOrder : 0)
                        }
                        return reorderedTasks
                }
                let newProjects = projects.map((item)=>{
                    let newItem = {...item}
                    newItem.tasks = newItem.tasks.map((item)=>{
                        let newItem = {...item}
                        const setSubtasks = (subtasks) => subtasks.map((item)=>{
                            let newItem = {...item}
                            if(item.subtasks){
                                newItem.subtasks = [...reorderTasks(item.subtasks)]
                                newItem.subtasks = [...setSubtasks(item.subtasks)]
                                if(openSubtasks.subtasks){
                                    setOpenSubtasks({...openSubtasks, subtasks: [...newItem.subtasks]})
                                }
                            }
                            return newItem
                        })
                        if(item.subtasks){
                            newItem.subtasks = [...setSubtasks(item.subtasks)]
                            newItem.subtasks = [...reorderTasks(item.subtasks)]
                            if(openSubtasks.subtasks){
                                setOpenSubtasks({...openSubtasks, subtasks: [...newItem.subtasks]})
                            }
                        }
                        return newItem
                    })
                    newItem.tasks = [...reorderTasks(newItem.tasks)]
                    return newItem
                })
                setProjects([...newProjects])
            }
        }
        return (
            <OutsideClickHandler onOutsideClick={()=>setFilterOpen(false)}>
                <div className={styles.filters}>
                        <div className={styles.filterTitle} onClick={()=>setFilterOpen(!filterOpen)}><span>Filters</span>{filterOpen?<ChevronDown />:<ChevronUp />}</div>
                        {filterOpen?
                        <div className={styles.filterTab}>
                            <div className={styles.filterSection}>
                                <div className={styles.sortTitle}>
                                    <h3>Sort By</h3>
                                    <div className={styles.sortSelect}>
                                        <OutsideClickHandler onOutsideClick={()=>setSortOpen(false)}>
                                            <div className={styles.order} onMouseUp={()=>setSortOpen(!sortOpen)}>
                                                <p>{filters.sort.trend}</p>
                                                {filters.sort.trend==='decending'?<ArrowUp />:<ArrowDown />}
                                            </div>
                                        </OutsideClickHandler>
                                        {sortOpen?
                                            <div className={styles.sortDropDown}>
                                                <p onMouseDown={()=>setFilters({...filters, sort: {...filters.sort, trend: 'accending'}})}>Accending</p>
                                                <p onMouseDown={()=>setFilters({...filters, sort: {...filters.sort, trend: 'decending'}})}>Decending</p>
                                            </div>
                                        :null}
                                    </div>
                                </div>
                                <ul onMouseUp={sortTasks}>
                                    <li className={filters.sort.metric==='urgency'?styles.activeSort:null} onMouseDown={()=>setFilters({...filters, sort: {...filters.sort, metric: 'urgency'}})}>Urgency</li>
                                    <li className={filters.sort.metric==='priority'?styles.activeSort:null} onMouseDown={()=>setFilters({...filters, sort: {...filters.sort, metric: 'priority'}})}>Priority</li>
                                    <li className={filters.sort.metric==='timeRequired'?styles.activeSort:null} onMouseDown={()=>setFilters({...filters, sort: {...filters.sort, metric: 'timeRequired'}})}>Time</li>
                                    <li className={filters.sort.metric==='effortRequired'?styles.activeSort:null} onMouseDown={()=>setFilters({...filters, sort: {...filters.sort, metric: 'effortRequired'}})}>Effort</li>
                                </ul>
                            </div>
                            <div className={styles.fiterSliders}>
                                <div className={styles.title}>
                                    <h3>Tags</h3>
                                </div>
                                <div className={modalStyles.tags}>
                                    <div onMouseDown={()=>setFilters({...filters, tags: []})} className={`${modalStyles.tag} ${filters.tags.length===0?modalStyles.tagActive:null}`}><span>All</span></div>
                                    {tags.tags.map((item, index)=>{
                                        return <div key={index} onMouseDown={()=>toggleTag(item)} className={`${modalStyles.tag} ${filters.tags.filter(i=>i===item).length>0?modalStyles.tagActive:null}`}><span>{item}</span></div>
                                    })}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
            </OutsideClickHandler>
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

    const [prevProject, setPrevProject] = useState(allRoutes.project)
    useEffect(()=>{
        if(allRoutes.project !== prevProject){
            showSubtasks(false)
        }
        setPrevProject(allRoutes.project)
    }, [allRoutes.project, showSubtasks, prevProject])
    
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
        const editTask = (rootTask) => {
            const getNewRoute = (subtasks) => {
                let finalRoute
                subtasks.forEach((item)=>{
                    let route = [item]
                    const checkSubtasks = (subtasks) => {
                        route = [item]
                        subtasks.forEach((item)=>{
                            if(item.id === task.id){
                                route.push(item)
                                finalRoute = route
                            }else if(item.subtasks){
                                route.push(item)
                                checkSubtasks(item.subtasks)
                            }
                        })
                    }
                    if(item.id === task.id){
                        finalRoute = route
                    }else if(item.subtasks){
                        checkSubtasks(item.subtasks)
                    }
                })
                return finalRoute
            }
            let newTask = {...rootTask}
            if(rootTask.subtasks){
                    const reorderTasks = (tasks) => {
                        let newTasks = [...tasks]
                        if(getNewRoute(rootTask.subtasks)){
                            getNewRoute(rootTask.subtasks).forEach((route)=>{
                                if(tasks.filter(i=>i.id===route.id).length > 0){
                                    newTasks = [...tasks].sort((x,y)=>{ return x === route ? -1 : y === route ? 1 : 0 })
                                }
                            })
                        }
                        return newTasks
                    }
                    const setSubtasks = (subtasks) => subtasks.map((item)=>{
                        let newItem = {...item}
                        if(item.subtasks){
                            newItem.subtasks = reorderTasks(newItem.subtasks)
                            newItem.subtasks = setSubtasks(newItem.subtasks)
                        }
                        return newItem
                    })
                    newTask.subtasks = reorderTasks(newTask.subtasks)
                    newTask.subtasks = setSubtasks(newTask.subtasks)
            }
            setModalConfig({type: 'editTask', task: newTask, activeTask: task})
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

    const TaskDetailSection = ({task}) => {
        const TimeRemaining = () => {
            let sec, min, hour, days
            const timeLeft = () => {
                if(document.getElementById('timer')){
                    if(document.getElementById('taskDetailStart').innerText && document.getElementById('taskDetailDeadline').innerText){
                        const start = new Date(document.getElementById('taskDetailStart').innerText)
                        const deadline = new Date(document.getElementById('taskDetailDeadline').innerText)
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
                        <div id="taskDetailStart">{new Date(task.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <div>
                        <p className={styles.title}>Deadline</p>
                        <div id="taskDetailDeadline">{new Date(task.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                    <TimeRemaining />
                </div>
                <div className={styles.metrics}>
                    <div className={styles.metricContainer}>
                        <div className={styles.metricTitle}>
                            <p>Priority</p>
                            <p className={styles.metricLabel}><span>{task.priority.label}</span><span className={styles.metricValue}>{task.priority.value}%</span></p>
                        </div>
                        <div className={styles.progress}>
                            <hr style={{width: `${task.priority.value}%`}} />
                        </div>
                    </div>
                    <div className={styles.metricContainer}>
                        <div className={styles.metricTitle}>
                            <p>Effort Required</p>
                            <p><span>{task.effortRequired.label}</span><span className={styles.metricValue}>{task.effortRequired.value}%</span></p>
                        </div>
                        <div className={styles.progress}>
                            <hr style={{width: `${task.effortRequired.value}%`}} />
                        </div>
                    </div>
                    <div className={styles.metricContainer}>
                        <div className={styles.metricTitle}>
                            <p>Time Required</p>
                            <p><span>{task.timeRequired.label}</span><span className={styles.metricValue}>{task.timeRequired.value}%</span></p>
                        </div>
                        <div className={styles.progress}>
                            <hr style={{width: `${task.timeRequired.value}%`}} />
                        </div>
                    </div>
                </div>
                {task.tags.length>0?
                    <div>
                        <p className={styles.title}>Tags</p>
                        <div className={styles.tagsContainer}>
                            {task.tags.map((item, i)=><div className={styles.tags} key={i}>{item}</div>)}
                        </div>
                    </div>
                :null}
            </div>
        )
    }

    const TaskTile = ({task}) => {
        
        const addToolTipForTaskTile = (e) => {
            if(e.target.classList.contains(styles.slotContent)){
                if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                    e.target.classList.add(styles.overflownSlot)
                }else if(e.target.classList.contains(styles.overflownSlot)) {
                    e.target.classList.remove(styles.overflownSlot)
                }
            }
        }

        return (
            <div className={styles.sideSectionSlot}>
                <div className={styles.slotContent} data-title={task.name} onMouseEnter={(e)=>addToolTipForTaskTile(e)} onClick={()=>showSubtasks(task)}>
                    <div className={styles.slotText}>
                        <p>{task.name}</p>
                        {task.subtasks?
                            <div className={styles.subtasks}>
                                <CornerDownRight />
                                <p>{task.subtasks.length}</p>
                            </div>
                        :null}
                    </div>
                    <div className={styles.slotTags}>
                        <div className={styles.slotTag}><span>Priority:</span><span>{task.priority.label}</span></div>
                        <div className={styles.slotTag}><span>Time Required:</span><span>{task.timeRequired.label}</span></div>
                        <div className={styles.slotTag}><span>Effort Required:</span><span>{task.effortRequired.label}</span></div>
                    </div>
                </div>
                <MoreMenu items={[{name: "edit", function: ()=>editTaskModal(task)}, {name: "delete", function: ()=>deleteTask(task.id)}]} id={`scheduleSlotsMoreMenu${task.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                <CheckBtn task={task} openSubtasks={openSubtasks} setOpenSubtasks={setOpenSubtasks} progress={task.subtasks?task.subtasks.filter(i=>i.completed===true).length/task.subtasks.length*100:null} />
            </div>
        )
    }

    const SubTasks = ({subtasks, showCompleted}) => {
        if(subtasks){
            return (
                <div>
                    {filterTasks(subtasks).map((task)=>{
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

    const filterTasks = (tasks) => {
        let newTasks = tasks.map((item)=>{
            let newTask = null
            if(filterTags.every(i=>item.tags.includes(i))){
                newTask = item
            }
            return newTask
        })
        return newTasks.filter(i=>i!==null)
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
                {currentTask?<TaskDetailSection task={currentTask} />:null}
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
                            return filterTasks(item.tasks).map((task)=>{
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
                            return filterTasks(item.tasks).map((task)=>{
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
