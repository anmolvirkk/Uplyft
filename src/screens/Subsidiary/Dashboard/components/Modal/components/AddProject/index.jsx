import React, {useState} from 'react'
import "react-datetime/css/react-datetime.css"
import Datetime from "react-datetime"
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Flag, Navigation } from 'react-feather'

import projectsAtom from '../../../../screens/Schedule/recoil-atoms/projectsAtom'
import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors, iconsSvg } from '../../../../variables/journalConfig'
import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'
import allRoutesAtom from '../../../../screens/Journals/recoil-atoms/allRoutesAtom'

const AddProject = ({icons, type, currentProject}) => {

    const date = new Date()

    const [project, setProject] = useState(currentProject?{
        id: currentProject.id,
        color: currentProject.color,
        icon: currentProject.icon,
        name: currentProject.name,
        deadline: currentProject.deadline,
        start: currentProject.start,
        tasks: currentProject.tasks
    }:{
        id: date.valueOf(),
        color: 0,
        icon: 0,
        name: '',
        deadline: '',
        start: '',
        tasks: []
    })

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

    const submitProject = () => {
        if(type === 'add'){
            setProjects([...projects, project])
            setAllRoutes({...allRoutes, project: project.id})
        }else if(type==='edit'){
            let newProjects = projects.map((data)=>{
                let newData = {...data}
                    if(data.id === currentProject.id) {
                        newData.id = project.id
                        newData.color = project.color
                        newData.icon = project.icon
                        newData.name = project.name
                        newData.deadline = project.deadline
                    }
                return newData
            })
            let newAllCalendarEvents = allCalendarEvents.map((event)=>{
                let newEvent = {...event}
                newProjects.filter(i=>i.id===currentProject.id)[0].tasks.forEach((item)=>{
                    if(newEvent.id === item.id){
                        newEvent.color = item.color
                    }
                })
                return newEvent
            })
            setAllCalendarEvents([...newAllCalendarEvents])
            setProjects([...newProjects])
        }
        setModalConfig({type: ''})
    }

    const ProjectCustomize = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit} ${styles.habitCustomize}`}>
            <ul>
                <li>
                    <p>Color</p>
                    <ol className={styles.colors}>
                        {colors.map((color, i)=><li className="colorButtons" onClick={()=>setProject({...project, color: i})} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===project.color ? styles.activeButton : null} /></li>)}
                    </ol>
                </li> 
                <li>
                    <p>Icon</p>
                    <ol>
                        {iconsSvg.map((icon, i)=><li className="iconButtons" onClick={()=>setProject({...project, icon: i})} key={i} id={`icon${i}`}>{icon}<div className={i===project.icon ? styles.activeButton : null} /></li>)}
                    </ol>
                </li>
            </ul>
            </div>
        )
    }

    const ProjectForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <input style={{marginTop: '2vh'}} defaultValue={project.name}  onBlur={(e)=>setProject({...project, name: e.target.value})} placeholder='Enter Project Name' />
                    <div className={styles.setDates}>
                        <div className={`${styles.inputWithIcon}`}>
                            <Navigation />
                            <Datetime initialValue={project.start?project.start:'Add Start Date'} onClose={(e)=>setProject({...project, start: e._d})} />         
                        </div>
                        <div className={`${styles.inputWithIcon}`}>
                            <Flag />
                            <Datetime initialValue={project.deadline?project.deadline:'Add Deadline'} onClose={(e)=>setProject({...project, deadline: e._d})} />        
                        </div>
                    </div>
                </form>
                <ProjectCustomize />
                <div className={`${styles.footer} ${styles.projectFooter}`}>
                    <button className={styles.cancelBtn} onClick={()=>setModalConfig({type: ''})}>Back</button>
                    <button className={styles.continueBtn} onClick={submitProject}>Continue</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>{type} Project</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                    <ProjectForm />
            </div>
    )
}

export default AddProject
