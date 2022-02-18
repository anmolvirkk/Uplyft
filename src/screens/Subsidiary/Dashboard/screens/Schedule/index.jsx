import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import ScheduleSection from './components/ScheduleSection'
import MainCalendar from './components/Calendar'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Redirect } from 'react-router'
import company from '../../../../../company'
import MobileHeader from './components/MobileHeader'
import styles from './_schedule.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite/build/OutsideClickHandler'
import { Calendar, Folder, Plus, RefreshCw } from 'react-feather'
import { colors, iconsSvg } from '../../variables/journalConfig'
import MoreMenu from '../../components/MoreMenu'
import CheckBtn from './components/ScheduleSection/components/Habits/HabitDetails/components/CheckBtn'
import { allRoutesAtom, scheduleAddDropDownAtom, scheduleSideMenuAtom, habitsAtom, allCalendarEventsAtom, projectsAtom, eventsAtom, scheduleHeaderAtom } from '../../allAtoms'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import Settings from '../../components/Settings'

const Schedule = React.memo(({updateBackendless, updateAtoms}) => {
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const isMobile = (window.innerWidth < 1450)
    const [scheduleAddDropDown, setScheduleAddDropDown] = useRecoilState(scheduleAddDropDownAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [scheduleSideMenu, setScheduleSideMenu] = useRecoilState(scheduleSideMenuAtom)
    const [habits, setHabits] = useRecoilState(habitsAtom)
    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [projects, setProjects] = useRecoilState(projectsAtom)
    const [events, setEvents] = useRecoilState(eventsAtom)
    
    const deleteHabit = (id) => {
        let newHabits = habits.filter((value)=>value.id!==id)
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setHabits([...newHabits])
        setAllCalendarEvents([...newAllCalendarEvents])
        if(newHabits[newHabits.length-1]){
            closeSidebarAfter({habit: newHabits[newHabits.length-1].id}, {className: ''}, 'habits', newHabits[newHabits.length-1].name)
        }else{
            showCalendar()
        }
    }

    const deleteProject = (id) => {
        let newProjects = projects.filter(i=>i.id!==id)
        newProjects = newProjects.map((item)=>{
            let newData = {...item}
            if(item.id === 'all' || item.id === 'today'){
                newData.tasks = item.tasks.filter(i=>!projects.filter(i=>i.id===id)[0].tasks.includes(i))
            }
            return newData
        })
        setProjects([...newProjects])
        let newAllCalendarEvents = allCalendarEvents.map((event)=>{
            let shouldReturn = false
            for(let i=0; i<projects.filter(i=>i.id===id)[0].tasks.length; i++){
                if(projects.filter(i=>i.id===id)[0].tasks[i].id === event.id){
                    shouldReturn = false
                    break
                }else{
                    shouldReturn = true
                }
            }
            if(shouldReturn){
                return event
            }else{
                return null
            }
        })
        setAllCalendarEvents([...newAllCalendarEvents.filter(i=>i!==null)])
        closeSidebarAfter({project: newProjects[newProjects.length-1].id}, {className: ''}, 'tasks', newProjects[newProjects.length-1].name)
    }

    const deleteEvent = (id) => {
        let newEvents = events.filter((value)=>value.id!==id)
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setEvents([...newEvents])
        setAllCalendarEvents([...newAllCalendarEvents])
        
        if(newEvents[newEvents.length-1]){
            closeSidebarAfter({event: newEvents[newEvents.length-1].id}, {className: ''}, 'event', newEvents[newEvents.length-1].name)
        }else{
            showCalendar()
        }

    }

    const sideMenuHeight = window.innerHeight - 80 - 60

    const toggleDetails = {
        show: () => {
            document.getElementById('scheduleSideSection').style.transform = 'translateX(0%)'
        },
        hide: () => {
            document.getElementById('scheduleSideSection').style.transform = 'translateX(-100%)'
        }
    }

    const setScheduleHeader = useSetRecoilState(scheduleHeaderAtom)

    const closeSidebarAfter = (route, target, category, name) => {
        if(target.tagName !== 'LI'){
            const setPage = async () => {
                if(category){
                    if(!allRoutes.project && category==='tasks'){
                        setAllRoutes({...allRoutes, project: 'all', scheduleSection: category})
                        setScheduleHeader({title: name, onAdd: ()=>setModalConfig({type: 'addTask'})})
                    }else if(category==='tasks'){
                        setAllRoutes({...allRoutes, scheduleSection: category, ...route})
                        setScheduleHeader({title: name, onAdd: ()=>setModalConfig({type: 'addTask'})})
                    }else{
                        setAllRoutes({...allRoutes, scheduleSection: category, ...route})
                        setScheduleHeader({title: name, onAdd: null})
                    }
                }
                toggleDetails.show()
            }
            if(target.className){
                if(typeof target.className === 'string'){
                    if(!target.className.includes('checkBtn') && !target.className.includes('moremenu')){
                        setPage().then(()=>{
                            setScheduleSideMenu(false)
                        })
                    }
                }
            }else{
                setPage().then(()=>{
                    setScheduleSideMenu(false)
                })
            }
        }
    }

    const showCalendar = () => {
        const showCalendar = async () => {
            toggleDetails.hide()
        }
        showCalendar().then(()=>{
            setScheduleHeader({title: 'Schedule', onAdd: null})
            setScheduleSideMenu(false)
        })
    }

    const closeSideMenu = (e) => {
        if(e.target.id !== 'mobileHeaderMenuBtn'){
            setScheduleSideMenu(false)
        }
    }

    const closeAddMenu = (e) => {
        if(e.target.id !== 'mobileHeaderAddBtn'){
            setScheduleAddDropDown(false)
        }
    }

    const addTaskToProject = (route) => {
        setAllRoutes({...allRoutes, ...route})
        setModalConfig({type: 'addTask'})
    }

    
    useEffect(()=>{
        if(isMobile){
            setScheduleHeader({title: 'Schedule', onAdd: null})
            setScheduleSideMenu(false)
            if(document.getElementById('scheduleSideSection')){
                document.getElementById('scheduleSideSection').style.transform = 'translateX(-100%)'
            }
        }else{
            if(document.getElementById('scheduleSideSection')){
                document.getElementById('scheduleSideSection').style.transform = 'translateX(0%)'
            }
            if(document.getElementById('mainSideBar')){
                document.getElementById('mainSideBar').style.display = 'grid'
            }
        }
    }, [setScheduleHeader, setScheduleSideMenu, isMobile])

    const [currentCategory, setCurrentCategory] = useState('all')

    return (
        <div style={{display: 'flex', flexFlow: isMobile?'column-reverse':null}}>
            <Redirect to={allRoutes&&allRoutes['scheduleSection']?`/${company.subsidiary}/dashboard/${company.schedule}/${allRoutes['scheduleSection']}/${allRoutes['scheduleSection']==='habits'?allRoutes['habit']?allRoutes['habit']:'':allRoutes['scheduleSection']==='tasks'?allRoutes['project']?allRoutes['project']:'':''}`:`/${company.subsidiary}/dashboard/${company.schedule}/habits`} />
            
            <SideBar />

            <Settings updateBackendless={updateBackendless} updateAtoms={updateAtoms} />

            <ScheduleSection />
            <MainCalendar isMobile={isMobile} />

            {isMobile?<MobileHeader updateBackendless={updateBackendless} updateAtoms={updateAtoms} />:null}
            
            {isMobile?
                <div id='scheduleAddDropDownContainer' className={styles.scheduleAddDropDown} style={{transform: `translateY(${scheduleAddDropDown?0:150}%)`}}>
                    <OutsideClickHandler onOutsideClick={(e)=>closeAddMenu(e)}>
                        <button onMouseDown={()=>setModalConfig({type: 'addhabit'})}><RefreshCw /><p>Add Habit</p></button>
                        <button onMouseDown={()=>setModalConfig({type: 'addProject'})}><Folder /><p>Add Project</p></button>
                        <button onMouseDown={()=>setModalConfig({type: 'addEvent'})}><Calendar /><p>Add Event</p></button>
                    </OutsideClickHandler>
                </div>
            :null}
            
            {isMobile?
                <div id='scheduleSideMenu' className={styles.scheduleSideMenu} style={{height: `${sideMenuHeight}px`, maxHeight: `${sideMenuHeight}px`, transform: `translateX(${scheduleSideMenu?0:-100}%)`}}>
                    <OutsideClickHandler onOutsideClick={(e)=>closeSideMenu(e)}>
                        <div className={`${styles.sideSectionSlot} ${styles.showCalendar}`} onMouseDown={showCalendar}>
                            <div className={styles.slotContent}>
                                <p>Show Calendar</p>
                            </div>
                        </div>   
                        <ul className={styles.switchCategory}>
                            <li onMouseDown={()=>setCurrentCategory('all')} className={currentCategory==='all'?styles.activeCategory:null}>All</li>
                            <li onMouseDown={()=>setCurrentCategory('habits')} className={currentCategory==='habits'?styles.activeCategory:null}>Habits</li>
                            <li onMouseDown={()=>setCurrentCategory('projects')} className={currentCategory==='projects'?styles.activeCategory:null}>Projects</li>
                            <li onMouseDown={()=>setCurrentCategory('events')} className={currentCategory==='events'?styles.activeCategory:null}>Events</li>
                        </ul>
                        {currentCategory==='all'||currentCategory==='habits'?
                            <div className={styles.sideMenuCategory}>
                                <h3><p><RefreshCw />Habits</p><Plus onMouseDown={()=>setModalConfig({type: 'addhabit'})} /></h3>
                                <div className={styles.options}>
                                    {habits.map((item)=>{
                                        return (
                                            <div onClick={(e)=>closeSidebarAfter({habit: item.id}, e.target, 'habits', item.name)} key={item.id} className={styles.sideSectionSlot} data-title={item.name}>
                                                <div className={styles.slotContent}>
                                                    <div style={{backgroundColor: colors[item.color]}} className={styles.habitIcon}>
                                                        {iconsSvg[item.icon]}
                                                    </div>
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className={styles.habitOptions}>
                                                    <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'edithabit', habit: item})}, {name: "delete", function: ()=>deleteHabit(item.id)}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                                                    <CheckBtn times={item.times} id={item.id} timesCompleted={item.timesCompleted} datesCompleted={item.datesCompleted} />
                                                </div>
                                            </div>   
                                        )
                                    })}
                                </div>
                            </div>
                        :null}
                        {currentCategory==='all'||currentCategory==='projects'?
                            <div className={styles.sideMenuCategory}>
                                <h3><p><Folder />Projects</p><Plus onMouseDown={()=>setModalConfig({type: 'addProject'})} /></h3>
                                <div className={styles.options}>
                                    {projects.map((item)=>{
                                        const completedTasks = projects.find(i=>i.id===item.id).tasks.filter(i=>i.completed===true)?projects.find(i=>i.id===item.id).tasks.filter(i=>i.completed===true).length:0
                                        const totalTasks = projects.find(i=>i.id===item.id).tasks.length
                                        return (
                                            <div key={item.id} data-title={item.name} onClick={(e)=>closeSidebarAfter({project: item.id}, e.target, 'tasks', item.name)} className={styles.projectSideSectionSlot}>
                                                <div className={styles.slotContent}>
                                                    <div className={styles.title}>
                                                        <p>{item.name}</p>
                                                    </div>
                                                    <div className={styles.title}>
                                                        {item.id!=='all'&&item.id!=='today'?<div className={styles.projectMoreMenuWrapper}><MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editProject', project: item})}, {name: "delete", function: ()=>deleteProject(item.id)}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-5vh', top: '3.5vh'}} /></div>:null} 
                                                        <div className={styles.projectProgressNum} style={{marginLeft: '12px'}}>
                                                            {completedTasks}/
                                                            {totalTasks}
                                                        </div>  
                                                        <Plus className={styles.addTaskBtn} onMouseDown={()=>addTaskToProject({project: item.id})} />
                                                    </div>
                                                </div>
                                                <div className={styles.progress}>
                                                        <hr style={{width: `${completedTasks/totalTasks*100?completedTasks/totalTasks*100:0}%`}} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        :null}
                        {currentCategory==='all'||currentCategory==='events'?
                            <div className={styles.sideMenuCategory}>
                                <h3><p><Calendar />Events</p><Plus onMouseDown={()=>setModalConfig({type: 'addEvent'})} /></h3>
                                <div className={styles.options}>
                                    {events.map((item)=>{
                                        return (
                                            <div onClick={(e)=>closeSidebarAfter({event: item.id}, e.target, 'events', item.name)} key={item.id} className={`${styles.sideSectionSlot} ${styles.eventSlot}`} data-title={item.name}>
                                                <div className={styles.eventSlot}>
                                                    <p>{item.name}</p>
                                                    <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editEvent', event: item})}, {name: "delete", function: ()=>deleteEvent(item.id)}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-1.5vh', top: '3.5vh'}} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        :null}
                    </OutsideClickHandler>
                </div>
            :null}

        </div>
    )
})

export default Schedule