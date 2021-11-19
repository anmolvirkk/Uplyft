import React from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import {AlertTriangle, ArrowDown, BatteryCharging, Clock, Flag} from 'react-feather'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'
import styles from './_tasks.module.sass'

const taskCategories = [
    {
        id: 0,
        title: 'Focus',
        type: [{name: 'important', val: 3}, {name: 'urgent', val: 3}]
    },
    {
        id: 0,
        title: 'Quick Wins',
        type: [{name: 'important', val: 3}, {name: 'timeRequired', val: 0}]
    },
    {
        id: 0,
        title: 'Easy Wins',
        type: [{name: 'important', val: 3}, {name: 'effort', val: 0}]
    },
    {
        id: 1,
        title: 'Get back to',
        type: [{name: 'important', val: 3}, {name: 'urgent', val: 0}]
    },
    {
        id: 2,
        title: 'Delegate',
        type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
    }
]

const TaskBasicCategories = () => {
    return (
        <div className={styles.basicCategories}>
            <div data-title="Urgent">  
                <NavLink to={`/schedule/tasks/urgent`}><Flag /></NavLink>
            </div>
            <div data-title="Important">  
                <NavLink to={`/schedule/tasks/important`}><AlertTriangle /></NavLink>
            </div>
            <div data-title="Quick">  
                <NavLink to={`/schedule/tasks/quick`}><Clock /></NavLink>
            </div>
            <div data-title="Easy">  
                <NavLink to={`/schedule/tasks/easy`}><BatteryCharging /></NavLink>
            </div>
        </div>
    )
}

const Tasks = () => {
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                <TaskBasicCategories />
                <NavLink to={`/schedule/tasks/all`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot}><p>All</p></NavLink>
                {taskCategories.length!==0 ? taskCategories.map((item)=>{
                    return <NavLink key={item.id} to={`/schedule/tasks/${item.id}`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.title}><p>{item.title}</p>
                    <MoreMenu items={[{name: "rename", function: null}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
                }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
            </div>
            <AddButton name="task" onclick={()=>setModalConfig({type: 'addTask'})} />
        </div>
    )
}

export default Tasks
