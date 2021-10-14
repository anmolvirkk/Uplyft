import React from 'react'
import { NavLink } from 'react-router-dom'
import MoreMenu from '../../../components/MoreMenu'
import AddButton from '../../../components/AddButton'
import {ArrowDown} from 'react-feather'

const SlotsSection = ({styles, journalData, setJournalData, currentBook, currentSection, setCurrentSection, setCurrentSlot, currentSlot, openModal, currentDate}) => {
    
    const deleteSlot = () => {

        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
                    props.dates.forEach((date)=>{
                        if(date.date.toDateString() === currentDate.toDateString()){

                            date.sections.forEach((props2)=>{
                        
                                if(currentSection === 'notes'){
            
                                    if(props2.slots.length > 0){
            
                                        props2.slots.forEach((props3)=>{
            
                                            if(currentSlot === props3.id){
        
                                                const newSlots = props2.slots.filter((value)=>value.id!==currentSlot)
                                                props2.slots = [...newSlots]
                                                setJournalData([...journalData])
            
                                            }
            
                                        })
            
                                    }
            
                                }
            
                            })
                        }
                    })
    
                }
            })
        }
        
    }

    const renameSlot = () => {
        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
                    props.dates.forEach((date)=>{
                        if(date.date.toDateString() === currentDate.toDateString()){

                            date.sections.forEach((props2)=>{
                        
                                if(currentSection === 'notes'){
            
                                    if(props2.slots.length > 0){
            
                                        props2.slots.forEach((props3)=>{
            
                                            if(currentSlot === props3.id){
                                                console.log(props3)
                                                openModal({...props3, journalData, setJournalData, type: 'entry'})
            
                                            }
            
                                        })
            
                                    }
            
                                }
            
                            })
                        }
                    })
    
                }
            })
        }
    }

    

    document.addEventListener('mouseover', function(e) {
        if(e.target.classList.contains(styles.sideSectionSlot)){
            if(e.target.getElementsByTagName('p')[0].scrollWidth > e.target.getElementsByTagName('p')[0].offsetWidth){
                 e.target.classList.add(styles.overflownSlot)
            }else if(e.target.classList.contains(styles.overflownSlot)) {
                e.target.classList.remove(styles.overflownSlot)
            }
        }
    });

    return (
            <div className={styles.sideSection}>
                <div className={styles.sideSectionHeader}>
                    {
                        journalData.length > 0 ?
                        journalData.map((props)=>{
                            if(currentBook === props.id){
                                return props.dates.map((date)=>{
                                    if(date.date.toDateString() === currentDate.toDateString()){

                                        return date.sections.map((props2)=>{
                                    
                                            return <NavLink key={props2.id} onClick={()=>setCurrentSection(props2.name)} className={styles.sectionIcon} to={`/journals/${currentBook}/${currentDate.valueOf()}/${props2.name}`} activeClassName={styles.activeSectionIcon}>
                                                        {props2.icon}
                                                    </NavLink>
                        
                                        })

                                    }
                                    return null
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
                            return props.dates.map((date)=>{
                                if(date.date.toDateString() === currentDate.toDateString()){

                                    return date.sections.map((props2)=>{
                                
                                        if(currentSection === props2.name){
                    
                                            if(props2.slots.length > 0){
                    
                                                return props2.slots.map((props3)=>{
                                                    
                                                    return <NavLink onClick={()=>setCurrentSlot(props3.id)} key={props3.id} to={`/journals/${currentBook}/${currentDate.valueOf()}/${currentSection}/${props3.id}`} className={styles.sideSectionSlot} activeClassName={styles.activeSectionSlot} data-title={props3.title}><p>{props3.title ==='' ? props3.date : props3.title}</p><MoreMenu items={[{name: "rename", function: renameSlot}, {name: "delete", function: deleteSlot}]} id={`slotsMoreMenu${props3.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
                    
                                                })
                    
                                            }else {
                                                switch (currentSection) {
                                                    case 'notes':
                                                        return <div key={props2.id} className={styles.helperTextAddEntry}><p>Add your first journal entry!</p><ArrowDown /></div>
                                                    
                                                    case 'tasks':
                                                        return <div key={props2.id} className={styles.helperTextAddEntry}><p>Add your first task!</p><ArrowDown /></div>
                                                    
                                                    case 'events':
                                                        return <div key={props2.id} className={styles.helperTextAddEntry}><p>Add your first event!</p><ArrowDown /></div>
                                                    
                                                    default: return null
                                                }
                                            }
                    
                                        }
        
                                        return null
                    
                                    })
                                }
                                return null
                            })
            
                        }
                        return null
                    }) : null}
                </div>
                <AddButton currentDate={currentDate} name="entry" journalData={journalData} setJournalData={setJournalData} currentBook={currentBook} currentSection={currentSection} setCurrentSlot={setCurrentSlot} />
            </div>
    )
}
export default SlotsSection