import React from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import {ArrowDown} from 'react-feather'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'
import { useRecoilState, useSetRecoilState } from 'recoil'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'
import eventsAtom from '../../../../recoil-atoms/eventsAtom'
import styles from './_events.module.sass'
import allRoutesAtom from '../../../../../Journals/recoil-atoms/allRoutesAtom'

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
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [events] = useRecoilState(eventsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                {events.length!==0 ? events.map((item)=>{
                    return <NavLink onClick={()=>setAllRoutes({...allRoutes, event: item.id})} onMouseEnter={addToolTipForEvents} key={item.id} to={`/schedule/events/${item.id}`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.name}><p>{item.name}</p>
                    <MoreMenu items={[{name: "edit", function: ()=>setModalConfig({type: 'editEvent', event: item})}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-1.5vh', top: '3.5vh'}} /></NavLink>
                }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first event!</p><ArrowDown /></div>}
            </div>
            <AddButton name="event" onclick={()=>setModalConfig({type: 'addEvent'})} />
        </div>
    )
}

export default Events
