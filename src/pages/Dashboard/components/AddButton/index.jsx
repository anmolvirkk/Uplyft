import React from 'react'
import styles from './_addbutton.module.sass'

const AddButton = ({name, journalData, setJournalData, currentBook, currentSection}) => {
  
    let date = new Date()
    let formattedDate = date.toDateString()

    const section = currentSection==='notes' ? 0 : currentSection==='tasks' ? 1 : 2

    const slot = {
        id: journalData ? journalData[currentBook].sections[section].slots.length : 0,
        title: '',
        date: formattedDate,
        subsections: [
            {
                name: 'brain dump',
                color: '#E4EE90',
                id: 0,
                data: []
            },
            {
                name: 'gratitude',
                color: '#FFC972',
                id: 1,
                data: []
            },
            {
                name: 'future',
                color: '#02D3FF',
                id: 2,
                data: []
            },
            {
                name: 'past',
                color: '#FF9B73',
                id: 3,
                data: []
            },
            {
                name: 'feelings',
                color: '#B692FE',
                id: 4,
                data: []
            },
            {
                name: 'note',
                color: '#EFF1F8',
                id: 5,
                data: []
            }
        ]
    }
    
    const addSlotSection = () => {
        journalData[currentBook].sections[section].slots.push(slot)
        setJournalData([...journalData])
    }

    return <button onClick={addSlotSection} className={styles.addButton}><p>add {name}</p><span>+</span></button>
}

export default AddButton