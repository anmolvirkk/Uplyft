import React from 'react'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'
import styles from './_tasks.module.sass'
import projectsAtom from '../../../../recoil-atoms/projectsAtom'
import allRoutesAtom from '../../../../../Journals/recoil-atoms/allRoutesAtom'
import { Folder } from 'react-feather'
import MoreMenu from '../../../../../../components/MoreMenu'

const Projects = () => {
    const [projects] = useRecoilState(projectsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    return (
        <div className={styles.projects}>
            {projects.map((item)=>{
                const completedTasks = projects.find(i=>i.id===item.id).tasks.filter(i=>i.completed===true)?projects.find(i=>i.id===item.id).tasks.filter(i=>i.completed===true).length:0
                const totalTasks = projects.find(i=>i.id===item.id).tasks.length
                return (
                    <div key={item.id} className={styles.projectWrapper}>
                        <NavLink onClick={()=>setAllRoutes({...allRoutes, project: item.id})} to={`/schedule/tasks/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}>
                            <div className={styles.projectIcon}><Folder /></div>
                            <p>{item.name}</p>
                            <div className={styles.progressNum}>
                                {completedTasks}/
                                {totalTasks}
                            </div>
                            {item.id!=='all'&&item.id!=='today'?<div className={styles.moreMenuWrapper}><MoreMenu items={[{name: "edit", function: ()=>console.log('task')}, {name: "delete", function: ()=>console.log('task')}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-5vh', top: '3.5vh'}} /></div>:null}
                            <div className={styles.progress}>
                                <hr style={{width: `${completedTasks/totalTasks*100?completedTasks/totalTasks*100:0}%`}} />
                            </div>
                        </NavLink>
                        {item.id===allRoutes['project']?
                        <div className={styles.projectTree}>
                        </div>
                        :null}
                    </div>
                )
            })}
        </div>
    )
}

const Tasks = () => {
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                <Projects />
            </div>
            <AddButton name="project" onclick={()=>setModalConfig({type: 'addProject'})} />
        </div>
    )
}

export default Tasks
