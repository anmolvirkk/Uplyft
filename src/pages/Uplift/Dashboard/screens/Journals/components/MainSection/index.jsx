import React, {useState} from 'react'
import NoteEditor from './components/NoteEditor'
import { Switch, Route, Link } from 'react-router-dom'
import {ArrowDown, Edit, Trash2} from 'react-feather'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import allPromptsAtom from '../../recoil-atoms/allPromptsAtom'

const MainSection = ({styles}) => {

    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)
    
    const [notes, setNotes] = useState(localStorage['notes']&&localStorage['notes'] !== '[]'?JSON.parse(localStorage['notes']):[])
    localStorage['notes'] = JSON.stringify(notes)
    
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
        notes[allRoutes[allRoutes['book']][allRoutes['date']]].forEach((item)=>{
            if(item.id === id){
                item.body = body
                item.prompt = prompt
                setNotes({...notes})
            }
        })
    }
    
    const removeNote = (id) => {
        let newNotes = notes[allRoutes[allRoutes['book']][allRoutes['date']]].filter((value)=>value.id!==id)
        notes[allRoutes[allRoutes['book']][allRoutes['date']]] = [...newNotes]
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
        if(notes[allRoutes[allRoutes['book']][allRoutes['date']]]){
            setNotes({...notes, [allRoutes[allRoutes['book']][allRoutes['date']]]: [...notes[allRoutes[allRoutes['book']][allRoutes['date']]], note]})
        }else{
            let emptyArray = []
            setNotes({...notes, [allRoutes[allRoutes['book']][allRoutes['date']]]: [...emptyArray, note]})
        }
    }

    if(allRoutes['book']){

    return (
        <div className={styles.mainSection}>
                        <Switch>
                            <Route exact path={`/uplift/dashboard/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`}>
                            <div style={{display: 'flex'}}>
                                {
                                allRoutes[allRoutes['book']][allRoutes['date']] ?
                                <div style={{width: '100%'}}>
                                    {
                                        notes[allRoutes[allRoutes['book']][allRoutes['date']]]?
                                        notes[allRoutes[allRoutes['book']][allRoutes['date']]].length > 0 ?
                                
                                            <div className={styles.noteSection}>
                                                {
                                                    notes[allRoutes[allRoutes['book']][allRoutes['date']]].map((item)=>(
                                                        <div key={item.id} className={styles.note}>
                                                            {item.body==='' ? 
                                                            <div className={styles.noteLink} style={{backgroundColor: `${item.color}`}}>
                                                                <Link to={`/uplift/dashboard/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}/${item.id}`}>
                                                                    <div className={styles.helperTextEditNote}>
                                                                        <div className={styles.editIcon}><Edit /></div>
                                                                    </div>
                                                                </Link>
                                                                <div onClick={()=>removeNote(item.id)} className={styles.removeNote} style={{color: item.color}}><Trash2 /></div>
                                                            </div>
                                                                :
                                                            <div className={styles.noteLink} style={{backgroundColor: `${item.color}`}}>
                                                                <Link to={`/uplift/dashboard/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}/${item.id}`}>
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
                            </div>

                            </Route>

                            {
                                notes[allRoutes[allRoutes['book']][allRoutes['date']]]?
                                notes[allRoutes[allRoutes['book']][allRoutes['date']]].map((props)=>(
                                    <Route key={props.id} exact path={`/uplift/dashboard/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}/${props.id}`}>
                                        <NoteEditor allPrompts={allPrompts} setAllPrompts={setAllPrompts} styles={styles} {...props} notes={notes} allRoutes={allRoutes} setNote={setNote} />
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