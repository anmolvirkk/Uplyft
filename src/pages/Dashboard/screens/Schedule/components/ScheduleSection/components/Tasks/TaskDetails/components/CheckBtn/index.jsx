import React from 'react'
import styles from './_checkBtn.module.sass'
import confetti from 'canvas-confetti'
import { Check } from 'react-feather'
import { useRecoilState } from 'recoil'
import projectsAtom from '../../../../../../../recoil-atoms/projectsAtom'

const CheckBtn = ({id, completed}) => {

    const [projects, setProjects] = useRecoilState(projectsAtom)

    const onClick = (e) => {
        let newProjects = projects.map((data)=>{
            let newData = {...data}
            let newTasks = newData.tasks.map((data)=>{
                let newTaskData = {...data}
                if(newTaskData.id === id){
                    if(newTaskData.completed){
                        newTaskData.completed = false
                    }else{
                        newTaskData.completed = true
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
                return newTaskData
            })
            newData.tasks = newTasks
            return newData
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
