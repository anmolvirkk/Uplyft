import React from 'react'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'
import styles from './_tasks.module.sass'

const Projects = () => {
    let projects = [
        {
            id: 0,
            name: 'Today'
        },
        {
            id: 1,
            name: 'All'
        }
    ]
    return (
        <div className={styles.projects}>
            {projects.map((item)=>{
                return <NavLink to={`/schedule/tasks/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{item.name}</p></NavLink>
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
