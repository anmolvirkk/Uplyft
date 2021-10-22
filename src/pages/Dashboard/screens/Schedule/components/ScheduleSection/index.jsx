import React from 'react'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../../components/AddButton'
import MoreMenu from '../../../../components/MoreMenu'
import {ArrowDown, RefreshCw, Check, Calendar} from 'react-feather'
import styles from './_main.module.sass'
import journalStyles from '../../../Journals/_journal.module.sass'

const dummyContent = [
    {
        id: 0,
        title: 'meditation'
    }
]

const ScheduleSection = () => {
    return (
    <div className={journalStyles.sideSection}>
        <div className={styles.sectionHeader}>
            <RefreshCw />
            <Check />
            <Calendar />
        </div>
        <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
            {dummyContent.length!==0 ? dummyContent.map((item)=>{
                return <NavLink key={item.id} to={`/routines`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.title}><p>{item.title}</p>
                <MoreMenu items={[{name: "rename", function: null}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
            }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
        </div>
        <AddButton name="Routine" />
    </div>
)
}

export default ScheduleSection