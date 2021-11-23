import React from 'react'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'
import styles from './_tasks.module.sass'
import projectsAtom from '../../../../recoil-atoms/projectsAtom'
import allRoutesAtom from '../../../../../Journals/recoil-atoms/allRoutesAtom'

const Projects = () => {
    const [projects] = useRecoilState(projectsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    return (
        <div className={styles.projects}>
            {projects.length>0?<NavLink onClick={()=>setAllRoutes({...allRoutes, project: 'today'})} to={`/schedule/tasks/today`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>Today</p></NavLink>:null}
            {projects.map((item)=>{
                return <NavLink onClick={()=>setAllRoutes({...allRoutes, project: item.id})} key={item.id} to={`/schedule/tasks/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{item.name}</p></NavLink>
            })}
            <NavLink onClick={()=>setAllRoutes({...allRoutes, project: 'all'})} to={`/schedule/tasks/all`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>All</p></NavLink>
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
