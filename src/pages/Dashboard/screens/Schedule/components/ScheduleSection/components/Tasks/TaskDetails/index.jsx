import React, { useState } from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import AddButton from '../../../../AddButton'
import { ChevronUp } from 'react-feather'
import styles from './_taskdetails.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../../Journals/recoil-atoms/modalConfigAtom'
import projectsAtom from '../../../../../recoil-atoms/projectsAtom'
import { colors, iconsSvg } from '../../../../../../../variables/journalConfig'
import MoreMenu from '../../../../../../../components/MoreMenu'
import CheckBtn from '../../Habits/HabitDetails/components/CheckBtn'
import allRoutesAtom from '../../../../../../Journals/recoil-atoms/allRoutesAtom'

const TaskDetails = () => {
    
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [projects] = useRecoilState(projectsAtom)
    const [allRoutes] = useRecoilState(allRoutesAtom)

    const Filters = () => {
        const [filterOpen, setFilterOpen] = useState(false)
        return (
            <div className={styles.filters}>
                <div onClick={()=>setFilterOpen(!filterOpen)} className={styles.filterTitle}><span>Filters</span><ChevronUp /></div>
                {filterOpen?
                <OutsideClickHandler onOutsideClick={()=>setFilterOpen(false)}>
                <div className={styles.filterTab}>
                    <div className={styles.activeFilters}>

                    </div>
                    <div className={styles.allFilters}>
                        <div className={styles.roles}>

                        </div>
                        <div className={styles.tags}>
                            
                        </div>
                        <div className={styles.elements}>

                        </div>
                    </div>
                </div>
                </OutsideClickHandler>
                : null}
            </div>
        )
    }

    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 80px - 40px)'}}>
                {
                    projects.map((item)=>{
                        if(item.id === allRoutes['project']){
                            return item.tasks.map((task)=>{
                                return (
                                    <div key={task.id} className={styles.sideSectionSlot} data-title={task.name}>
                                        <div className={styles.slotContent}>
                                        <div style={{backgroundColor: colors[task.color]}}>
                                                {iconsSvg[task.icon]}
                                            </div>
                                            <p>{task.name}</p>
                                        </div>
                                        <MoreMenu items={[{name: "edit", function: ()=>console.log(task)}, {name: "delete", function: ()=>console.log(task)}]} id={`scheduleSlotsMoreMenu${task.id}`} pos={{right: '-5vh', top: '3.5vh'}} />
                                        <CheckBtn times={1} id={task.id} timesCompleted={0} datesCompleted={[]} />
                                    </div>
                                )
                            })
                        }
                        return null
                    })
                }
            </div>
            <Filters />
            <AddButton name="task" onclick={()=>setModalConfig({type: 'addTask'})} />
        </div>
    )
}

export default TaskDetails
