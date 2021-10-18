import React from 'react'
import NoteEditor from './components/NoteEditor'
import { Switch, Route, Link } from 'react-router-dom'
import {ArrowDown, Edit, Trash2} from 'react-feather'
import Calendar from './components/Calendar'

const MainSection = ({styles, colors, currentDate, allPrompts, openModal, setAllPrompts, slots, dates, setDates, notes, setNotes, allRoutes, setAllRoutes}) => {
    
    const noteCategories = [
        {
            category: 'brain dump',
            color: '#7ED956'
        },
        {
            category: 'gratitude',
            color: '#FFC107'
        },
        {
            category: 'reflection',
            color: '#F50057'
        },
        {
            category: 'aspiration',
            color: '#03A9F4'
        },
        {
            category: 'memory',
            color: '#7986CB'
        },
        {
            category: 'forgive',
            color: '#673AB7'
        },
        {
            category: 'letter',
            color: '#393D46'
        },
        {
            category: 'note',
            color: '#CFD8DC'
        }
    ]
    
    const setNote = (id, body, prompt) => {
        notes[allRoutes[allRoutes['book']].slot].forEach((item)=>{
            if(item.id === id){
                item.body = body
                item.prompt = prompt
                setNotes({...notes})
            }
        })
    }
    
    const removeNote = (id) => {
        let newNotes = notes[allRoutes[allRoutes['book']].slot].filter((value)=>value.id!==id)
        notes[allRoutes[allRoutes['book']].slot] = [...newNotes]
        setNotes({...notes})
    }
    
    const addNote = (category) => {
        let noteColor
        noteCategories.forEach((item)=>{
            if(item.category === category){
                noteColor = item.color
            }
        })
        let date = new Date()
        let formattedDate = date.toDateString()
        let note = {
            id: date.valueOf(),
            body: '',
            prompt: '',
            date: formattedDate,
            category: category,
            setNote: setNote,
            removeNote: removeNote,
            color: noteColor
        }
        if(notes[allRoutes[allRoutes['book']].slot]){
            notes[allRoutes[allRoutes['book']].slot].push(note)
            setNotes({...notes})
        }else{
            notes[allRoutes[allRoutes['book']].slot] = []
            notes[allRoutes[allRoutes['book']].slot].push(note)
            setNotes({...notes})
        }
    }

    if(allRoutes['book']){

    return (
        <div className={styles.mainSection}>

                    <Switch>
                            <Route exact path={`/journals/${allRoutes['book']}/${currentDate.valueOf()}/${allRoutes[allRoutes['book']].slot}`}>
                            
                            <div style={{display: 'flex'}}>
                                {
                                    allRoutes[allRoutes['book']]&&allRoutes[allRoutes['book']].slot ?
                                <div style={{width: '100%'}}>
                                    {
                                        notes[allRoutes[allRoutes['book']].slot]?
                                        notes[allRoutes[allRoutes['book']].slot].length > 0 ?
                                
                                            <div className={styles.noteSection}>
                                                {
                                                    notes[allRoutes[allRoutes['book']].slot].map((item)=>(
                                                        <div key={item.id} className={styles.note} style={{backgroundColor: `${item.color}99`}}>
                                                            {item.body==='' ? 
                                                            <div className={styles.noteLink}>
                                                                <Link to={`/journals/${allRoutes['book']}/${currentDate.valueOf()}/${allRoutes[allRoutes['book']].slot}/${item.id}`}>
                                                                    <div className={styles.helperTextEditNote}>
                                                                        <div className={styles.editIcon}><Edit /></div>
                                                                    </div>
                                                                </Link>
                                                                <div onClick={()=>removeNote(item.id)} className={styles.removeNote} style={{color: item.color}}><Trash2 /></div>
                                                            </div>
                                                                :
                                                            <div className={styles.noteLink}>
                                                                <Link to={`/journals/${allRoutes['book']}/${currentDate.valueOf()}/${allRoutes[allRoutes['book']].slot}/${item.id}`}>
                                                                    <div className={styles.noteContent}>
                                                                        <div className={styles.notePrompt}>{item.prompt}</div>
                                                                        <div className={styles.noteBody} dangerouslySetInnerHTML={{__html: item.body}}></div>
                                                                        <div className={styles.noteDate}>{item.date}</div>
                                                                    </div>
                                                                </Link>
                                                                <div onClick={()=>removeNote(item.id)} className={styles.removeNote} style={{color: item.color}}><Trash2 /></div>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                
                                        : <div className={styles.helperTextAddNote}><p>Add a note!</p><ArrowDown /></div>
                                        : <div className={styles.helperTextAddNote}><p>Add a note!</p><ArrowDown /></div>
                                        
                                    }
                                    <div className={styles.noteSelect}>
                                        {
                                            noteCategories.map((item, index)=>{
                                                return <button key={index} onClick={()=>addNote(item.category)}><span className={styles.plusIcon} style={{backgroundColor: item.color}} />{item.category}</button>
                                            })
                                        }
                                    </div>
                                    
                                </div>
                                
                                    : null
                                }
                                {allRoutes&&allRoutes['book']&&allRoutes[allRoutes['book']]&&allRoutes[allRoutes['book']].slot!==null?<Calendar slots={slots} allRoutes={allRoutes} currentDate={currentDate} dates={dates} setDates={setDates} />:null}
                            </div>

                            </Route>

                            {
                                notes[allRoutes[allRoutes['book']].slot]?
                                notes[allRoutes[allRoutes['book']].slot].map((props)=>(
                                    <Route key={props.id} exact path={`/journals/${allRoutes['book']}/${currentDate.valueOf()}/${allRoutes[allRoutes['book']].slot}/${props.id}`}>
                                        <NoteEditor allPrompts={allPrompts} setAllPrompts={setAllPrompts} openModal={openModal} styles={styles} {...props} colors={colors} notes={notes} allRoutes={allRoutes} />
                                    </Route>
                                ))
                                : null
                            }
                            
                    </Switch>

        </div>
    )
    }else{
        return null
    }
}

export default MainSection