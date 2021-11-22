import React, {useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Flag } from 'react-feather'

import projectsAtom from '../../../../screens/Schedule/recoil-atoms/projectsAtom'
import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors, iconsSvg } from '../../../../variables/journalConfig'

const AddProject = ({icons, type, currentProject}) => {

    const date = new Date()

    const [project, setProject] = useState(currentProject?{
        id: currentProject.id,
        color: currentProject.color,
        icon: currentProject.icon,
        name: currentProject.name,
        deadline: currentProject.deadline
    }:{
        id: date.valueOf(),
        color: 0,
        icon: 0,
        name: '',
        deadline: ''
    })

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const submitProject = () => {
        if(type === 'add'){
            setProjects([...projects, project])
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
            setProjects([...newProjects])
        }
        setModalConfig({type: ''})
    }

    
    const selectIcon = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name.type.render.displayName){
                return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
            }
            return null
        })

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
                        {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setProject({...project, icon: i})} key={i} id={`icon${i}`}>{selectIcon(icon)}<div className={i===project.icon ? styles.activeButton : null} /></li>)}
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
                    <div className={styles.habitNum}>
                        <input defaultValue={project.name}  onBlur={(e)=>setProject({...project, name: e.target.value})} placeholder='Enter Project Name' />
                    </div>
                    <div className={`${styles.inputWithIcon}`} style={{marginTop: '2vh'}} onBlur={(e)=>setProject({...project, deadline: e.target.value})}>
                        <Flag />
                        <DayPickerInput placeholder='Add Deadline' />        
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
