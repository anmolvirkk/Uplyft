import React, {useState} from 'react'
import data from './data'
import styles from './_journal.module.sass'
import { Redirect } from 'react-router-dom'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'
import Modal from './components/Modal'

const Journals = () => {

    const [currentBook, setCurrentBook] = useState(0)
    const [currentSection, setCurrentSection] = useState('notes')
    const [currentSlot, setCurrentSlot] = useState(0)
    const [journalData, setJournalData] = useState(data)
    const [modalConfig, setModalConfig] = useState({open: false, current: '', id: null, journalData: null, setJournalData: null})

    const openModal  = ({...props}) => {
        setModalConfig({open: true, current: props.title === '' ? props.date : props.title, id: props.id,journalData: props.journalData, setJournalData: props.setJournalData})
    }

        return (
        <div style={{display: 'flex'}}>

            <Redirect from="/journals" to={`/journals/${currentBook}/${currentSection}/${currentSlot}`} />
            <Redirect from={`/journals/${currentBook}/${currentSection}`} to={`/journals/${currentBook}/${currentSection}/${currentSlot}`} />

            <BookSection styles={styles} journalData={journalData} setJournalData={setJournalData} setCurrentBook={setCurrentBook} currentBook={currentBook} />

            <SlotsSection openModal={openModal} styles={styles} journalData={journalData} setJournalData={setJournalData} currentBook={currentBook} currentSection={currentSection} setCurrentSection={setCurrentSection} setCurrentSlot={setCurrentSlot} currentSlot={currentSlot} />

            <MainSection styles={styles} journalData={journalData} currentBook={currentBook} currentSection={currentSection} currentSlot={currentSlot} setJournalData={setJournalData} />

            {modalConfig.open ? <Modal setModalConfig={setModalConfig} currentBook={currentBook} currentSection={currentSection} current={modalConfig.current} id={modalConfig.id} journalData={modalConfig.journalData} setJournalData={modalConfig.setJournalData} /> : null}
        </div>
    )
}

export default Journals