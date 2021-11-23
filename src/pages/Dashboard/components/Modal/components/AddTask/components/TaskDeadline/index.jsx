import React from 'react'
import styles from './_taskdeadline.module.sass'

const addToolTipForTaskSlot = (e) => {
    if(e.target.getElementsByTagName('h3')[0]){
        if(e.target.getElementsByTagName('h3')[0].scrollWidth > e.target.getElementsByTagName('h3')[0].offsetWidth){
            e.target.classList.add(styles.overflownModal)
            console.log(e.target)
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

const TaskDeadline = ({start, deadline, project}) => {
    const timeline = [
        {
            name: `${project.name} start`,
            date: new Date(project.start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})
        },
        {
            name: `${project.name} end`,
            date: new Date(project.deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})
        }
    ]
    const reorderTimeline = () => {
        timeline.sort((a, b)=>{
            return new Date(a.date) - new Date(b.date)
        })
    }
    if(start && !timeline.find(i=>i.date===new Date(start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'}))){
        timeline.push({
            name: 'Task Start',
            date: new Date(start).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})
        })
        reorderTimeline()
    }
    if(deadline && !timeline.find(i=>i.date===new Date(deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'}))){
        timeline.push({
            name: 'Task Deadline',
            date: new Date(deadline).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})
        })
        reorderTimeline()
    }
    if(timeline.length > 0){
        return (
            <div className={styles.taskDeadline}>
                <hr />
                <ul>
                    {timeline.map((item, i)=>{
                        if(timeline[i+1]){
                            let timelineSlot = [
                                {
                                    name: item.name,
                                    date: item.date
                                },
                                {
                                    name: '',
                                    date: Math.round((new Date(timeline[i+1].date)-new Date(timeline[i].date))/(1000*60*60*24))+' Days'
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
