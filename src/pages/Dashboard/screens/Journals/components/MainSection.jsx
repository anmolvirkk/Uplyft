import React from 'react'
import Header from '../../../components/Header'
import NoteEditor from './NoteEditor'
import { Switch, Route, Link } from 'react-router-dom'

const MainSection = ({styles, journalData, currentBook, currentSection, currentSlot, setJournalData}) => {

    const notes = []

    
    const setNote = (id, title, body, edited, subsection) => {
        journalData[currentBook].sections[0].slots[currentSlot].subsections.forEach((props)=>{
            if(props.name === subsection){
                let note = {
                    title: title,
                    body: body,
                    edited: edited
                }
                const noteId = parseInt(id.replace(subsection.replace(' ', ''), ''))
                props.data[noteId] = {...props.data[noteId], ...note}
                setJournalData([...journalData])
            }
        })
    }
    
    const addNote = (journalData, currentBook, currentSlot, setJournalData, subsection) => {
        journalData[currentBook].sections[0].slots[currentSlot].subsections.forEach((props)=>{
            let date = new Date()
            let formattedDate = date.toDateString()
            if(props.name === subsection){
                let note = {
                    id: props.name.replace(/\s/g, "")+props.data.length,
                    title: '',
                    body: '',
                    date: formattedDate,
                    edited: formattedDate,
                    name: props.name,
                    color: props.color,
                    setNote: setNote
                }
                props.data.push(note)
                setJournalData([...journalData])
            }
        })
    }

    journalData[currentBook].sections[0].slots[currentSlot].subsections.forEach((props)=>{
        props.data.forEach((props2)=>{
            let tempObj = {...props2}
            notes.push(tempObj)
        })
    })

    return (
        <div className={styles.mainSection}>

                    <Switch>

                            <Route exact path={`/journals/${currentBook}/notes/${currentSlot}`}>
                                
                                <Header />
                            
                                <div style={{display: 'flex'}}>
                                    <div className={styles.noteSection}>

                                        {
                                            notes.map((props)=>(
                                                <Link key={props.id} to={`/journals/${currentBook}/notes/${currentSlot}/${props.id}`} style={{backgroundColor: props.color}} className={styles.note}>
                                                    <h3>{props.name}</h3>
                                                    <h1>{props.title}</h1>
                                                    <p>{props.body}</p>
                                                </Link>
                                            ))
                                        }
                                        
                                    </div>
                                    <div className={styles.noteSelect}>
                                        {currentSection==="notes" ? journalData[currentBook].sections[0].slots[currentSlot].subsections.map((props)=>(
                                            <button onClick={()=>addNote(journalData, currentBook, currentSlot, setJournalData, props.name)} key={props.id}><span className={styles.plusIcon} style={{backgroundColor: props.color}} />{props.name}</button>
                                        ))  : null
                                        }
                                    </div>
                                </div>

                            </Route>

                            {
                                notes.map((props)=>(
                                    <Route key={props.id} exact path={`/journals/${currentBook}/notes/${currentSlot}/${props.id}`}>
                                        <NoteEditor styles={styles} {...props} />
                                    </Route>
                                ))
                            }
                            
                    </Switch>

        </div>
    )
}

export default MainSection