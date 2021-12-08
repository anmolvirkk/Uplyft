import React from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'
import { Check } from 'react-feather'
import { useRecoilState } from 'recoil'
import projectsAtom from '../../../../../../../recoil-atoms/projectsAtom'

const CheckBtn = ({task, openSubtasks, setOpenSubtasks}) => {

    const [projects, setProjects] = useRecoilState(projectsAtom)
    const completed = task.completed

    const onClick = (e) => {
        const newProjects = projects.map((item)=>{
            let data = {...item}
            const setComplete = (tasks) => tasks.map((item)=>{
                let newTask = {...item}
                if(newTask.id === task.id){
                    if(newTask.completed){
                        newTask.completed = false
                    }else{
                        newTask.completed = true
                        confetti({
                            particleCount: 150,
                            spread: 60,
                            origin: {
                                x: e.clientX/window.innerWidth,
                                y: e.clientY/window.innerHeight
                            }
                        })
                    }
                }
                if(newTask.subtasks){
                    newTask.subtasks = setComplete(newTask.subtasks)
                }
                return newTask
            })
            data.tasks = setComplete(data.tasks)
            setOpenSubtasks({...openSubtasks, subtasks: setComplete(openSubtasks.subtasks)})
            return data
        })
        setProjects([...newProjects])
    }
    return (
        <div className={`${styles.checkBtn} ${completed?styles.activeCheck:null}`} onMouseDown={(e)=>onClick(e)}>
            <div className={styles.progress} />
            {completed?<Check />:<div className={styles.timesIndicator}></div>}
        </div>
    )
}

export default CheckBtn
