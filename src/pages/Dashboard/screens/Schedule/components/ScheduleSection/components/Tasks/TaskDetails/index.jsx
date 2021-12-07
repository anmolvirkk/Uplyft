import React, { useState } from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import AddButton from '../../../../AddButton'
import { ChevronUp, ChevronDown, CornerDownRight } from 'react-feather'
import styles from './_taskdetails.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../../Journals/recoil-atoms/modalConfigAtom'
import projectsAtom from '../../../../../recoil-atoms/projectsAtom'
import { colors, iconsSvg } from '../../../../../../../variables/journalConfig'
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
    
    const deleteTask = (id, project) => {
        let newProjects = projects.map((data)=>{
            let newData = {...data}
            if(newData.id === project){
                newData.tasks = newData.tasks.filter(val=>val.id!==id)
            }
            return newData
        })
        setProjects([...newProjects])
        
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setAllCalendarEvents([...newAllCalendarEvents])
    }

    const [openSubtasks, setOpenSubtasks] = useState(false)

    const SubTasks = ({subtasks}) => {
        if(subtasks){
            return (
                <div>
                    {subtasks.map((task)=>{
                        return (
                            <div key={task.id}>
                                <div className={styles.sideSectionSlot} data-title={task.name}>
                                    <div className={styles.slotContent}>
                                        {console.log(task)}
                                        <p>{task.name}</p>
                                        {task.subtasks?
                                            <div className={styles.subtasks} onClick={()=>setOpenSubtasks(task.subtasks)}>
                                                <CornerDownRight />
                                                <p>{task.subtasks.length}</p>
                                            </div>
                                        :null}
                                    </div>
                                    <CheckBtn id={task.id} completed={task.completed} />
                                </div>
                            </div>
                        )
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
                <h3 className={styles.slotLabel}><span>Remaining</span><div>{projects.filter(i=>i.id===allRoutes['project'])[0]?projects.filter(i=>i.id===allRoutes['project'])[0].tasks?projects.filter(i=>i.id===allRoutes['project'])[0].tasks.filter(i=>i.completed===false).length: 0: 0}</div></h3>
                <div className={styles.tasksNav}></div>
                {
                    openSubtasks?
                    <SubTasks subtasks={openSubtasks} />
                    :
                    projects.map((item)=>{
                        if(item.id === allRoutes['project']){
                            return item.tasks.map((task)=>{
                                if(!task.completed){
                                    return (
                                        <div key={task.id}>
                                            <div className={styles.sideSectionSlot} data-title={task.name}>
                                                <div className={styles.slotContent}>
                                                    <p>{task.name}</p>
                                                    {task.subtasks?
                                                        <div className={styles.subtasks} onClick={()=>setOpenSubtasks(task.subtasks)}>
                                                            <CornerDownRight />
                                                            <p>{task.subtasks.length}</p>
                                                        </div>
                                                    :null}
                                                </div>
                                                <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editTask', task: task})}, {name: "delete", function: ()=>deleteTask(task.id, item.id)}]} id={`scheduleSlotsMoreMenu${task.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                                                <CheckBtn id={task.id} completed={task.completed} />
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            })
                        }
                        return null
                    })
                }
                <h3 className={styles.slotLabel} onClick={()=>setCompletedOpen(!completedOpen)}><span>Completed</span>{completedOpen?<ChevronUp />:<ChevronDown />}</h3>
                {
                    completedOpen?projects.map((item)=>{
                        if(item.id === allRoutes['project']){
                            return item.tasks.map((task)=>{
                                if(task.completed){
                                    return (
                                        <div key={task.id} className={styles.sideSectionSlot} data-title={task.name}>
                                            <div className={styles.slotContent}>
                                            <div style={{backgroundColor: colors[task.color]}}>
                                                    {iconsSvg[task.icon]}
                                                </div>
                                                <p>{task.name}</p>
                                            </div>
                                            <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editTask', task: task})}, {name: "delete", function: ()=>deleteTask(task.id, item.id)}]} id={`scheduleSlotsMoreMenu${task.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                                            <CheckBtn id={task.id} completed={task.completed} />
                                        </div>
                                    )
                                }
                                return null
                            })
                        }
                        return null
                    }):null
                }
            </div>
            <Filters />
            <AddButton name="task" onclick={()=>setModalConfig({type: 'addTask'})} />
        </div>
    )
}

export default TaskDetails
