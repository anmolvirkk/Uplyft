import React, {useState} from 'react'
import styles from './_journal.module.sass'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'
import Modal from '../../components/Modal'
import SideBar from '../../components/SideBar'
import { Redirect } from 'react-router'
import Calendar from './components/Calendar'

import {useRecoilState} from 'recoil'
import allRoutesAtom from './recoil-atoms/allRoutesAtom'
import datesAtom from './recoil-atoms/datesAtom'

const Journals = () => {

    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [dates, setDates] = useRecoilState(datesAtom)

    const [modalConfig, setModalConfig] = useState({type: '', current: '', id: null, updatePrompt: null, name: null})

    const colors = ['rgb(126, 217, 86)', '#28DF99', '#6DDCCF', 'rgb(155, 170, 211)', '#916BBF', '#FE8F8F', '#FF926B', '#F2A154', '#FFD36B', '#393D46']
    const icons = ['Activity', 'AlertTriangle', 'Anchor', 'Aperture', 'Archive', 'Award', 'BarChart', 'BatteryCharging', 'Bell', 'Book', 'Box', 'Briefcase', 'Camera', 'Clock', 'CloudLightning', 'Code', 'Coffee', 'Command', 'Compass', 'Crosshair', 'DollarSign', 'Droplet', 'Dribbble', 'Eye', 'Feather', 'Flag', 'GitHub', 'Gitlab', 'Globe', 'Grid', 'Hash', 'Headphones', 'Heart', 'Key', 'LifeBuoy', 'Map', 'Moon', 'Smile', 'Sun', 'Star']

    const setDate = async () => {
        let date = new Date()

        const addDate = () => {
            setDates([...dates, date])
            if(!allRoutes['date']){
                allRoutes['date'] = date.valueOf()
            } 
            setAllRoutes({date: date.valueOf(), ...allRoutes})
        }

        if(dates.length !== 0){

            let shouldAddDate = false

            let checkShouldAddDate = async () => {

                let todaysDate = new Date()
                let storedDate = new Date(dates[dates.length - 1])

                if(todaysDate.toDateString() !== storedDate.toDateString()){
                    shouldAddDate = true
                }

            }

            checkShouldAddDate().then(()=>{
                if(shouldAddDate){
                    addDate()
                    let calendarElement = document.getElementById('journalCalendar')
                    if(calendarElement){
                        calendarElement.scrollTo(0,calendarElement.scrollHeight)
                    }
                }
            })

        }else {
            addDate()
        }

    }

    const openModal  = ({...props}) => {
        switch (props.type) {
            case 'entry':
                setModalConfig({type: props.type})
            break
            case 'journal':
                setModalConfig({type: props.type, id: props.id})
            break
            case 'prompt':
                setModalConfig({type: props.type, updatePrompt: props.updatePrompt, category: props.category})
            break
            case 'editprompt':
                setModalConfig({type: props.type, updatePrompt: props.updatePrompt, category: props.category, current: props.current})
            break
            default: return null
        }
    }
    
        return (
        <div style={{display: 'flex'}}>
            <Redirect to={Object.entries(allRoutes).length!==0?`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/journals`} />
            <SideBar />

            <BookSection setDate={setDate} colors={colors} icons={icons} openModal={openModal} styles={styles} />

            <SlotsSection setDate={setDate} openModal={openModal} styles={styles} />

            <MainSection openModal={openModal} colors={colors} styles={styles} />

            {allRoutes&&allRoutes['book']&&allRoutes[[allRoutes['book']]]?<Calendar />:null}

            {modalConfig.type==='entry' ? 
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig} /> 
            : modalConfig.type==='journal' ?
            <Modal colors={colors} icons={icons} modalConfig={modalConfig} setModalConfig={setModalConfig} /> 
            : modalConfig.type==='prompt' ?
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig} /> 
            : modalConfig.type==='editprompt' ?
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig} /> 
            : null}

        </div>
    )
}

export default Journals