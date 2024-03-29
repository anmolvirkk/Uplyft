import React, {useState} from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import { ChevronDown, ChevronUp, CheckSquare, Inbox} from 'react-feather'
import { NavLink, Redirect } from 'react-router-dom'
import AddButton from '../../../AddButton'

import {useRecoilState, useSetRecoilState} from 'recoil' 

import styles from './_habits.module.sass'

import {colors, iconsSvg} from '../../../../../../variables/journalConfig'

import CheckBtn from './HabitDetails/components/CheckBtn'
import OutsideClickHandler from 'react-outside-click-handler-lite'

import company from '../../../../../../../../company'

import { completedOpenAtom, allCalendarEventsAtom, allRoutesAtom, habitsAtom } from '../../../../../../allAtoms'
import modalConfigAtom from '../../../../../../recoil-atoms/modalConfigAtom'

const addToolTipForHabits = (e) => {
    if(e.target.classList.contains(styles.sideSectionSlot)){
        if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
            e.target.classList.add(styles.overflownSlot)
        }else if(e.target.classList.contains(styles.overflownSlot)) {
            e.target.classList.remove(styles.overflownSlot)
        }
    }
}

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

    let date = new Date()
    const [dropDownDay, setDropDownDay] = useState({day: date.toLocaleDateString('en-US', {weekday: 'long'}), open: false})
    const [completedOpen, setCompletedOpen] = useRecoilState(completedOpenAtom)

    const isMobile = window.innerWidth <= 640
    const mobileHeight = window.innerHeight - 80 - 60
   
    return (
        <div style={isMobile?{display: 'none'}:null}>
            {allRoutes['habit']?<Redirect to={`/dashboard/${company.schedule}/habits/${allRoutes['habit']}`} />:null}
            <div className={styles.slotSection} style={{height: !isMobile?'calc(100vh - 160px)':mobileHeight}}>
                {habits.length===0 ? <div className={styles.helperTextAddEntry}><p>Add your first entry!</p><AddButton name="habit" type="round" onclick={openHabitModal} /></div> : 
                <div>
                    <div className={styles.category}>
                    <OutsideClickHandler onOutsideClick={()=>setDropDownDay({...dropDownDay, open: false})}>
                        <div className={styles.dropDown} id="dayDropDownMenu">
                            <h3 className={styles.remaining} onClick={()=>setDropDownDay({...dropDownDay, open: !dropDownDay.open})}><p><Inbox /><span>{dropDownDay.day}</span></p>{dropDownDay.open?<ChevronUp />:<ChevronDown />}</h3>
                            {dropDownDay.open?
                            <ul>
                                <li onClick={()=>setDropDownDay({day: 'All', open: false})}>All</li>
                                <li onClick={()=>setDropDownDay({day: 'Monday', open: false})}>Monday</li>
                                <li onClick={()=>setDropDownDay({day: 'Tuesday', open: false})}>Tuesday</li>
                                <li onClick={()=>setDropDownDay({day: 'Wednesday', open: false})}>Wednesday</li>
                                <li onClick={()=>setDropDownDay({day: 'Thursday', open: false})}>Thursday</li>
                                <li onClick={()=>setDropDownDay({day: 'Friday', open: false})}>Friday</li>
                                <li onClick={()=>setDropDownDay({day: 'Saturday', open: false})}>Saturday</li>
                                <li onClick={()=>setDropDownDay({day: 'Sunday', open: false})}>Sunday</li>
                            </ul>
                            :null}
                        </div>
                    </OutsideClickHandler>
                    {habits.length!==0 ? habits.map((item)=>{
                        if(parseInt(item.times) !== parseInt(item.timesCompleted)){
                            for(let key in item.repeat){
                                if(item.repeat[key] !== null){
                                    if(dropDownDay.day.substring(0, 3).toLowerCase() === key){
                                        return (
                                            <NavLink onMouseEnter={(e)=>addToolTipForHabits(e)} onClick={()=>setRoute(item.id)} key={item.id} to={`/dashboard/${company.schedule}/habits/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot} data-title={item.name}>
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
                                    }
                                }
                            }
                        }
                        return null
                    }) : null}
                    </div>
                    <div className={styles.category}>
                        <h3 className={styles.completed} onClick={()=>setCompletedOpen(!completedOpen)}><p><CheckSquare /><span>Completed</span></p>{completedOpen?<ChevronUp />:<ChevronDown />}</h3>
                        {habits.length!==0&&completedOpen ? habits.map((item)=>{
                        if(parseInt(item.times) === parseInt(item.timesCompleted)){
                            return (
                                <NavLink onMouseEnter={(e)=>addToolTipForHabits(e)} onClick={()=>setRoute(item.id)} key={item.id} to={`/dashboard/${company.schedule}/habits/${item.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot} data-title={item.name}>
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
                        }
                        return null
                    }) : null}
                    </div>
                </div>
                }
            </div>
            <AddButton name="habit" type="main" onclick={openHabitModal} />
        </div>
    )
}

export default Habits