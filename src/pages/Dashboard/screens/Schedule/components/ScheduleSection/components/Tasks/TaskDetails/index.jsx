import React, { useState } from 'react'
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
    
    const deleteTask = (id) => {
        let newProjects = projects.map((data)=>{
            let newData = {...data}
            if(newData.id === allRoutes['project']){
                newData.tasks = newData.tasks.filter(val=>val.id!==id)
            }
            return newData
        })
        setProjects([...newProjects])
        
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setAllCalendarEvents([...newAllCalendarEvents])
    }

    const [openSubtasks, setOpenSubtasks] = useState({subtasks: false, nav: []})

    const showSubtasks = (task) => {
        if(task){
            if(openSubtasks.nav.includes(task)){
                openSubtasks.nav.length = openSubtasks.nav.indexOf(task) + 1
                setOpenSubtasks({subtasks: task.subtasks, nav: [...openSubtasks.nav]})
            }else{
                setOpenSubtasks({subtasks: task.subtasks, nav: [...openSubtasks.nav, task]})
            }
        }else{
            setOpenSubtasks({subtasks: false, nav: []})
        }
    }

    const TaskTile = ({task}) => {
        return (
            <div className={styles.sideSectionSlot} data-title={task.name}>
                <div className={styles.slotContent}>
                    <p>{task.name}</p>
                    {task.subtasks?
                        <div className={styles.subtasks} onClick={()=>showSubtasks(task)}>
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
                <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editTask', task: task})}, {name: "delete", function: ()=>deleteTask(task.id)}]} id={`scheduleSlotsMoreMenu${task.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
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
                <h3 className={styles.slotLabel}>
                    <span>Remaining</span>
                    <div>
                        {openSubtasks.subtasks?openSubtasks.subtasks.filter(i=>i.completed===false).length
                        :projects.filter(i=>i.id===allRoutes['project'])[0]?projects.filter(i=>i.id===allRoutes['project'])[0].tasks?projects.filter(i=>i.id===allRoutes['project'])[0].tasks.filter(i=>i.completed===false).length: 0: 0}
                    </div>
                </h3>
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
                <h3 className={styles.slotLabel} onClick={()=>setCompletedOpen(!completedOpen)}>
                    <span>Completed</span>{completedOpen?<ChevronUp />:<ChevronDown />}
                </h3>
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
