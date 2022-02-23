import React, {useState} from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { ChevronDown, ChevronUp} from 'react-feather'
import { NavLink, Redirect } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from './_events.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite'
import modalStyles from '../../../../../../components/Modal/_modal.module.sass'
import company from '../../../../../../../../company'
import schdetailStyles from '../_scheduleSection.module.sass'
import { allCalendarEventsAtom, eventTagsAtom, allRoutesAtom, eventsAtom } from '../../../../../../allAtoms'
import modalConfigAtom from '../../../../../../recoil-atoms/modalConfigAtom'

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
                <div className={schdetailStyles.filters}>
                        <div className={schdetailStyles.filterTitle} onClick={()=>setFilterOpen(!filterOpen)}><span>Filters</span>{filterOpen?<ChevronDown />:<ChevronUp />}</div>
                        {filterOpen?
                        <div className={schdetailStyles.filterTab}>
                            <div className={schdetailStyles.fiterSliders}>
                                <div className={schdetailStyles.title}>
                                    <h3>Tags</h3>
                                </div>
                                <div className={modalStyles.tags}>
                                    <div onMouseDown={()=>setFilters([])} className={`${modalStyles.tag} ${filters.length===0?modalStyles.tagActive:null}`}><span>All</span></div>
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
        if(filters.length>0){
            let newTasks = tasks.map((item)=>{
                let newTask = null
                if(filters.every(i=>item.tags.includes(i))){
                    newTask = item
                }
                return newTask
            })
            return newTasks.filter(i=>i!==null)
        }else{
            return tasks
        }
    }

    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [events, setEvents] = useRecoilState(eventsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const deleteEvent = (id) => {
        let newEvents = events.filter((value)=>value.id!==id)
        let newAllCalendarEvents = allCalendarEvents.filter((value)=>value.id!==id)
        setEvents([...newEvents])
        setAllCalendarEvents([...newAllCalendarEvents])
    }

    const isMobile = window.innerWidth <= 640
    const mobileHeight = window.innerHeight - 80 - 60
    return (
        <div style={isMobile?{display: 'none'}:null}>
            <Redirect to={`/dashboard/${company.schedule}/events/${allRoutes.event?allRoutes.event:''}`} />
            <div className={journalStyles.slotSection} style={{height: !isMobile?'calc(100vh - 160px - 40px)':mobileHeight}}>
                {events.length!==0 ? filterEvents(events).map((item)=>{
                    return <NavLink onClick={()=>setAllRoutes({...allRoutes, event: item.id})} onMouseEnter={addToolTipForEvents} key={item.id} to={`/dashboard/${company.schedule}/events/${item.id}`} className={`${journalStyles.sideSectionSlot} ${styles.eventSlot}`} activeClassName={journalStyles.activeSectionSlot} data-title={item.name}><p>{item.name}</p>
                    <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editEvent', event: item})}, {name: "delete", function: ()=>deleteEvent(item.id)}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-1.5vh', top: '3.5vh'}} /></NavLink>
                }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first event!</p><AddButton name="event" type="round" onclick={()=>setModalConfig({type: 'addEvent'})} /></div>}
            </div>
            <Filters />
            <AddButton name="event" type="main" onclick={()=>setModalConfig({type: 'addEvent'})} />
        </div>
    )
}

export default Events
