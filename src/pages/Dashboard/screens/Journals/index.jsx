import React, {useState} from 'react'
import data from './data'
import styles from './_journal.module.sass'
import { Redirect } from 'react-router-dom'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'
import Modal from './components/Modal'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'

const Journals = () => {

    const [currentBook, setCurrentBook] = useState(0)
    const [currentSection, setCurrentSection] = useState('notes')
    const [currentSlot, setCurrentSlot] = useState(0)
    const [journalData, setJournalData] = useState(data)
    const [modalConfig, setModalConfig] = useState({type: '', current: '', id: null, journalData: null, setJournalData: null})

    
    const colors = ['rgb(126, 217, 86)', '#A3DE83', '#28DF99', '#6DDCCF', 'rgb(155, 170, 211)', '#916BBF', '#FE8F8F', '#FF926B', '#F2A154', '#FFD36B']
    const icons = [<Activity />, <AlertTriangle />, <Anchor />, <Aperture />, <Archive />, <Award />, <BarChart />, <BatteryCharging />, <Bell />, <Book />, <Box />, <Briefcase />, <Camera />, <Clock />, <CloudLightning />, <Code />, <Coffee />, <Command />, <Compass />, <Crosshair />, <DollarSign />, <Droplet />, <Dribbble />, <Eye />, <Feather />, <Flag />, <GitHub />, <Gitlab />, <Globe />, <Grid />, <Hash />, <Headphones />, <Heart />, <Key />, <LifeBuoy />, <Map />, <Moon />, <Smile />, <Sun />, <Star />]

    const openModal  = ({...props}) => {
        switch (props.type) {
            case 'entry':
                setModalConfig({type: props.type, current: props.title === '' ? props.date : props.title, id: props.id, journalData: props.journalData, setJournalData: props.setJournalData})
            break
            case 'journal':
                setModalConfig({type: props.type, id: props.id, journalData: props.journalData, setJournalData: props.setJournalData})
            break
            default: return null
        }
    }

        return (
        <div style={{display: 'flex'}}>

            <Redirect from="/journals" to={`/journals/${currentBook}/${currentSection}/${currentSlot}`} />
            <Redirect from={`/journals/${currentBook}/${currentSection}`} to={`/journals/${currentBook}/${currentSection}/${currentSlot}`} />

            <BookSection colors={colors} icons={icons} openModal={openModal} styles={styles} journalData={journalData} setJournalData={setJournalData} setCurrentBook={setCurrentBook} currentBook={currentBook} />

            <SlotsSection openModal={openModal} styles={styles} journalData={journalData} setJournalData={setJournalData} currentBook={currentBook} currentSection={currentSection} setCurrentSection={setCurrentSection} setCurrentSlot={setCurrentSlot} currentSlot={currentSlot} />

            <MainSection colors={colors} styles={styles} journalData={journalData} currentBook={currentBook} currentSection={currentSection} currentSlot={currentSlot} setJournalData={setJournalData} />

            {modalConfig.type==='entry' ? 
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig} currentBook={currentBook} currentSection={currentSection} current={modalConfig.current} id={modalConfig.id} journalData={modalConfig.journalData} setJournalData={modalConfig.setJournalData} /> 
            : modalConfig.type==='journal' ?
            <Modal colors={colors} icons={icons} modalConfig={modalConfig} setModalConfig={setModalConfig} currentBook={currentBook} currentSection={currentSection} id={modalConfig.id} journalData={modalConfig.journalData} setJournalData={modalConfig.setJournalData} /> 
            : null}

        </div>
    )
}

export default Journals