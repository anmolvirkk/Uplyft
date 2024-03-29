import React, {useState, useEffect} from 'react'
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { X, Plus, Minus, ArrowLeft, ArrowRight } from 'react-feather'

import modalConfigAtom from '../../../../recoil-atoms/modalConfigAtom'

import { colors, iconsSvg } from '../../../../variables/journalConfig'
import { habitCards } from '../../../../variables/habitCards'

import InputBox from '../../../../../Auth/components/InputBox'

import { allRoutesAtom, allCalendarEventsAtom, habitsAtom } from '../../../../allAtoms'

const addToolTipForHabitCards = (e) => {
    if(e.target.classList.contains(styles.habitCard)){
        if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
             e.target.classList.add(styles.overflownModal)
        }else if(e.target.classList.contains(styles.overflownModal)) {
            e.target.classList.remove(styles.overflownModal)
        }
    }
}

const AddHabit = ({ type, currentHabit}) => {

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
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

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
                id: habit.id,
                type: 'habit'
            }])
            setAllRoutes({...allRoutes, habit: habit.id})
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

    const setRecommendedHabit = (color, icon, name) => {
        let colorIndex
        const setIndex = async () => {
            colors.forEach((val, i)=>{
                if(val.toUpperCase() === color.toUpperCase()){
                    colorIndex = i
                }
            })
        }
        setIndex().then(()=>{
            setHabit({...habit, color: colorIndex, icon: icon, name: name, times: 1})
        })
    }

    let habitScrollTimeout

    const habitCardScroll = (dir) => {
        clearTimeout(habitScrollTimeout)
        document.getElementById('habitCards').style.scrollBehavior = 'smooth'
        if(dir === 'right'){
            document.getElementById('habitCards').scrollLeft += 210
        }else{
            document.getElementById('habitCards').scrollLeft -= 210
        }
        setTimeout(()=>{
            document.getElementById('habitCards').style.scrollBehavior = 'auto'
        }, 500)
    }

    const [habitCardScrollLeft, setHabitCardScrollLeft] = useState(0)
      
    useEffect(()=>{
        document.getElementById('habitCards').scrollLeft = habitCardScrollLeft
    })

    let saveTimeout

    const saveHabitCardScroll = () => {
        clearTimeout(saveTimeout)
        saveTimeout = setTimeout(()=>{
            let goal = document.getElementById('habitCards').scrollLeft
            let counts = []
            const setCounts = async () => {
                Object.entries(document.getElementById('habitCards').childNodes).forEach((item)=>{
                    counts.push(item[1].offsetLeft)
                })
            }
            setCounts().then(()=>{
                const closest = counts.reduce(function(prev, curr) {
                    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev)
                })
                setHabitCardScrollLeft(closest)
            })
        }, 500)
    }

    const RecommendedHabits = () => {
        return (
            <div className={styles.habitCards}>
                <ul id="habitCards" onWheel={saveHabitCardScroll}>
                    {habitCards.map((item, index)=>(
                        <li onMouseEnter={(e)=>addToolTipForHabitCards(e)} onClick={()=>setRecommendedHabit(item.color, iconsSvg.indexOf(iconsSvg.filter((icon)=>icon.type.displayName === item.icon)[0]), item.name)} data-title={item.name} className={styles.habitCard} key={index} style={{backgroundImage: `linear-gradient(to right, ${item.color}, ${item.color}B3)`}}>
                            <span>{iconsSvg.filter((icon)=>icon.type.displayName === item.icon)[0]}</span>
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
                    <div className={styles.habitCardArrows}>
                        <div onClick={()=>habitCardScroll('left')}>
                            <ArrowLeft />
                        </div>
                        <div onClick={()=>habitCardScroll('right')}>
                            <ArrowRight />
                        </div>
                    </div>
            </div>
        )
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
                        {iconsSvg.map((icon, i)=><li className="iconButtons" onClick={()=>setHabit({...habit, icon: i})} key={i} id={`icon${i}`}>{icon}<div className={i===habit.icon ? styles.activeButton : null} /></li>)}
                    </ol>
                </li>
            </ul>
            </div>
        )
    }

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
            let habitRepeat = {}
            for(let key in habit.repeat){
                if(key!=='unique'){
                    if(habit.repeat[key] !== null){
                        let newData = habit.repeat[key].filter((val, i)=>i!==index)
                        habitRepeat = {...habitRepeat, [key]: [...newData]}
                    }
                }else{
                    habitRepeat = {...habitRepeat, [key]: habit.repeat[key]}
                }
            }
            setHabit({...habit, repeat: {...habit.repeat, ...habitRepeat}})
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

    const timesBlur = (e) => {
        if(e.target.value > 0 && e.target.value % 1 === 0){
            setHabit({...habit, times: e.target.value})
        }else{
            e.target.value = 1
            setHabit({...habit, times: 1})
        }
    }

    const HabitForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
                <form>
                    <div className={styles.habitNum}>
                        <InputBox type='text' value={habit.name} name='Enter Habit' onBlur={(e)=>setHabit({...habit, name: e.target.value})} />
                        <div className={styles.habitTimes}>
                            <input type="number" defaultValue={habit.times} onBlur={(e)=>timesBlur(e)} />
                            <span>times</span>
                        </div>
                    </div>
                </form>
                <HabitCustomize />
            <ul>
                <li>
                    <div className={styles.tabselect}>
                        <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, unique: false}})} className={!habit.repeat.unique?styles.activeTab:null}>Uniform Times</div>
                        <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, unique: true}})} className={habit.repeat.unique?styles.activeTab:null}>Unique Times</div>
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
                    {habit.repeat.unique?
                        <div className={styles.days}>
                            {
                                habit.repeat.mon!==null?
                                <div className={styles.day}>
                                <p>Monday</p>
                                {habit.repeat.mon.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'mon')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'tue')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'wed')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'thu')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'fri')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'sat')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForUnique(e.target.value, index, 'from', 'sun')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
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
                    :   
                        <div className={styles.days}>
                            <div>
                                {habit.repeat.all.map((item, index)=>(
                                    <div className={styles.times} key={index}>
                                        <div className={styles.time}> 
                                            <div className={styles.timeTitle}>
                                                <p>From</p>
                                                <input defaultValue={item.from} onBlur={(e)=>setTimeForAll(e.target.value, index, 'from')} type="time" />
                                            </div>
                                            <div className={styles.timeTitle}>
                                                <p>To</p>
                                                <input defaultValue={item.to} onBlur={(e)=>setTimeForAll(e.target.value, index, 'to')} type="time" />
                                            </div>
                                        </div>
                                        <Minus className={styles.removeTime} onClick={()=>removeTimeFromAll(index)} />
                                    </div>
                                ))}
                                <Plus className={styles.addTime} onClick={addAllTime} />
                            </div>
                        </div>
                    }
                </li>
            </ul>
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
                    <p>{type} Habit</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                    <RecommendedHabits />
                    <HabitForm />
            </div>
    )
}

export default AddHabit
