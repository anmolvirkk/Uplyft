import React from 'react'
import Header from '../../../components/Header'
import NoteEditor from './NoteEditor'
import { Switch, Route, Link } from 'react-router-dom'

const addNote = (journalData, currentBook, currentSlot, setJournalData, subsection) => {
    journalData[currentBook].sections[0].slots[currentSlot].subsections.forEach((props)=>{
        if(props.name === subsection){
            let note = {
                id: props.name.replace(/\s/g, "")+props.data.length,
                title: 'Title',
                body: 'body'
            }
            props.data.push(note)
            setJournalData([...journalData])
        }
    })
}

const MainSection = ({styles, journalData, currentBook, currentSection, currentSlot, setJournalData}) => {

    const notes = []

    journalData[currentBook].sections[0].slots[currentSlot].subsections.forEach((props)=>{
        props.data.forEach((props2)=>{
            let tempObj = {...props2, color: props.color, name: props.name}
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
                                                    <h1>{props.title}</h1>
                                                    <h3>{props.name}</h3>
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
                                        <NoteEditor styles={styles} />
                                    </Route>
                                ))
                            }
                            
                    </Switch>

        </div>
    )
}

export default MainSection