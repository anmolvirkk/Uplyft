import React from 'react'
import styles from './_taskdeadline.module.sass'

const addToolTipForTaskSlot = (e) => {
    if(e.target.getElementsByTagName('h3')[0]){
        if(e.target.getElementsByTagName('h3')[0].scrollWidth > e.target.getElementsByTagName('h3')[0].offsetWidth){
            e.target.classList.add(styles.overflownModal)
       }else if(e.target.classList.contains(styles.overflownModal)) {
           e.target.classList.remove(styles.overflownModal)
       }
    }else if(e.target.getElementsByTagName('p')[0]){
        if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
            e.target.classList.add(styles.overflownModal)
       }else if(e.target.classList.contains(styles.overflownModal)) {
           e.target.classList.remove(styles.overflownModal)
       }
    }
}

const TaskDeadline = ({task, project}) => {
    const timeline = project!==null?[
        {
            name: `${project.name} start`,
            date: new Date(project.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})
        },
        {
            name: `${project.name} end`,
            date: new Date(project.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})
        }
    ]:[]
    const reorderTimeline = () => {
        timeline.sort((a, b)=>{
            return new Date(a.date) - new Date(b.date)
        })
    }
    if(task.start){
        timeline.push({
            name: task.name,
            date: new Date(task.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})
        })
        reorderTimeline()
    }
    if(task.deadline){
        timeline.push({
            name: task.name,
            date: new Date(task.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})
        })
        reorderTimeline()
    }

    const setSubtasks = (subtasks) => subtasks.forEach((item)=>{
        if(item.start){
            timeline.push({
                name: item.name,
                date: new Date(item.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})
            })
            reorderTimeline()
        }
        if(item.deadline){
            timeline.push({
                name: item.name,
                date: new Date(item.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit'})
            })
            reorderTimeline()
        }
        if(item.subtasks){
            setSubtasks(item.subtasks)
        }
    }) 

    if(task.subtasks){
        setSubtasks(task.subtasks)
    }

    if(timeline.length > 0){
        return (
            <div className={styles.taskDeadline}>
                <hr />
                <ul>
                    {timeline.map((item, i)=>{
                        if(timeline[i+1]){
                            let daysBetween = Math.round((new Date(timeline[i+1].date)-new Date(timeline[i].date))/(1000*60*60*24))
                            let hoursBetween = Math.round((new Date(timeline[i+1].date)-new Date(timeline[i].date))/(1000*60*60))
                            let minBetween = Math.round((new Date(timeline[i+1].date)-new Date(timeline[i].date))/(1000*60))
                            let timelineSlot = [
                                {
                                    name: item.name,
                                    date: item.date
                                },
                                {
                                    name: '',
                                    date: daysBetween!==0?daysBetween+' Days':hoursBetween!==0?hoursBetween+' Hours':minBetween+' Min'
                                }
                            ]
                            return timelineSlot.map((item, i)=>{
                                return (
                                    <li key={i}>
                                        {item.name!==''?
                                        <div>
                                            <div className={styles.deadlineDot} />
                                            <div data-title={item.name} onMouseEnter={(e)=>addToolTipForTaskSlot(e)}>
                                                <h3>{item.name}</h3>
                                            </div>
                                            <div data-title={item.date} onMouseEnter={(e)=>addToolTipForTaskSlot(e)}>
                                                <p>{item.date}</p>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div data-title={item.date} onMouseEnter={(e)=>addToolTipForTaskSlot(e)} style={{marginTop: '-2px'}}>
                                                <p>{item.date}</p>
                                            </div>
                                        </div>}
                                    </li>
                                )
                            })
                        }else{
                            return (
                                <li key={i}>
                                    <div>
                                        <div className={styles.deadlineDot} />
                                        <div data-title={item.name} onMouseEnter={(e)=>addToolTipForTaskSlot(e)}>
                                            <h3>{item.name}</h3>
                                        </div>
                                        <div data-title={item.date} onMouseEnter={(e)=>addToolTipForTaskSlot(e)}>
                                            <p>{item.date}</p>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }
    return null
}

export default TaskDeadline
