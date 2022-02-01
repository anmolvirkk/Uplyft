import React from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'
import { Check } from 'react-feather'
import { useRecoilState } from 'recoil'
import { projectsAtom } from '../../../../../../../../../allAtoms'

const CheckBtn = ({task, openSubtasks, setOpenSubtasks, progress}) => {

    const [projects, setProjects] = useRecoilState(projectsAtom)
    const completed = task.completed

    const onClick = (e) => {
        const newProjects = projects.map((item)=>{
            let data = {...item}
            const setComplete = (tasks, parent) => tasks.map((item)=>{
                let newTask = {...item}
                if(newTask.id === task.id){
                    const setAllSubtasks = (tasks, set) => tasks.map((item)=>{
                        let newSubtasks = {...item}
                        newSubtasks.completed = set
                        if(newSubtasks.subtasks){
                            newSubtasks.subtasks = setAllSubtasks(newSubtasks.subtasks, set)
                        }
                        return newSubtasks
                    })
                    if(newTask.completed){
                        newTask.completed = false
                        if(newTask.subtasks){
                            newTask.subtasks = setAllSubtasks(newTask.subtasks, false)
                        }
                    }else{
                        newTask.completed = true
                        if(newTask.subtasks){
                            newTask.subtasks = setAllSubtasks(newTask.subtasks, true)
                        }
                    }
                    if(parent){
                        let addExtra = newTask.completed?1:-1
                        if((parent.subtasks.filter(i=>i.completed===true).length+addExtra)/parent.subtasks.length===1){
                            parent.completed = true
                        }else{
                            parent.completed = false
                        }
                    }
                }
                if(newTask.subtasks){
                    newTask.subtasks = setComplete(newTask.subtasks, newTask)
                }
                return newTask
            })
            if(data.tasks){
                data.tasks = setComplete(data.tasks)
            }
            if(openSubtasks.subtasks){
                setOpenSubtasks({nav: setComplete(openSubtasks.nav), subtasks: setComplete(openSubtasks.subtasks)})
            }
            return data
        })

        if(!completed){
    
            confetti({
                particleCount: 150,
                spread: 120,
                origin: {
                    x: e.clientX/window.innerWidth,
                    y: e.clientY/window.innerHeight
                }
            })
    
        }

        setProjects([...newProjects])
    }

    return (
        <div className={`${styles.checkBtn} ${completed?styles.activeCheck:null}`} onMouseDown={(e)=>onClick(e)}>
            <div className={styles.progress} style={{width: `${progress}%`}} />
            {completed?<Check />:<div className={styles.timesIndicator}></div>}
        </div>
    )
}

export default CheckBtn
