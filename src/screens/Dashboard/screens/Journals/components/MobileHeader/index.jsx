import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, ArrowLeft, MoreVertical} from 'react-feather'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../company'
import modalConfigAtom from '../../../../recoil-atoms/modalConfigAtom'
import { notesDropDownAtom, openSlotAtom, slotsAtom, allRoutesAtom, currentMobileSectionAtom } from '../../../../allAtoms'
import settingsAtom from '../../../../components/Settings/settingsAtom'

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
    const setNotesDropDown = useSetRecoilState(notesDropDownAtom)
    const [redirect, setRedirect] = useState(false)


    const animateToSectionHideCalendar = (from, to) => {
        document.getElementById(to).style.zIndex = 99
        document.getElementById(from).style.zIndex = 1
        document.getElementById(from).style.position = 'absolute'
        document.getElementById(from).style.top = '160px'
        document.getElementById(to).style.position = 'static'
        document.getElementById(to).style.display = 'flex'
        document.getElementById('journalCalendar').style.position = 'absolute'
        document.getElementById('journalCalendar').style.top = '60px'
        setTimeout(()=>{
            document.getElementById(from).style.transform = 'translateX(-100%)'
            document.getElementById('journalCalendar').style.transform = 'translateX(-100%)'
            document.getElementById(to).style.transform = 'translateX(0%)'
            document.getElementById(to).style.zIndex = 1
            setTimeout(()=>{
                document.getElementById(from).style.display = 'none'
                document.getElementById(to).style.zIndex = 1
                document.getElementById('journalCalendar').style.display = 'none'
            }, 200)
        }, 50)
    }

    
    const animateToSectionShowCalendar = (from, to) => {
        document.getElementById(to).style.zIndex = 99
        document.getElementById(from).style.zIndex = 1
        document.getElementById(from).style.position = 'absolute'
        document.getElementById(from).style.top = '60px'
        document.getElementById('journalCalendar').style.position = 'static'
        document.getElementById('journalCalendar').style.display = 'flex'
        document.getElementById(to).style.position = 'static'
        document.getElementById(to).style.display = 'flex'
        setTimeout(()=>{
            document.getElementById(from).style.transform = 'translateX(-100%)'
            document.getElementById('journalCalendar').style.transform = 'translateX(0%)'
            document.getElementById(to).style.transform = 'translateX(0%)'
            setTimeout(()=>{
                document.getElementById(from).style.display = 'none'
                document.getElementById(to).style.zIndex = 1
            }, 200)
        }, 50)
    }

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
                animateToSectionHideCalendar('journalSideSection', 'bookSection')
                setCurrentMobileSection(0)
            }
        },
        {
            title: 'Notes',
            onAdd: ()=>{
                setNotesDropDown(true)
            },
            onBack: ()=>{
                animateToSectionShowCalendar('journalMainSection', 'journalSideSection')
                setCurrentMobileSection(1)
            }
        },
        {
            title: 'Editor',
            onAdd: null,
            onBack: ()=>{
                let falseRedirect = async () => {
                    setRedirect(false)
                }
                let trueRedirect = async () => {
                    setRedirect(true)
                }
                falseRedirect().then(()=>{
                    trueRedirect().then(()=>{
                        setCurrentMobileSection(2)
                        setRedirect(false)
                    })
                })
            }
        }
    ]

    const [settings, setSettings] = useRecoilState(settingsAtom)

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                {currentMobileSection===0?null:<ArrowLeft onMouseDown={sections[currentMobileSection].onBack} />}
                <p>{sections[currentMobileSection].title}</p>
            </div>
            <div className={styles.options}>
                {sections[currentMobileSection].onAdd?<Plus onMouseDown={sections[currentMobileSection].onAdd} />:null}
                <div className={styles.moremenu} onMouseDown={()=>setSettings(!settings)} id='settingsBtn'>
                    <MoreVertical />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
