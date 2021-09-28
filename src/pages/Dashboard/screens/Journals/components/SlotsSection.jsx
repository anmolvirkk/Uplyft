import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import AddButton from './AddButton'
import {MoreVertical} from 'react-feather'

const MoreMenu = ({styles}) => {

    const [visible, setVisible] = useState('block');
    
    
    document.addEventListener('mouseup', function(e) {
        const moreMenu = document.getElementById('moreMenu');
        if (!moreMenu.contains(e.target)) {
            setVisible('none')
        }
    });

    const toggleMenu = () => {
        setVisible('block')
    }

    return (
        <div className={styles.moreMenuIcon} onClick={toggleMenu}>
            <MoreVertical />
            <ul className={styles.moreMenu} id="moreMenu" style={{display: visible}}>
                <li>rename</li>
                <li>delete</li>
            </ul>
        </div>
    )
}

const SlotsSection = ({styles, journalData, currentBook, currentSection, setCurrentSection, setCurrentSlot}) => (
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
                    return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props.title ==='' ? 'Untitled' : props.title}</p><MoreMenu styles={styles} /></NavLink>
                }) : currentSection==="tasks" ? journalData[currentBook].sections[1].slots.map((props)=>{
                    return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props.title ==='' ? 'Untitled' : props.title}</p><MoreMenu styles={styles} /></NavLink>
                }) : journalData[currentBook].sections[2].slots.map((props)=>{
                    return <NavLink onClick={()=>setCurrentSlot(props.id)} key={props.id} to={`/journals/${currentBook}/${currentSection}/${props.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props.title ==='' ? 'Untitled' : props.title}</p><MoreMenu styles={styles} /></NavLink>
            })}
        </div>
        <AddButton name="section" styles={styles} />
    </div>
)

export default SlotsSection