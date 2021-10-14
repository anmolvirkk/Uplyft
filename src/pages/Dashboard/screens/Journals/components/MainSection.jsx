import React from 'react'
import NoteEditor from './NoteEditor'
import { Switch, Route, Link } from 'react-router-dom'
import {ArrowDown, Edit, Trash2} from 'react-feather'
import Calendar from './Calendar'

const MainSection = ({styles, journalData, currentBook, currentSection, currentSlot, setJournalData, colors, currentDate, allPrompts, openModal, setAllPrompts}) => {

    const notes = []
    
        const setNote = (id, body, prompt,subsection) => {

            if(journalData.length > 0){
                journalData.forEach((props)=>{
                if(currentBook === props.id){
                    props.dates.forEach((date)=>{
                        if(date.date.toDateString() === currentDate.toDateString()){

                            date.sections.forEach((props2)=>{
                        
                                if(currentSection === 'notes'){
            
                                    if(props2.slots.length > 0){
            
                                        props2.slots.forEach((props3)=>{
            
                                            if(currentSlot === props3.id && props3.subsections){
            
                                                props3.subsections.forEach((props4)=>{
                                                
                                                    if(props4.name === subsection){
                                                        let note = {
                                                            body: body,
                                                            prompt: prompt
                                                        }
                                                        props4.data.forEach((props5, index)=>{
                                                            if(props5.id === id){
                                                                props4.data[index] = {...props5, ...note}
                                                                setJournalData([...journalData])
                                                            }
                                                        })
                                                    }
                
                                                })
            
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
    
    const removeNote = (id, subsection) => {
        if(journalData.length > 0){
            journalData.forEach((props)=>{
            if(currentBook === props.id){

                props.dates.forEach((date)=>{
                    if(date.date.toDateString() === currentDate.toDateString()){

                        date.sections.forEach((props2)=>{
                    
                            if(currentSection === 'notes'){
        
                                if(props2.slots.length > 0){
        
                                    props2.slots.forEach((props3)=>{
        
                                        if(currentSlot === props3.id && props3.subsections){
        
                                            props3.subsections.forEach((props4)=>{
                                            
                                                if(props4.name === subsection){
        
        
                                                    props4.data.forEach((props5)=>{
                                                        if(props5.id === id){
                                                            let newNotes = props4.data.filter((value)=>value.id!==id)
                                                            props4.data = [...newNotes]
                                                            setJournalData([...journalData])
                                                        }
                                                    })
                                                }
            
                                            })
        
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
    
    const addNote = (journalData, currentBook, currentSlot, setJournalData, subsection) => {

        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
                    props.dates.forEach((date)=>{
                        if(date.date.toDateString() === currentDate.toDateString()){

                            date.sections.forEach((props2)=>{
                        
                                if(currentSection === 'notes'){
            
                                    if(props2.slots.length > 0){
            
                                        props2.slots.forEach((props3)=>{
            
                                            if(currentSlot === props3.id && props3.subsections){
            
                                                props3.subsections.forEach((props4)=>{
                                                
                                                    let date = new Date()
                                                    let formattedDate = date.toDateString()
                                                    if(props4.name === subsection){
                                                        let note = {
                                                            id: date.valueOf(),
                                                            title: '',
                                                            body: '',
                                                            prompt: '',
                                                            date: formattedDate,
                                                            name: props4.name,
                                                            color: props4.color,
                                                            setNote: setNote,
                                                            removeNote: removeNote
                                                        }
                                                        props4.data.push(note)
                                                        setJournalData([...journalData])
                                                    }
                
                                                })
            
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

    if(journalData.length > 0){
        journalData.forEach((props)=>{
            if(currentBook === props.id){

                props.dates.forEach((date)=>{
                    if(date.date.toDateString() === currentDate.toDateString()){

                        date.sections.forEach((props2)=>{
                    
                            if(currentSection === 'notes'){
        
                                if(props2.slots.length > 0){
        
                                    props2.slots.forEach((props3)=>{
        
                                        if(currentSlot === props3.id && props3.subsections){
        
                                            props3.subsections.forEach((props4)=>{
                                                props4.data.forEach((props5)=>{
                                                    let tempObj = {...props5}
                                                    notes.push(tempObj)
                                                })
            
                                            })
        
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

    return (
        <div className={styles.mainSection}>

                    <Switch>
                            <Route exact path={`/journals/${currentBook}/${currentDate.valueOf()}/notes/${currentSlot}`}>
                            
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '100%'}}>
                                    {
                                        journalData.length > 0 ? 
                                        journalData.map((props)=>{
                                            if(currentBook === props.id){
                                                return props.dates.map((date)=>{
                                                    if(date.date.toDateString() === currentDate.toDateString()){
                                                        
                                                return date.sections.map((props2)=>{
                                                    
                                                    if(props2.name === 'notes'){
                                
                                                        if(notes.length > 0){
                                
                                                            return <div key={props2.id} className={styles.noteSection}>

                                                                {
                                                                    notes.map((props3)=>(
                                                                        <div key={props3.id} className={styles.note} style={{backgroundColor: `${props3.color}99`}}>
                                                                            {props3.title==='' && props3.body==='' ? 
                                                                            <div className={styles.noteLink}>
                                                                                <Link to={`/journals/${currentBook}/${currentDate.valueOf()}/notes/${currentSlot}/${props3.id}`}>
                                                                                    <div className={styles.helperTextEditNote}>
                                                                                        <div className={styles.editIcon}><Edit /></div>
                                                                                    </div>
                                                                                </Link>
                                                                                <div onClick={()=>removeNote(props3.id, props3.name)} className={styles.removeNote} style={{color: props3.color}}><Trash2 /></div>
                                                                            </div>
                                                                                :
                                                                            <div className={styles.noteLink}>
                                                                                <Link to={`/journals/${currentBook}/${currentDate.valueOf()}/notes/${currentSlot}/${props3.id}`}>
                                                                                    <div className={styles.noteContent}>
                                                                                        <div className={styles.notePrompt}>{props3.prompt}</div>
                                                                                        <div className={styles.noteBody} dangerouslySetInnerHTML={{__html: props3.body}}></div>
                                                                                        <div className={styles.noteDate}>{props3.date}</div>
                                                                                    </div>
                                                                                </Link>
                                                                                <div onClick={()=>removeNote(props3.id, props3.name)} className={styles.removeNote} style={{color: props3.color}}><Trash2 /></div>
                                                                            </div>
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                        
                                                            </div>
                                
                                                        }else{
                                                            return <div key={props2.id} className={styles.helperTextAddNote}><p>Add a note!</p><ArrowDown /></div>
                                                        }
                                
                                                    }

                                                    return null
                                
                                                })
                                                    }
                                                    return null
                                                })
                                
                                            }
                                            return null
                                        }) : null
                                    }
                                <div className={styles.noteSelect}>
                                        {
                                        journalData.length > 0 ?
                                        journalData.map((props)=>{
                                            if(currentBook === props.id){
                                                return props.dates.map((date)=>{
                                                    if(date.date.toDateString() === currentDate.toDateString()){

                                                        return date.sections.map((props2)=>{
                                                    
                                                            if(props2.name === 'notes'){
                                        
                                                                if(props2.slots.length > 0){
                                        
                                                                    return props2.slots.map((props3)=>{
                                                                        
                                                                        if(currentSlot === props3.id){
        
                                                                            return props3.subsections.map((props4)=>{
                                                                            
                                                                                return <button onClick={()=>addNote(journalData, currentBook, currentSlot, setJournalData, props4.name)} key={props4.id}><span className={styles.plusIcon} style={{backgroundColor: props4.color}} />{props4.name}</button>
                                            
                                                                            })
        
                                                                        }
        
                                                                        return null
                                        
                                                                    })
                                        
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
                                    
                                </div>

                                    <Calendar journalData={journalData} currentBook={currentBook} currentDate={currentDate} />
                            </div>

                            </Route>

                            {
                                notes.map((props)=>(
                                    <Route key={props.id} exact path={`/journals/${currentBook}/${currentDate.valueOf()}/notes/${currentSlot}/${props.id}`}>
                                        <NoteEditor allPrompts={allPrompts} setAllPrompts={setAllPrompts} openModal={openModal} styles={styles} {...props} colors={colors} />
                                    </Route>
                                ))
                            }
                            
                    </Switch>

        </div>
    )
}

export default MainSection