import React, {useState} from 'react'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from './_tasks.module.sass'
import { Folder } from 'react-feather'
import MoreMenu from '../../../../../../components/MoreMenu'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import { iconsSvg, colors } from '../../../../../../variables/journalConfig'
import company from '../../../../../../../../company'
import { allCalendarEventsAtom, allRoutesAtom, projectsAtom } from '../../../../../../allAtoms'
import modalConfigAtom from '../../../../../../recoil-atoms/modalConfigAtom'

const Projects = () => {
    const [projects, setProjects] = useRecoilState(projectsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)

    const addToolTipForTasks = (e) => {
        if(e.target.getElementsByTagName('p')[0]){
            if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                e.target.classList.add(styles.overflownSlot)
            }else if(e.target.classList.contains(styles.overflownSlot)) {
                e.target.classList.remove(styles.overflownSlot)
            }
        }
    }
    
    const [newProject, setNewProject] = useState()

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
        const reset = async () => {
            setNewProject(false)
        }
        reset().then(()=>{
            setNewProject(newProjects[newProjects.length-1].id)
            setAllRoutes({...allRoutes, project: newProjects[newProjects.length-1].id})
        })
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
    }

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    return (
        <div className={styles.projects}>
            <Redirect to={`/dashboard/${company.schedule}/tasks/${newProject?newProject:allRoutes.project?allRoutes.project:'all'}`} />
            {projects.map((item)=>{
                const completedTasks = projects.find(i=>i.id===item.id).tasks.filter(i=>i.completed===true)?projects.find(i=>i.id===item.id).tasks.filter(i=>i.completed===true).length:0
                const totalTasks = projects.find(i=>i.id===item.id).tasks.length
                return (
                    <div key={item.id} className={styles.projectWrapper}>
                        <NavLink onMouseEnter={(e)=>addToolTipForTasks(e)} data-title={item.name} onClick={()=>setAllRoutes({...allRoutes, project: item.id})} to={`/dashboard/${company.schedule}/tasks/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}>
                            <div className={styles.slotContent}>
                                <div className={styles.projectIcon} style={{color: colors[item.color]}}>{item.icon?iconsSvg[item.icon]:<Folder />}</div>
                                <p>{item.name}</p>
                                {item.id!=='all'&&item.id!=='today'?<div className={styles.moreMenuWrapper}><MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editProject', project: item})}, {name: "delete", function: ()=>deleteProject(item.id)}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-40px', top: '32px'}} /></div>:null} 
                                <div className={styles.progressNum}>
                                    {completedTasks}/
                                    {totalTasks}
                                </div>  
                            </div>
                            <div className={styles.progress}>
                                    <hr style={{width: `${completedTasks/totalTasks*100?completedTasks/totalTasks*100:0}%`}} />
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

const Tasks = () => {
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const isMobile = window.innerWidth <= 640
    return (
        <div style={isMobile?{display: 'none'}:null}>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                <Projects />
            </div>
            <AddButton name="project" onclick={()=>setModalConfig({type: 'addProject'})} />
        </div>
    )
}

export default Tasks
