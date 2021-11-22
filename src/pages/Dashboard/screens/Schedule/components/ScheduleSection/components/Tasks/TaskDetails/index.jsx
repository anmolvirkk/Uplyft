import React, { useState } from 'react'
import journalStyles from '../../../../../../Journals/_journal.module.sass'
import AddButton from '../../../../AddButton'
import { ChevronUp } from 'react-feather'
import styles from './_taskdetails.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import { useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../../Journals/recoil-atoms/modalConfigAtom'


const TaskDetails = () => {
    
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const taskCategories = [
        {
            id: 0,
            title: 'Focus',
            type: [{name: 'important', val: 3}, {name: 'urgent', val: 3}]
        },
        {
            id: 1,
            title: 'Urgent',
            type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
        },
        {
            id: 2,
            title: 'Important',
            type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
        },
        {
            id: 3,
            title: 'Quick',
            type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
        },
        {
            id: 4,
            title: 'Easy',
            type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
        },
        {
            id: 5,
            title: 'Delegate',
            type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
        },
        {
            id: 6,
            title: 'All',
            type: [{name: 'important', val: 0}, {name: 'urgent', val: 3}]
        }
    ]

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
                {taskCategories.length!==0 ? taskCategories.map((item)=>{
                    return <div key={item.id} className={styles.category}>
                                <h3><span>{item.title}</span><ChevronUp /></h3>
                            </div>
                }) : null }
            </div>
            <Filters />
            <AddButton name="task" onclick={()=>setModalConfig({type: 'addTask'})} />
        </div>
    )
}

export default TaskDetails
