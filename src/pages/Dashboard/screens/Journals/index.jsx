import React, {useState} from 'react'
import data from './data'
import styles from './_journal.module.sass'
import { Redirect } from 'react-router-dom'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'

const Journals = () => {

    const [currentBook, setCurrentBook] = useState(0)
    const [currentSection, setCurrentSection] = useState('notes')
    const [currentSlot, setCurrentSlot] = useState(0)
    const [journalData, setJournalData] = useState(data)

        return (
        <div style={{display: 'flex'}}>

            <Redirect from="/journals" to={`/journals/${currentBook}/${currentSection}/0`} />
            <Redirect from={`/journals/${currentBook}/${currentSection}`} to={`/journals/${currentBook}/${currentSection}/0`} />

            <BookSection styles={styles} journalData={journalData} setCurrentBook={setCurrentBook} />

            <SlotsSection styles={styles} journalData={journalData} currentBook={currentBook} currentSection={currentSection} setCurrentSection={setCurrentSection} setCurrentSlot={setCurrentSlot} />

            <MainSection styles={styles} journalData={journalData} currentBook={currentBook} currentSection={currentSection} currentSlot={currentSlot} setJournalData={setJournalData} />

        </div>
    )
}

export default Journals