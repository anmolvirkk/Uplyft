import React from 'react'
import { NavLink } from 'react-router-dom'
import MoreMenu from '../../../components/MoreMenu'
import AddButton from '../../../components/AddButton'
import {ArrowDown} from 'react-feather'

const SlotsSection = ({styles, journalData, setJournalData, currentBook, currentSection, setCurrentSection, setCurrentSlot}) => (
    <div className={styles.sideSection}>
        <div className={styles.sideSectionHeader}>
            {journalData[currentBook].sections.map((props)=>(
                <NavLink key={props.id} onClick={()=>setCurrentSection(props.name)} className={styles.sectionIcon} to={`/journals/${currentBook}/${props.name}`} activeClassName={styles.activeSectionIcon}>
                    {props.icon}
                </NavLink>
            ))}
        </div>
        <div className={styles.slotSection}>
            {currentSection==="notes" ? journalData[currentBook].sections[0].slots.map((props)=>{
                    return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props.title ==='' ? props.date : props.title}</p><MoreMenu items={["rename", "delete"]} /></NavLink>
                }) : currentSection==="tasks" ? journalData[currentBook].sections[1].slots.map((props)=>{
                    return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props.title ==='' ? props.date : props.title}</p><MoreMenu items={["rename", "delete"]} /></NavLink>
                }) : journalData[currentBook].sections[2].slots.map((props)=>{
                    return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props.title ==='' ? props.date : props.title}</p><MoreMenu items={["rename", "delete"]} /></NavLink>
            })}
            {journalData[currentBook].sections[0].slots.length<=0 ? <div className={styles.helperTextAddEntry}><p>Add your first journal entry!</p><ArrowDown /></div> : null}
        </div>
        <AddButton name="entry" journalData={journalData} setJournalData={setJournalData} currentBook={currentBook} currentSection={currentSection} />
    </div>
)

export default SlotsSection