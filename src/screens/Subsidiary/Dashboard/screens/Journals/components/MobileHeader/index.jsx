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
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'
import notesDropDownAtom from '../../recoil-atoms/notesDropDownAtom'

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
                        document.getElementById('journalCalendar').style.transform = 'translateX(0%)'
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

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                {currentMobileSection===0?null:<ArrowLeft onMouseDown={sections[currentMobileSection].onBack} />}
                <p>{sections[currentMobileSection].title}</p>
            </div>
            <div className={styles.options}>
                {sections[currentMobileSection].onAdd?<Plus onMouseDown={sections[currentMobileSection].onAdd} />:null}
                <div className={styles.moremenu}>
                    <MoreMenu items={[{name: "Dark Mode", function: null}, {name: "Logout", function: null}]} pos={{right: '0', top: '6vh'}} />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
