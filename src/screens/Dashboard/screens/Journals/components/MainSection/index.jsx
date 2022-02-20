import React from 'react'
import NoteEditor from './components/NoteEditor'
import { Switch, Route, Link } from 'react-router-dom'
import {ArrowDown, Edit, Trash2} from 'react-feather'

import {useRecoilState, useSetRecoilState} from 'recoil'
import company from '../../../../../../company'

import { noteCategories } from '../../../../variables/noteCategories'

import OutsideClickHandler from 'react-outside-click-handler-lite/build/OutsideClickHandler'

import { notesAtom, notesDropDownAtom, currentMobileSectionAtom, allRoutesAtom, allPromptsAtom } from '../../../../allAtoms'

const MainSection = ({styles, isMobile}) => {
    const mobileHeight = window.innerHeight - 80 - 60

    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)
    
    const [notes, setNotes] = useRecoilState(notesAtom)
    
    const [notesDropDown, setNotesDropDown] = useRecoilState(notesDropDownAtom)

    const addNoteDropDown = (category) => {
        addNote(category)
        setNotesDropDown(false)
    }

    const setNote = (id, body, prompt) => {
        let newNotes = {...notes}
        newNotes[allRoutes[allRoutes['book']][allRoutes['date']]] = newNotes[allRoutes[allRoutes['book']][allRoutes['date']]].map((item)=>{
            let newItem = {...item}
            if(newItem.id === id){
                newItem.body = body
                newItem.prompt = prompt
            }
            return newItem
        })
        setNotes({...newNotes})
    }
    
    const removeNote = (id) => {
        let newNotes = {...notes}
        newNotes[allRoutes[allRoutes['book']][allRoutes['date']]] = newNotes[allRoutes[allRoutes['book']][allRoutes['date']]].map((value)=>{
            if(value.id===id){
                return null
            }else{
                return value
            }
        }).filter((item)=>item!==null)
        setNotes({...newNotes})
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

    const setCurrentMobileSection = useSetRecoilState(currentMobileSectionAtom)

    if(allRoutes['book']){
    return (
        <div className={styles.mainSection} id='journalMainSection'>
                        <Switch>
                            <Route exact path={`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`}>
                            <div style={{display: 'flex', width: '100%', height: isMobile?(window.innerHeight-80-60)+'px':null}}>
                                {
                                allRoutes[allRoutes['book']][allRoutes['date']] ?
                                <div style={{width: '100%', height: isMobile?'100%':null}}>
                                    {
                                        notes[allRoutes[allRoutes['book']][allRoutes['date']]]?
                                        notes[allRoutes[allRoutes['book']][allRoutes['date']]].length > 0 ?
                                
                                            <div className={styles.noteSection}>
                                                {
                                                    notes[allRoutes[allRoutes['book']][allRoutes['date']]].map((item)=>(
                                                        <div key={item.id} className={styles.note}>
                                                            {item.body==='' ? 
                                                            <div className={styles.noteLink} style={{backgroundColor: `${item.color}`}}>
                                                                <Link onMouseDown={()=>setCurrentMobileSection(3)} to={`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}/${item.id}`}>
                                                                    <div className={styles.helperTextEditNote}>
                                                                        <div className={styles.editIcon}><Edit /></div>
                                                                    </div>
                                                                </Link>
                                                                <div onClick={()=>removeNote(item.id)} className={styles.removeNote} style={{color: item.color}}><Trash2 /></div>
                                                            </div>
                                                                :
                                                            <div className={styles.noteLink} style={{backgroundColor: `${item.color}`}}>
                                                                <Link onMouseDown={()=>setCurrentMobileSection(3)} to={`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}/${item.id}`}>
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
                
                                        : <div className={styles.helperTextAddNote} style={isMobile?{height: `${mobileHeight}px`}:null}><p>Add a note!</p>{!isMobile?<ArrowDown />:null}</div>
                                        : <div className={styles.helperTextAddNote} style={isMobile?{height: `${mobileHeight}px`}:null}><p>Add a note!</p>{!isMobile?<ArrowDown />:null}</div>
                                        
                                    }
                                    <div className={styles.noteSelect}>
                                        {
                                            noteCategories.map((item, index)=>{
                                                return <button key={index} onClick={()=>addNote(item.category)}><span className={styles.plusIcon} style={{backgroundColor: item.color}} />{item.category}</button>
                                            })
                                        }
                                    </div>

                                    {notesDropDown?
                                            <div className={styles.notesDropDown}>
                                                <OutsideClickHandler onOutsideClick={()=>setNotesDropDown(false)}>
                                                    {
                                                        noteCategories.map((item, index)=>{
                                                            return <button key={index} onClick={()=>addNoteDropDown(item.category)}><span className={styles.plusIcon} style={{backgroundColor: item.color}} />{item.category}</button>
                                                        })
                                                    }
                                                </OutsideClickHandler>
                                            </div>
                                    :null}
                                    
                                </div>
                                
                                    : null
                                }
                            </div>

                            </Route>

                            {
                                notes[allRoutes[allRoutes['book']][allRoutes['date']]]?
                                notes[allRoutes[allRoutes['book']][allRoutes['date']]].map((props)=>(
                                    <Route key={props.id} exact path={`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}/${props.id}`}>
                                        <NoteEditor isMobile={isMobile} allPrompts={allPrompts} setAllPrompts={setAllPrompts} styles={styles} {...props} notes={notes} allRoutes={allRoutes} setNote={setNote} />
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