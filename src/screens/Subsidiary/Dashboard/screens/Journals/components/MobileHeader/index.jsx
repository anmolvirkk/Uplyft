import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, ArrowLeft} from 'react-feather'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import currentMobileSectionAtom from '../../recoil-atoms/currentMobileSectionAtom'
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import slotsAtom from '../../recoil-atoms/slotsAtom'
import openSlotAtom from '../../recoil-atoms/openSlotAtom'
import MoreMenu from '../../../../components/MoreMenu'
import OutsideClickHandler from 'react-outside-click-handler-lite/build/OutsideClickHandler'
import { noteCategories } from '../../../../variables/noteCategories'
import notesAtom from '../../recoil-atoms/notesAtom'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'

const MobileHeader = () => {
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [currentMobileSection, setCurrentMobileSection] = useRecoilState(currentMobileSectionAtom)


    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)
  
    let date = new Date()

    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const slot = {
        id: date.valueOf(),
        title: '',
        time: formatAMPM(date)
    }

    const setOpenSlot = useSetRecoilState(openSlotAtom)

    const [notesDropDown, setNotesDropDown] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const sections = [
        {
            title: 'Journals',
            onAdd: ()=>{
                setModalConfig({type: 'addjournal'})
            },
            onBack: null,
        },
        {
            title: 'Entries',
            onAdd: ()=>{
                if(slots[allRoutes['book']] && slots[allRoutes['book']][allRoutes['date']]){
                    setSlots({...slots, [allRoutes['book']]: {...slots[allRoutes['book']], [allRoutes['date']]: [...slots[allRoutes['book']][allRoutes['date']], slot]}})
                }else{
                    setSlots({...slots, [allRoutes['book']]: {...slots[allRoutes['book']], [allRoutes['date']]: [slot]}})
                }
                setAllRoutes({...allRoutes, [allRoutes['book']]: {...allRoutes[allRoutes['book']], [allRoutes['date']]: slot.id}})
                setOpenSlot(slot.id)
            },
            onBack: ()=>{
                document.getElementById('bookSection').style.transform = 'translateX(0%)'
                document.getElementById('journalSideSection').style.transform = 'translateX(-100%)'
                setCurrentMobileSection(0)
            }
        },
        {
            title: 'Notes',
            onAdd: ()=>{
                setNotesDropDown(true)
            },
            onBack: ()=>{
                document.getElementById('journalSideSection').style.transform = 'translateX(0%)'
                document.getElementById('journalMainSection').style.transform = 'translateX(-100%)'
                document.getElementById('journalCalendar').style.transform = 'translateX(-100%)'
                setCurrentMobileSection(1)
            }
        },
        {
            title: 'Editor',
            onAdd: null,
            onBack: ()=>{
                document.getElementById('journalCalendar').style.transform = 'translateX(0%)'
                setCurrentMobileSection(2)
                let falseRedirect = async () => {
                    setRedirect(false)
                }
                let trueRedirect = async () => {
                    setRedirect(true)
                }
                let hideSection = async () => {
                    document.getElementById('journalMainSection').style.transform = 'translateX(-100%)'
                }
                hideSection().then(()=>{
                    setTimeout(()=>{
                        document.getElementById('journalMainSection').style.transform = 'translateX(0%)'
                        falseRedirect().then(()=>{
                            trueRedirect().then(()=>{
                                setRedirect(false)
                            })
                        })
                    }, 300)
                })
            }
        }
    ]
    
    const [notes, setNotes] = useRecoilState(notesAtom)
    
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

    const addNoteDropDown = (category) => {
        addNote(category)
        setNotesDropDown(false)
    }

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                {currentMobileSection===0?null:<ArrowLeft onMouseDown={sections[currentMobileSection].onBack} />}
                <p>{sections[currentMobileSection].title}</p>
            </div>
            <div className={styles.options}>
                {sections[currentMobileSection].onAdd?<Plus onMouseDown={sections[currentMobileSection].onAdd} />:null}
                <MoreMenu items={[{name: "Dark Mode", function: null}, {name: "Logout", function: null}]} pos={{right: '-1.75vh', top: '3.5vh'}} />
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
    )
}

export default MobileHeader
