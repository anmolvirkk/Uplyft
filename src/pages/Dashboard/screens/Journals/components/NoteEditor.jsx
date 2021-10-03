import React, {useEffect, useRef, useState} from 'react'
import Header from '../../../components/Header'
import {List, Bold, Underline, Image, Trash2} from 'react-feather'
import { Redirect } from 'react-router'

const NoteEditor = ({styles, ...props}) => {

    const [deleteNote, setDeleteNote] = useState(false)

    const removeThisNote = () => {
        Promise.resolve(setDeleteNote(true)).then(()=>props.removeNote(props.id, props.name))
    }
    
    const headerItems = [
        {
            type: 'dropdown',
            options:[
                'Normal Text',
                'Small Header',
                'Medium Header',
                'Large Header'
            ]
        },
        {
            type: 'icon',
            icon: <List />
        },
        {
            type: 'icon',
            icon: <Bold />
        },
        {
            type: 'icon',
            icon: <Underline />
        },
        {
            type: 'icon',
            icon: <Image />
        },
        {
            type: 'icon',
            icon: <Trash2 />,
            function: removeThisNote,
            className: 'removeNote'
        }
    ]

    const titleRef = useRef()
    const textareaRef = useRef()

    const focus = () => titleRef.current.value === '' ? titleRef.current.focus() : null
    
    useEffect(()=>{
        titleRef.current.value = props.title
        textareaRef.current.value = props.body
        focus()
    })
    
    const updateNote = () => {
        let date = new Date()
        let formattedDate = date.toDateString()
        props.setNote(props.id, titleRef.current.value, textareaRef.current.value, formattedDate, props.name)
    }

    return (
        <div className={styles.noteEditor}>
            {deleteNote ? <Redirect to={`/journals/${props.currentBook}/${props.currentSection}/${props.currentSlot}`} /> : null}
            <Header type="editor" items={headerItems} edited={props.edited} />
            <div className={styles.noteArea}>
                <div className={styles.textArea}>
                    <input onChange={updateNote} placeholder="Title" type="text" className={styles.textAreaTitle} ref={titleRef} />
                    <p className={styles.date}>Created on {props.date}</p>
                    <textarea onChange={updateNote} ref={textareaRef} placeholder="What's on your mind?" />
                </div>
            </div>
        </div>
    )
}

export default NoteEditor