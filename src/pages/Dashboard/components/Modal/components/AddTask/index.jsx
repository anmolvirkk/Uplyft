import React, {useState, useEffect} from 'react'
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Plus, Minus, AlignLeft, CornerDownRight, Folder, AlertTriangle, BatteryCharging, Clock, PieChart, Shield, Hash, Flag } from 'react-feather'

import habitsAtom from '../../../../screens/Schedule/recoil-atoms/habitsAtom'
import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors } from '../../../../variables/journalConfig'

import allCalendarEventsAtom from '../../../../screens/Schedule/recoil-atoms/allCalendarEventsAtom'
import HorizontalTimeline from 'react-horizontal-timeline'
import './taskTimeline.sass'

const AddTask = ({type, currentHabit}) => {

    const date = new Date()

    const [habit, setHabit] = useState(currentHabit?{
        id: currentHabit.id,
        color: currentHabit.color,
        icon: currentHabit.icon,
        name: currentHabit.name,
        repeat: currentHabit.repeat
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
        details: '',
        deadline: '',
        priority: '',
        timeInvestment: '',
        energyInvestment: '',
        fun: '',
        motivation: '',
        difficulty: '',
        skillsRequired: [],
        roles: [],
        theme: [],
        importance: '',
        tags: [],
        purpose: []
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

    const setTimeForAll = (val, index, type) => {
        let newRepeat = {}
        for(let key in habit.repeat){
            if(habit.repeat[key] !== null && key!=='unique'){
                let newTimes = habit.repeat[key].map((data, i)=>{
                    let newData = {...data}
                        if(i === index) {
                            if(type === 'from'){
                                newData.from = val
                                newData.to = habit.repeat.all[index].to
                            }else{
                                newData.from = habit.repeat.all[index].from
                                newData.to = val
                            }
                        }
                    return newData
                })
                newRepeat = {...newRepeat, [key]: [...newTimes]}
            }
        }
        setHabit({...habit, repeat: {...habit.repeat, ...newRepeat}})
    }

    const addAllTime = () => {
        let habitRepeat = {}
        for(let key in habit.repeat){
            if(key!=='unique'){
                if(habit.repeat[key] !== null){
                    let newData = [...habit.repeat[key], {from: "00:00", to: "12:00"}]
                    habitRepeat = {...habitRepeat, [key]: [...newData]}
                }
            }else{
                habitRepeat = {...habitRepeat, [key]: habit.repeat[key]}
            }
        }
        setHabit({...habit, repeat: {...habit.repeat, ...habitRepeat}})
    }

    useEffect(()=>{
        document.getElementById('modalForm').scrollTo(0,document.getElementById('modalForm').scrollHeight)
    }, [habit.repeat.all])

    const removeTimeFromAll = (index) => {
        if(habit.repeat.all.length!==1){
            let newTimes = habit.repeat.all.filter((val, i)=>i!==index)
            setHabit({...habit, repeat: {...habit.repeat, all: [...newTimes]}})
        }
    }

    const addUniqueTime = (day) => {
        for(let key in habit.repeat){
            if(key === day){
                setHabit({...habit, repeat: {...habit.repeat, [day]: [...habit.repeat[day], {from: "00:00", to: "12:00"}]}})
            }
        }
    }

    const setTimeForUnique = (val, index, type, day) => {
        for(let key in habit.repeat){
            if(key === day){
                let newTimes = habit.repeat[day].map((data, i)=>{
                    let newData = {...data}
                        if(i === index) {
                            if(type === 'from'){
                                newData.from = val
                                newData.to = habit.repeat[day][index].to
                            }else{
                                newData.from = habit.repeat[day][index].from
                                newData.to = val
                            }
                        }
                    return newData
                })
                setHabit({...habit, repeat: {...habit.repeat, [day]: [...newTimes]}})
            }
        }
    }
    
    const removeTimeFromUnique = (index, day) => {
        for(let key in habit.repeat){
            if(key === day){
                if(habit.repeat[day].length!==1){
                    let newTimes = habit.repeat[day].filter((val, i)=>i!==index)
                    setHabit({...habit, repeat: {...habit.repeat, [day]: [...newTimes]}})
                }
            }
        }
    }

    const Roles = () => {
        return (
            <div className={styles.roles}>
                <ul>
                    <li className={styles.overflownModal} data-title="Developer">
                        <img src = "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80" alt="developer" />
                    </li>
                    <li className={styles.overflownModal} data-title="Designer">
                        <img src = "https://images.unsplash.com/photo-1574100004472-e536d3b6bacc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80" alt="developer" />
                    </li>
                    <li className={styles.overflownModal} data-title="Add Your Role">
                        <Plus />
                    </li>
                </ul>
            </div>
        )
    }

    const Priority = () => {
        return (
            <div>

            </div>
        )
    }

    const Deadline = () => {
        let date = new Date()
        const deadlines = [
            date
        ]
        return (
            <div className="taskDeadline">
                <HorizontalTimeline index={0} values={deadlines} />
            </div>
        )
    }

    const SkillsRequired = () => {
        return (
            <div>
                
            </div>
        )
    }

    const Challenge = () => {
        return (
            <div>
                
            </div>
        )
    }

    const TimeRequired = () => {
        return (
            <div>
                
            </div>
        )
    }

    const EffortRequired = () => {
        return (
            <div>
                
            </div>
        )
    }

    const ParetoSelect = () => {
        return (
            <div>
                
            </div>
        )
    }

    const Details = () => {
        return (
            <div>
                
            </div>
        )
    }

    const Tags = () => {
        return (
            <div>

            </div>
        )
    }

    const TaskInfo = () => {
        return (
            <div className={styles.taskInfo}>
                <div className={styles.taskInfoBar}>
                    <div className={styles.overflownModal} data-title="Details">
                        <AlignLeft />
                    </div>
                    <div className={styles.overflownModal} data-title="Deadline">
                        <Flag />
                    </div>
                    <div className={styles.overflownModal} data-title="Tags">
                        <Hash />
                    </div>
                    <div className={styles.overflownModal} data-title="Priority">
                        <AlertTriangle />
                    </div>
                    <div className={styles.overflownModal} data-title="Challenge">
                        <Shield />
                    </div>
                    <div className={styles.overflownModal} data-title="Approximate Time Required To Complete">
                        <Clock />
                    </div>
                    <div className={styles.overflownModal} data-title="Effort Required">
                        <BatteryCharging />
                    </div>
                    <div className={styles.overflownModal} data-title="Is this task contributing towards 80% or 20%">
                        <PieChart />
                    </div>
                </div>
                <Details />
                <Tags />
                <Priority />
                <Challenge />
                <TimeRequired />
                <EffortRequired />
                <ParetoSelect />
            </div>
        )
    }

    const HabitForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.taskInput}>
                        <input defaultValue={habit.name}  onBlur={(e)=>setHabit({...habit, name: e.target.value})} placeholder='Enter Task' />
                        <TaskInfo />
                    </div>
                    <div className={styles.taskInput}>
                        <div className={styles.inputWithIcon}>
                            <CornerDownRight />
                            <input defaultValue={habit.name}  onBlur={(e)=>setHabit({...habit, name: e.target.value})} placeholder='Add Sub Task' />
                        </div>
                        <TaskInfo />
                    </div>
                </form>
                <Roles />
                <SkillsRequired />
                <ul>
                    <li>
                        <div className={styles.tabselect} style={{marginBottom: '2vh', marginTop: '1vh'}}>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, unique: false}})} className={!habit.repeat.unique?styles.activeTab:null}>Same time for all days</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, unique: true}})} className={habit.repeat.unique?styles.activeTab:null}>Unique time for seperate days</div>
                        </div>

                        <div className={styles.daySelect}>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, mon: habit.repeat.mon===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.mon!==null?styles.activeDay:null}>Mon</div>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, tue: habit.repeat.tue===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.tue!==null?styles.activeDay:null}>Tue</div>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, wed: habit.repeat.wed===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.wed!==null?styles.activeDay:null}>Wed</div>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, thu: habit.repeat.thu===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.thu!==null?styles.activeDay:null}>Thu</div>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, fri: habit.repeat.fri===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.fri!==null?styles.activeDay:null}>Fri</div>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, sat: habit.repeat.sat===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.sat!==null?styles.activeDay:null}>Sat</div>
                                <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, sun: habit.repeat.sun===null?[{from: "00:00", to: "12:00"}]:null}})} className={habit.repeat.sun!==null?styles.activeDay:null}>Sun</div>
                        </div>

                        <div className={styles.days} style={{display: !habit.repeat.unique?'block':'none'}}>
                            {!habit.repeat.unique?
                            <div>
                                {habit.repeat.all.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForAll(e.target.value, index, 'from')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForAll(e.target.value, index, 'to')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromAll(index)} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={addAllTime} />
                            </div>
                            :null}
                        </div>
                        <div className={styles.days} style={{display: habit.repeat.unique?'block':'none'}}>
                            {
                                habit.repeat.mon!==null?
                                <div className={styles.day}>
                                <p>Monday</p>
                                {habit.repeat.mon.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'mon')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'mon')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'mon')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('mon')} />
                                </div> : null
                            }
                            {
                                habit.repeat.tue!==null?
                                <div className={styles.day}>
                                <p>Tuesday</p>
                                {habit.repeat.tue.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'tue')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'tue')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'tue')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('tue')} />
                                </div> : null
                            }
                            {
                                habit.repeat.wed!==null?
                                <div className={styles.day}>
                                <p>Wednesday</p>
                                {habit.repeat.wed.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'wed')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'wed')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'wed')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('wed')} />
                                </div> : null
                            }
                            {
                                habit.repeat.thu!==null?
                                <div className={styles.day}>
                                <p>Thurday</p>
                                {habit.repeat.thu.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'thu')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'thu')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'thu')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('thu')} />
                                </div> : null
                            }
                            {
                                habit.repeat.fri!==null?
                                <div className={styles.day}>
                                <p>Friday</p>
                                {habit.repeat.fri.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'fri')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'fri')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'fri')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('fri')} />
                                </div> : null
                            }
                            {
                                habit.repeat.sat!==null?
                                <div className={styles.day}>
                                <p>Saturday</p>
                                {habit.repeat.sat.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'sat')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'sat')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'sat')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('sat')} />
                                </div> : null
                            }
                            {
                                habit.repeat.sun!==null?
                                <div className={styles.day}>
                                <p>Sunday</p>
                                {habit.repeat.sun.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'sun')} type="time" />
                                            </div>
                                            <div>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'to', 'sun')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromUnique(index, 'sun')} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={()=>addUniqueTime('sun')} />
                                </div> : null
                            }
                        </div>
                    </li>
                </ul>
                <div className={`${styles.footer} ${styles.habitFooter}`}>
                    <button className={styles.cancelBtn} onClick={()=>setModalConfig({type: ''})}>Back</button>
                    <button className={styles.continueBtn} onClick={submitHabit}>Continue</button>
                </div>
            </div>
        )
    }

    const addToolTipForProjects = (e) => {
        if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
             e.target.classList.add(styles.overflownModal)
        }else if(e.target.classList.contains(styles.overflownModal)) {
            e.target.classList.remove(styles.overflownModal)
        }
    }

    const Projects = () => {
        return (
            <div className={styles.projects}>
                <ul>
                    <li onMouseEnter={(e)=>addToolTipForProjects(e)} data-title="General">
                        <Folder />
                        <p>General</p>
                    </li>
                    <li onMouseEnter={(e)=>addToolTipForProjects(e)} data-title="Add Project">
                        <Plus />
                        <p>Add Project</p>
                    </li>
                </ul>
            </div>
        )
    }
    
    return (
        <div className={`${styles.form} ${styles.addTask}`} id='modalForm'>
                <div className={styles.header}>
                    <p>{type} Task</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <Projects />
                <Deadline />
                <HabitForm />
            </div>
    )
}

export default AddTask
