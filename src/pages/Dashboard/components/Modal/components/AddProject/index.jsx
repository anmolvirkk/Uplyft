import React, {useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Flag } from 'react-feather'

import habitsAtom from '../../../../screens/Schedule/recoil-atoms/habitsAtom'
import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors, iconsSvg } from '../../../../variables/journalConfig'

import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'

const AddProject = ({icons, type, currentHabit}) => {

    const date = new Date()

    const [habit, setHabit] = useState(currentHabit?{
        id: currentHabit.id,
        color: currentHabit.color,
        icon: currentHabit.icon,
        name: currentHabit.name,
        repeat: currentHabit.repeat,
        times: currentHabit.times,
        timesCompleted: currentHabit.timesCompleted,
        datesCompleted: currentHabit.datesCompleted
    }:{
        id: date.valueOf(),
        color: 0,
        icon: 0,
        name: '',
        repeat: {
            unique: false,
            all: [
                {
                    from: "00:00",
                    to: "12:00"
                }
            ],
            mon: [{from: "00:00", to: "12:00"}],
            tue: [{from: "00:00", to: "12:00"}],
            wed: [{from: "00:00", to: "12:00"}],
            thu: [{from: "00:00", to: "12:00"}],
            fri: [{from: "00:00", to: "12:00"}],
            sat: [{from: "00:00", to: "12:00"}],
            sun: [{from: "00:00", to: "12:00"}]
        },
        times: 1,
        timesCompleted: 0,
        datesCompleted: []
    })

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)

    const submitHabit = () => {
        let times = {
            from: {
                h: parseInt(habit.repeat.all[0].from.split(':')[0]),
                m: parseInt(habit.repeat.all[0].from.split(':')[1])
            },
            to: {
                h: parseInt(habit.repeat.all[0].to.split(':')[0]),
                m: parseInt(habit.repeat.all[0].to.split(':')[1])
            }
        }
        let fromDate = new Date()
        fromDate.setHours(times.from.h)
        fromDate.setMinutes(times.from.m)
        let toDate = new Date()
        toDate.setHours(times.to.h)
        toDate.setMinutes(times.to.m)
        if(times.to.h < times.from.h){
            toDate.setDate(toDate.getDate()+1)
        }
        if(type === 'add'){
            setHabits([...habits, habit])
            setAllCalendarEvents([...allCalendarEvents, {
                title: habit.name,
                start: fromDate,
                end: toDate,
                color: colors[habit.color],
                id: habit.id
            }])
        }else if(type==='edit'){
            let newHabits = habits.map((data)=>{
                let newData = {...data}
                    if(data.id === currentHabit.id) {
                        newData.id = habit.id
                        newData.color = habit.color
                        newData.icon = habit.icon
                        newData.name = habit.name
                        newData.repeat = habit.repeat
                        newData.times = habit.times
                    }
                return newData
            })
            setHabits([...newHabits])

            let newAllCalendarEvents = allCalendarEvents.map((data)=>{
                let newData = {...data}
                    if(data.id === currentHabit.id) {
                        newData.title = habit.name
                        newData.start = fromDate
                        newData.end = toDate
                        newData.color = colors[habit.color]
                    }
                return newData
            })
            setAllCalendarEvents([...newAllCalendarEvents])
        }
        setModalConfig({type: ''})
    }

    const [habits, setHabits] = useRecoilState(habitsAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    
    const selectIcon = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name.type.render.displayName){
                return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
            }
            return null
        })

    }

    const HabitCustomize = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit} ${styles.habitCustomize}`}>
            <ul>
                <li>
                    <p>Color</p>
                    <ol className={styles.colors}>
                        {colors.map((color, i)=><li className="colorButtons" onClick={()=>setHabit({...habit, color: i})} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===habit.color ? styles.activeButton : null} /></li>)}
                    </ol>
                </li> 
                <li>
                    <p>Icon</p>
                    <ol>
                        {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setHabit({...habit, icon: i})} key={i} id={`icon${i}`}>{selectIcon(icon)}<div className={i===habit.icon ? styles.activeButton : null} /></li>)}
                    </ol>
                </li>
            </ul>
            </div>
        )
    }

    const HabitForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.habitNum}>
                        <input defaultValue={habit.name}  onBlur={(e)=>setHabit({...habit, name: e.target.value})} placeholder='Enter Project Name' />
                    </div>
                    <div className={`${styles.inputWithIcon}`} style={{marginTop: '2vh'}}>
                        <Flag />
                        <DayPickerInput placeholder='Add Deadline' />        
                    </div>
                </form>
                <HabitCustomize />
                <div className={`${styles.footer} ${styles.habitFooter}`}>
                    <button className={styles.cancelBtn} onClick={()=>setModalConfig({type: ''})}>Back</button>
                    <button className={styles.continueBtn} onClick={submitHabit}>Continue</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>{type} Project</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                    <HabitForm />
            </div>
    )
}

export default AddProject
