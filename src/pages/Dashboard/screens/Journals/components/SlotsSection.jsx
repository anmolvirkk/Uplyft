import React from 'react'
import { NavLink } from 'react-router-dom'

const SlotsSection = ({styles, journalData, currentBook, currentSection, setCurrentSection, setCurrentSlot}) => (
    <div className={styles.sideSection}>
        <div className={styles.sideSectionHeader}>
            {journalData[currentBook].sections.map((props)=>(
                <NavLink key={props.id} onClick={()=>setCurrentSection(props.name)} className={styles.sectionIcon} to={`/journals/${currentBook}/${props.name}`} activeClassName={styles.activeSectionIcon}>
                    {props.icon}
                </NavLink>
            ))}
        </div>
        {currentSection==="notes" ? journalData[currentBook].sections[0].slots.map((props)=>{
                return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}>{props.subsections[0].id}</NavLink>
            }) : currentSection==="tasks" ? journalData[currentBook].sections[1].slots.map((props)=>{
                return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}>{props.title}</NavLink>
            }) : journalData[currentBook].sections[2].slots.map((props)=>{
                return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}>{props.title}</NavLink>
        })}
    </div>
)

export default SlotsSection