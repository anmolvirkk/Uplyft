import React from 'react'
import { NavLink } from 'react-router-dom'
import AddButton from '../AddButton'
import MoreMenu from '../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
import journalStyles from '../../../Journals/_journal.module.sass'

import { useRecoilState } from 'recoil'
import habitsAtom from '../../recoil-atoms/habitsAtom'

const HabitSection = () => {
    const [habits] = useRecoilState(habitsAtom)
    return (
    <div className={journalStyles.sideSection}>
        <div className={journalStyles.slotSection}>
            {habits.length!==0 ? habits.map((item)=>{
                return <NavLink key={item.id} to={`/routines`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.title}><p>{item.title}</p>
                <MoreMenu items={[{name: "rename", function: null}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
            }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first habit!</p><ArrowDown /></div>}
        </div>
        <AddButton name="Habit" />
    </div>
)
}

export default HabitSection