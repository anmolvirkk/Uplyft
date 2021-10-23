import React from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'

const dummyContent = [
    {
        id: 0,
        title: 'meditation'
    }
]

const Tasks = () => {
    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                {dummyContent.length!==0 ? dummyContent.map((item)=>{
                    return <NavLink key={item.id} to={`/schedule/tasks`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.title}><p>{item.title}</p>
                    <MoreMenu items={[{name: "rename", function: null}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
                }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
            </div>
            <AddButton />
        </div>
    )
}

export default Tasks
