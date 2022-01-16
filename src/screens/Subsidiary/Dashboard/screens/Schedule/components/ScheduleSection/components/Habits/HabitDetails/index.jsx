import React from 'react'
import styles from './_habitDetails.module.sass'

import {useRecoilState} from 'recoil' 
import habitsAtom from '../../../../../recoil-atoms/habitsAtom'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'

import selectIcon from '../../../../../../../functions/selectIcon'
import { colors, iconsSvg } from '../../../../../../../variables/journalConfig'

import Calendar from './components/Calendar'

const HabitDetails = () => {

    const [habits] = useRecoilState(habitsAtom)
    const [allRoutes] = useRecoilState(allRoutesAtom)

    const levels = [
        {name: 'Novice', value: 0, icon: 'Smile'},
        {name: 'Competent', value: 21, icon: 'Key'},
        {name: 'Experienced', value: 90, icon: 'Award'},
        {name: 'Master', value: 365, icon: 'Briefcase'},
        {name: 'Expert', value: 1000, icon: 'Globe'}
    ]

    const Progressbar = ({color, percent}) => {
        return (
            <div className={styles.progressbar}>
                <hr style={{backgroundColor: colors[color], width: `${percent}%`}} />
            </div>
        )
    }

    const Level = ({item}) => {   

        let level = {
            name: levels[0].name,
            index: 0,
            icon: levels[0].icon,
            goal: levels[1].value
        }

        levels.forEach((val, i)=>{
            if(item.datesCompleted.length >= val.value){
                level = {
                    name: val.name,
                    index: i,
                    icon: val.icon,
                    goal: levels[i+1<=levels.length?i+1:i].value
                }
            }
        })

        return (
            <div className={`${styles.card} ${styles.level}`}>
                <ul>
                    <li>Current Level</li>
                    <li>Next Level</li>
                </ul>
                <ul>
                    <li>
                        {level.name}
                    </li>
                    <li>
                        {levels[level.index+1<=levels.length?level.index+1:level.index].name}
                    </li>
                </ul>
                <ul className={styles.progressList}>
                    <li style={{stroke: colors[item.color]}}>
                        {iconsSvg.filter((icon)=>icon.type.displayName === level.icon)[0]}
                    </li>
                    <Progressbar color={item.color} percent={item.datesCompleted.length/level.goal*100} />
                    <li style={{stroke: colors[item.color]}}>
                        {selectIcon(levels[level.index+1<=levels.length?level.index+1:level.index].icon)}
                    </li>
                </ul>
                <ul className={styles.nextLevelIn}>
                    <li>Next Level In</li>
                    <li>{level.goal - item.datesCompleted.length} days</li>
                </ul>
            </div>
        )

    }

    const getHabitDetails = (habit) => {
        let details = {
            streak: {
                best: 0,
                current: 0
            },
            skipped: 0,
            successRate: 0
        }
        for(let i=0; i<habit.datesCompleted.length; i++){
            if(habit.datesCompleted[i+1]){
                let currentDatePlusOne = new Date(new Date(habit.datesCompleted[i].string).setDate(new Date(habit.datesCompleted[i].string).getDate()+1))
                let nextDate = new Date(habit.datesCompleted[i+1].string)
                if(currentDatePlusOne.toDateString() === nextDate.toDateString()){
                    if(details.streak.current === 0){
                        details.streak.current = 1
                    }
                    details.streak.current++
                    if(details.streak.current > details.streak.best){
                        details.streak.best = details.streak.current
                    }
                }else{
                    details.streak.current = 0
                    details.skipped++
                }
            }
        }
        const getDatesInRange = (min, max) => Array((max-min)/86400000).fill(0).map((_, i) => new Date((new Date()).setDate(min.getDate() + i)))
        if(habit.datesCompleted[0]){
            let idealDays = getDatesInRange(new Date(habit.datesCompleted[0].string), new Date(habit.datesCompleted[habit.datesCompleted.length - 1].string))
            if(idealDays.length > 0){
                details.successRate = Math.ceil(((habit.datesCompleted.length)/(idealDays.length+1))*100)
            }else{
                details.successRate = Math.ceil(habit.datesCompleted.length)*100
            }
        }
        return details
    }

    const SuccessRate = ({item}) => {
        let rate = getHabitDetails(item).successRate
        let dialStyle = {'--dialpercent': `${rate*1.8}deg`}
        return (
            <div className={styles.successRate}>
                <div className={styles.cardTitle}>
                    <p>Success Rate</p>
                </div>
                <div className={styles.circlewrap} style={dialStyle}>
                    <div className={styles.circle}>
                    <div className={`${styles.mask} ${styles.full}`}>
                        <div className={styles.fill} style={{backgroundColor: colors[item.color]}}></div>
                    </div>
                    <div className={`${styles.mask} ${styles.half}`}>
                        <div className={styles.fill} style={{backgroundColor: colors[item.color]}}></div>
                    </div>
                    <div className={styles.insidecircle} style={{colors: colors[item.color]}}> {rate}% </div>
                    </div>
                </div>
                <div className={styles.cardTitle}>
                    <p></p>
                    <p>( resets every level )</p>
                    <p></p>
                </div>
            </div>
        )
    }
    return habits.map((item, index)=>{
        if(allRoutes.habit && item.id === allRoutes['habit']){
            return (
                <div key={index} className={styles.habitDetailSection}>

                    <Calendar color={colors[item.color]} index={index} />

                    <div className={`${styles.streaks}`}>
                        <ul>
                            <li>
                                <p>Best Streak</p>
                                <h3>{getHabitDetails(item).streak.best}<span>days</span></h3>
                            </li>
                            <li>
                                <p>Current Streak</p>
                                <h3>{getHabitDetails(item).streak.current}<span>days</span></h3>
                            </li>
                        </ul>
                    </div>
                    
                    <SuccessRate item={item} />

                    <Level item={item} />

                    <div className={`${styles.card} ${styles.gradientCard}`} style={{backgroundImage: `linear-gradient(to right, ${colors[item.color]}, ${colors[item.color]}B3)`}}>
                        <ul>
                            <li>
                                <p>Days Completed</p>
                            </li>
                            <li>
                                <p>{item.datesCompleted.length} days</p>
                            </li>
                        </ul>
                    </div>
                    
                    <div className={`${styles.card} ${styles.daysSkipped}`}>
                        <ul>
                            <li>
                                <p>Days Skipped</p>
                            </li>
                            <li>
                                {<p>{getHabitDetails(item).skipped} days</p>}
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }else{
            return null
        }
    })
}

export default HabitDetails
