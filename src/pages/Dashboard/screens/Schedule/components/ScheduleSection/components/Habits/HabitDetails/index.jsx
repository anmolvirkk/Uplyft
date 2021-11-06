import React from 'react'
import styles from './_habitDetails.module.sass'

import {useRecoilState} from 'recoil' 
import habitsAtom from '../../../../../recoil-atoms/habitsAtom'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'

import selectIcon from '../../../../../../../functions/selectIcon'
import { colors } from '../../../../../../../variables/journalConfig'

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
                        {selectIcon(level.icon)}
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

    return (
        <div className={styles.habitDetails}>
            {allRoutes.habit?
            habits.map((item, index)=>{
                if(item.id === allRoutes['habit']){
                    return (
                        <div key={index}>
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
                                        <p>{item.datesCompleted.length} days</p>
                                    </li>
                                </ul>
                            </div>

                            <Level item={item} />

                            <div className={styles.successRate}>
                                <div className={styles.cardTitle}>
                                    <p>Success Rate</p>
                                </div>
                                <div className={styles.circlewrap}>
                                    <div className={styles.circle}>
                                    <div className={`${styles.mask} ${styles.full}`}>
                                        <div className={styles.fill} style={{backgroundColor: colors[item.color]}}></div>
                                    </div>
                                    <div className={`${styles.mask} ${styles.half}`}>
                                        <div className={styles.fill} style={{backgroundColor: colors[item.color]}}></div>
                                    </div>
                                    <div className={styles.insidecircle} style={{colors: colors[item.color]}}> 75% </div>
                                    </div>
                                </div>
                                <div className={styles.cardTitle}>
                                    <p></p>
                                    <p>( resets every level )</p>
                                    <p></p>
                                </div>
                            </div>

                            <Calendar item={item} />
                            
                            <div className={`${styles.streaks}`}>
                                <ul>
                                    <li>
                                        <p>Best Streak</p>
                                        <h3>0 <span>days</span></h3>
                                    </li>
                                    <li>
                                        <p>Current Streak</p>
                                        <h3>0 <span>days</span></h3>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardTitle}>
                                    <p>Completion Rate</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null
            })
            :null}
        </div>
    )
}

export default HabitDetails
