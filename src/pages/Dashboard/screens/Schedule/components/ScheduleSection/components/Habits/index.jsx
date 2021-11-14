import React from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'

import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'

import {useRecoilState, useSetRecoilState} from 'recoil' 
import habitsAtom from '../../../../recoil-atoms/habitsAtom'

import styles from './_habits.module.sass'

import {colors, iconsSvg} from '../../../../../../variables/journalConfig'

import allRoutesAtom from '../../../../../Journals/recoil-atoms/allRoutesAtom'

import CheckBtn from './HabitDetails/components/CheckBtn'
import allCalendarEventsAtom from '../../../../recoil-atoms/allCalendarEventsAtom'

    
document.addEventListener('mouseover', function(e) {
    if(e.target.classList.contains(styles.sideSectionSlot)){
        if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
             e.target.classList.add(styles.overflownSlot)
        }else if(e.target.classList.contains(styles.overflownSlot)) {
            e.target.classList.remove(styles.overflownSlot)
        }
    }
})

const Habits = () => {
    const [habits, setHabits] = useRecoilState(habitsAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

    const openHabitModal = () => {
        setModalConfig({type: 'addhabit'})
    }

    const openEditHabitModal = (habit) => {
        setModalConfig({type: 'edithabit', habit: habit})
    }

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    
    const deleteHabit = (id) => {
        let newHabits = habits.filter((value)=>value.id!==id)
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setHabits([...newHabits])
        setAllCalendarEvents([...newAllCalendarEvents])
    }

    
    const setRoute = (id) => {
        setAllRoutes({...allRoutes, habit: id})
    }

    return (
        <div>
            <div className={styles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                {habits.length!==0 ? habits.map((item)=>{
                    return (
                        <NavLink onClick={()=>setRoute(item.id)} key={item.id} to={`/schedule/habits/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot} data-title={item.name}>
                           <div className={styles.slotContent}>
                               <div style={{backgroundColor: colors[item.color]}}>
                                    {iconsSvg[item.icon]}
                                </div>
                                <p>{item.name}</p>
                            </div>
                            <MoreMenu items={[{name: "edit", function: ()=>openEditHabitModal(item)}, {name: "delete", function: ()=>deleteHabit(item.id)}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                            <CheckBtn times={item.times} id={item.id} timesCompleted={item.timesCompleted} datesCompleted={item.datesCompleted} />
                        </NavLink>
                    )
                }) : <div className={styles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
            </div>
            <AddButton name="habit" onclick={openHabitModal} />
        </div>
    )
}

export default Habits