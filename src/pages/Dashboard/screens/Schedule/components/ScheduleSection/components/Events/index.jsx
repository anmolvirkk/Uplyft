import React, {useState} from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import {ArrowDown, ChevronDown, ChevronUp} from 'react-feather'
import { NavLink, Redirect } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'
import eventsAtom from '../../../../recoil-atoms/eventsAtom'
import styles from './_events.module.sass'
import allRoutesAtom from '../../../../../Journals/recoil-atoms/allRoutesAtom'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import eventTagsAtom from '../../../../../../components/Modal/components/AddEvent/eventTagsAtom'
import modalStyles from '../../../../../../components/Modal/_modal.module.sass'

const addToolTipForEvents = (e) => {
    if(e.target.getElementsByTagName('p')[0]){
        if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
            e.target.classList.add(styles.overflownSlot)
        }else if(e.target.classList.contains(styles.overflownSlot)) {
            e.target.classList.remove(styles.overflownSlot)
        }
    }
}

const Events = () => {

    const [filters, setFilters] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)

    const Filters = () => {
        const [eventTags] = useRecoilState(eventTagsAtom)
        const toggleTag = (tag) => {
            if(filters.filter(i=>i===tag).length===0){
                setFilters([...filters, tag])
            }else{
                setFilters([...filters.filter(i=>i!==tag)])
            }
        }
        return (
            <OutsideClickHandler onOutsideClick={()=>setFilterOpen(false)}>
                <div className={styles.filters}>
                        <div className={styles.filterTitle} onClick={()=>setFilterOpen(!filterOpen)}><span>Filters</span>{filterOpen?<ChevronDown />:<ChevronUp />}</div>
                        {filterOpen?
                        <div className={styles.filterTab}>
                            <div className={styles.fiterSliders}>
                                <div className={styles.title}>
                                    <h3>Tags</h3>
                                </div>
                                <div className={modalStyles.tags}>
                                    <div onMouseDown={()=>setFilters({...filters, tags: []})} className={`${modalStyles.tag} ${filters.length===0?modalStyles.tagActive:null}`}><span>All</span></div>
                                    {eventTags.map((item, index)=>{
                                        return <div key={index} onMouseDown={()=>toggleTag(item)} className={`${modalStyles.tag} ${filters.filter(i=>i===item).length>0?modalStyles.tagActive:null}`}><span>{item}</span></div>
                                    })}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
            </OutsideClickHandler>
        )
    }
    
    const filterEvents = (tasks) => {
        let newTasks = tasks.map((item)=>{
            let newTask = null
            if(filters.every(i=>item.tags.includes(i))){
                newTask = item
            }
            return newTask
        })
        return newTasks.filter(i=>i!==null)
    }

    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [events] = useRecoilState(eventsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    return (
        <div>
            <Redirect to={`/schedule/events/${allRoutes.event?allRoutes.event:''}`} />
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px - 40px)'}}>
                {events.length!==0 ? filterEvents(events).map((item)=>{
                    return <NavLink onClick={()=>setAllRoutes({...allRoutes, event: item.id})} onMouseEnter={addToolTipForEvents} key={item.id} to={`/schedule/events/${item.id}`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.name}><p>{item.name}</p>
                    <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editEvent', event: item})}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-1.5vh', top: '3.5vh'}} /></NavLink>
                }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first event!</p><ArrowDown /></div>}
            </div>
            <Filters />
            <AddButton name="event" onclick={()=>setModalConfig({type: 'addEvent'})} />
        </div>
    )
}

export default Events
