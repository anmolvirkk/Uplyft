import React, {useState} from 'react'
import styles from '../../_modal.module.sass'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'
import { X, Gift, Users, Plus, Minus } from 'react-feather'

import habitsAtom from '../../../../screens/Schedule/recoil-atoms/habitsAtom'
import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'

import { colors } from '../../../../variables/journalConfig'
import { habitCards } from '../../../../variables/habitCards'

const AddHabit = ({icons}) => {

    const [habits, setHabits] = useRecoilState(habitsAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [habit, setHabit] = useState({icon: '',
        color: '',
        name: {
            response: '',
            craving: {
                linkedReward: '',
                association: ''
            }
        },
        repeat: {
            unique: false,
            mon: [],
            tue: [],
            wed: [],
            thu: [],
            fri: [],
            sat: [],
            sun: []
        }, 
        type: 'todo',
        datesCompleted: [],
        streak: 0,
        totalCompleted: 0,
        successRate: 0
    })

    const [habitColor, setHabitColor] = useState(0)
    const [habitIcon, setHabitIcon] = useState(0)

    
    const iconsSvg = [<Activity />, <AlertTriangle />, <Anchor />, <Aperture />, <Archive />, <Award />, <BarChart />, <BatteryCharging />, <Bell />, <Book />, <Box />, <Briefcase />, <Camera />, <Clock />, <CloudLightning />, <Code />, <Coffee />, <Command />, <Compass />, <Crosshair />, <DollarSign />, <Droplet />, <Dribbble />, <Eye />, <Feather />, <Flag />, <GitHub />, <Gitlab />, <Globe />, <Grid />, <Hash />, <Headphones />, <Heart />, <Key />, <LifeBuoy />, <Map />, <Moon />, <Smile />, <Sun />, <Star />]

    const [currentTab, setCurrentTab] = useState(0)
    
    const selectIcon = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name.type.render.displayName){
                return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
            }
            return null
        })

    }

    const selectIconByName = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name){
                return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
            }
            return null
        })

    }

    const addHabit = () => {
        setHabits([...habits, habit])
    }

    const RecommendedHabits = () => {
        return (
            <div className={styles.habitCards}>
                <ul>
                    <li onClick={()=>setCurrentTab(1)}><p>Custom</p><span style={{height: '100%', width: '100%'}}><Plus /><Minus /></span></li>
                    {habitCards.map((item, index)=>(
                        <li key={index} onClick={()=>setCurrentTab(1)} style={{backgroundColor: item.color}}>
                            <p>{item.name.response}</p>
                            {selectIconByName(item.icon)}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    const HabitForm = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
            <ul>
                <li>
                    <p>Habit Name</p>
                    <input style={{marginBottom: 0, marginTop: '1vh'}} autoFocus type="text" placeholder='Enter the habit your want to develop or get rid of' value={habit.name.response} onChange={e => setHabit({...habit, name: {response: e.target.value}})} />
                </li>
                <li>
                    <p>Habit Type</p>
                    <div className={styles.tabselect}>
                        <div onClick={()=>setHabit({...habit, type: 'todo'})} className={habit.type==='todo'?styles.activeTab:null}>To Do</div>
                        <div onClick={()=>setHabit({...habit, type: 'counter'})} className={habit.type==='counter'?styles.activeTab:null}>Counter</div>
                        <div onClick={()=>setHabit({...habit, type: 'timer'})} className={habit.type==='timer'?styles.activeTab:null}>Timer</div>
                        <div onClick={()=>setHabit({...habit, type: 'nottodo'})} className={habit.type==='nottodo'?styles.activeTab:null}>No To Do</div>
                    </div>
                </li>
                <li>
                    <p style={{marginTop: '1.5vh'}}>Make the habit attractive (optional)</p>
                    <div className={styles.habitAttractive}>
                        <Gift />
                        <input style={{marginLeft: '1.5vh'}} autoFocus type="text" placeholder='Enter a linked reward, for example listening to your favorite songs while working out' value={habit.name.craving.linkedReward} onChange={e => setHabit({...habit, name: {craving: {linkedReward: e.target.value}}})} />
                    </div>
                    <div className={styles.habitAttractive}>
                        <Users />
                        <input style={{marginLeft: '1.5vh'}} autoFocus type="text" placeholder='Enter which people or groups you would like to do the habit with' value={habit.name.craving.association} onChange={e => setHabit({...habit, name: {craving: {association: e.target.value}}})} />
                    </div>
                </li>
                <li>
                    <p>Frequency</p>
                    
                    <div className={styles.tabselect} style={{marginBottom: '1.5vh'}}>
                        <div onClick={()=>setHabit({...habit, repeat: {unique: false}})} className={!habit.repeat.unique?styles.activeTab:null}>Same time for all days</div>
                        <div onClick={()=>setHabit({...habit, repeat: {unique: true}})} className={habit.repeat.unique?styles.activeTab:null}>Unique time for seperate days</div>
                    </div>

                    <div className={styles.daySelect}>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, mon: habit.repeat.mon===null?[]:null}})} className={habit.repeat.mon!==null?styles.activeDay:null}>Mon</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, tue: habit.repeat.tue===null?[]:null}})} className={habit.repeat.tue!==null?styles.activeDay:null}>Tue</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, wed: habit.repeat.wed===null?[]:null}})} className={habit.repeat.wed!==null?styles.activeDay:null}>Wed</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, thu: habit.repeat.thu===null?[]:null}})} className={habit.repeat.thu!==null?styles.activeDay:null}>Thu</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, fri: habit.repeat.fri===null?[]:null}})} className={habit.repeat.fri!==null?styles.activeDay:null}>Fri</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, sat: habit.repeat.sat===null?[]:null}})} className={habit.repeat.sat!==null?styles.activeDay:null}>Sat</div>
                            <div onClick={()=>setHabit({...habit, repeat: {...habit.repeat, sun: habit.repeat.sun===null?[]:null}})} className={habit.repeat.sun!==null?styles.activeDay:null}>Sun</div>
                    </div>

                    <div className={styles.days} style={{display: !habit.repeat.unique?'block':'none', padding: '1.5vh'}}>
                        <div className={styles.times}>
                            <div className={styles.time}> 
                                <div>
                                    <p>From</p>
                                    <div className={styles.timeSelect}>
                                        <p>10</p>:
                                        <p>30</p>
                                        <p>am</p>
                                    </div>
                                </div>
                                <div>
                                    <p>To</p>
                                    <div className={styles.timeSelect}>
                                        <p>1</p>:
                                        <p>30</p>
                                        <p>am</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.timeBtns} style={{paddingBottom: '1.5vh', marginBottom: '1.5vh'}}>
                                <Plus /><Minus />
                            </div>
                        </div>
                    </div>
                    <div className={styles.days} style={{display: habit.repeat.unique?'block':'none'}}>
                        <div className={styles.day}>
                            <p>Monday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                        <div className={styles.day}>
                            <p>Tuesday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                        <div className={styles.day}>
                            <p>Wednesday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                        <div className={styles.day}>
                            <p>Thursday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                        <div className={styles.day}>
                            <p>Friday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                        <div className={styles.day}>
                            <p>Saturday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                        <div className={styles.day}>
                            <p>Sunday</p>
                            <div className={styles.times}>
                                <div className={styles.time}> 
                                    <div>
                                        <p>From</p>
                                        <p>10:00am</p>
                                    </div>
                                    <div>
                                        <p>To</p>
                                        <p>11:00am</p>
                                    </div>
                                </div>
                                <div className={styles.timeBtns}>
                                    <Plus /><Minus />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
                <div className={`${styles.footer} ${styles.habitFooter}`}>
                    <button onClick={()=>setCurrentTab(0)} className={styles.cancelBtn}>Back</button>
                    <button className={styles.continueBtn} onClick={()=>setCurrentTab(2)}>Continue</button>
                </div>
            </div>
        )
    }

    const HabitCustomize = () => {
        return (
            <div className={`${styles.editJournal} ${styles.addHabit}`}>
            <ul>
                <li>
                    <p>Color</p>
                    <ol className={styles.colors}>
                        {colors.map((color, i)=><li className="colorButtons" onClick={()=>setHabitColor(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div className={i===habitColor ? styles.activeButton : null} /></li>)}
                    </ol>
                </li> 
                <li>
                    <p>Icon</p>
                    <ol>
                        {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setHabitIcon(i)} key={i} id={`icon${i}`}><div className={i===habitIcon ? styles.activeButton : null} />{selectIcon(icon)}</li>)}
                    </ol>
                </li>   
                <li style={{marginTop: '2.5vh', marginBottom: 0}}>
                    <p>Why do you want to build this habit? (optional)</p>
                    <input  style={{marginBottom: 0}} autoFocus type="text" placeholder='Entry Name' value={habit.reason} onChange={e => setHabit({...habit, reason: e.target.value})} />
                </li>
                <li style={{marginTop: '2.5vh'}}>
                    <p>Contingency (optional)</p>
                    <input style={{marginBottom: 0}} autoFocus type="text" placeholder='Entry Name' value={habit.reason} onChange={e => setHabit({...habit, reason: e.target.value})} />
                </li>  
            </ul>
                <div className={`${styles.footer} ${styles.habitFooter}`}>
                    <button onClick={()=>setCurrentTab(1)} className={styles.cancelBtn}>Back</button>
                    <button className={styles.continueBtn} onClick={addHabit}>Continue</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>Add Habit</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <ul className={styles.habitProgress}>
                    <hr />
                    <li className={currentTab===0?styles.activeMarker:currentTab>=1?styles.completedMarker:null}><div className={styles.marker} />Habit Selection</li>
                    <li className={currentTab===1?styles.activeMarker:currentTab>=2?styles.completedMarker:null}><div className={styles.marker} />Habit Setup</li>
                    <li className={currentTab===2?styles.activeMarker:null}><div className={styles.marker} />Habit Customization</li>
                </ul>
                {currentTab===0?<RecommendedHabits />:
                currentTab===1? <HabitForm /> :
                currentTab===2?<HabitCustomize /> : null}
            </div>
    )
}

export default AddHabit
