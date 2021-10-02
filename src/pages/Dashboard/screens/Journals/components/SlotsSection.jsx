import React from 'react'
import { NavLink } from 'react-router-dom'
import MoreMenu from '../../../components/MoreMenu'
import AddButton from '../../../components/AddButton'
import {ArrowDown} from 'react-feather'

const SlotsSection = ({styles, journalData, setJournalData, currentBook, currentSection, setCurrentSection, setCurrentSlot, currentSlot}) => {
    
    const deleteSlot = () => {
        const section = currentSection==='notes' ? 0 : currentSection==='tasks' ? 1 : 2    
        const newSlots = journalData[currentBook].sections[section].slots.filter((value)=>value.id!==currentSlot)
        journalData[currentBook].sections[section].slots = [...newSlots]
        setJournalData([...journalData])
    }

    const renameSlot = (setCurrentSlot) => {
        setCurrentSlot(0)
    }

    return (
            <div className={styles.sideSection}>
                <div className={styles.sideSectionHeader}>
                    {
                        journalData.length > 0 ?
                        journalData.map((props)=>{
                            if(currentBook === props.id){
                
                                return props.sections.map((props2)=>{
                                    
                                    return <NavLink key={props2.id} onClick={()=>setCurrentSection(props2.name)} className={styles.sectionIcon} to={`/journals/${currentBook}/${props2.name}`} activeClassName={styles.activeSectionIcon}>
                                                {props2.icon}
                                            </NavLink>
                
                                })
                
                            }
                            return null
                        })
                    : null
                    }
                </div>
                <div className={styles.slotSection}>
                    {
                    journalData.length > 0 ?
                    journalData.map((props)=>{
                        if(currentBook === props.id){
            
                            return props.sections.map((props2)=>{
                                
                                if(currentSection === props2.name){
            
                                    if(props2.slots.length > 0){
            
                                        return props2.slots.map((props3)=>{
                                            
                                            return <NavLink onClick={()=>setCurrentSlot(props3.id)} key={props3.id} to={`/journals/${currentBook}/${currentSection}/${props3.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot}><p>{props3.title ==='' ? props3.date : props3.title}</p><MoreMenu items={[{name: "rename", function: renameSlot}, {name: "delete", function: deleteSlot}]} id={`slotsMoreMenu${props3.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
            
                                        })
            
                                    }else {
                                        return <div key={props2.id} className={styles.helperTextAddEntry}><p>Add your first journal entry!</p><ArrowDown /></div>
                                    }
            
                                }

                                return null
            
                            })
            
                        }
                        return null
                    }) : null}
                </div>
                <AddButton name="entry" journalData={journalData} setJournalData={setJournalData} currentBook={currentBook} currentSection={currentSection} setCurrentSlot={setCurrentSlot} />
            </div>
    )
}
export default SlotsSection