import React, {useRef} from 'react'
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
import InputBox from '../../../../../Auth/components/InputBox'

const AddProject = ({icons, type, currentProject}) => {

    const date = new Date()

    const project = useRef(currentProject?{
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

    const setProject = (key, val) => {
        project.current[key] = val
    }

    
    const updateDecor =  {
        color: (num) => {
            project.current.color = num
            for(let i=0; i<document.getElementById('colors').children.length; i++){
                if(i === num){
                    document.getElementById('colors').children[i].children[0].className = styles.activeButton
                }else{
                    document.getElementById('colors').children[i].children[0].classList.remove(styles.activeButton)
                }
            }
        },
        icon: (num) => {
            project.current.icon = num
            for(let i=0; i<document.getElementById('icons').children.length; i++){
                if(i === num){
                    document.getElementById('icons').children[i].children[0].className = styles.activeButton
                }else{
                    document.getElementById('icons').children[i].children[0].classList.remove(styles.activeButton)
                }
            }

        }
    }

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

    const submitProject = () => {
        if(type === 'add'){
            setProjects([...projects, project.current])
            setAllRoutes({...allRoutes, project: project.current.id})
        }else if(type==='edit'){
            let newProjects = projects.map((data)=>{
                let newData = {...data}
                    if(data.id === currentProject.id) {
                        newData.id = project.current.id
                        newData.color = project.current.color
                        newData.icon = project.current.icon
                        newData.name = project.current.name
                        newData.deadline = project.current.deadline
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
                    <ol className={styles.colors} id='colors'>
                        {colors.map((color, i)=><li className="colorButtons" onClick={()=>updateDecor.color(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===project.current.color ? styles.activeButton : null} /></li>)}
                    </ol>
                </li> 
                <li>
                    <p>Icon</p>
                    <ol id='icons'>
                        {iconsSvg.map((icon, i)=><li className="iconButtons" onClick={()=>updateDecor.icon(i)} key={i} id={`icon${i}`}><div className={i===project.current.icon ? styles.activeButton : null} />{icon}</li>)}
                    </ol>
                </li>
            </ul>
            </div>
        )
    }

    const ProjectForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form className={styles.projectForm}>
                    <InputBox type='text' name='Enter Project Name' value={project.current.name} onBlur={(e)=>setProject('name', e.target.value)} />
                    <div className={styles.setDates}>
                        <div className={`${styles.inputWithIcon}`}>
                            <Navigation />
                            <Datetime initialValue={project.current.start?project.current.start:'Add Start Date'} onClose={(e)=>setProject('start', e._d)} />         
                        </div>
                        <div className={`${styles.inputWithIcon}`}>
                            <Flag />
                            <Datetime initialValue={project.current.deadline?project.current.deadline:'Add Deadline'} onClose={(e)=>setProject('deadline', e._d)} />        
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
