import React, {useEffect, useRef} from 'react'
import Header from '../../../components/Header'
import {List, Bold, Underline, Image, Maximize2} from 'react-feather'

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
        icon: <Maximize2 />
    }
]

const NoteEditor = ({styles}) => {

    const textareaRef = useRef()

    useEffect(()=>{
        textareaRef.current.focus()
    })

    return (
        <div className={styles.noteEditor}>
            <Header type="editor" items={headerItems} />
            <div className={styles.noteArea}>
                <textarea ref={textareaRef} />
            </div>
        </div>
    )
}

export default NoteEditor