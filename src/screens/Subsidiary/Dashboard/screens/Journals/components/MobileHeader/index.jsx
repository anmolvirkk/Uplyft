import React from 'react'
import styles from './_mobileHeader.module.sass'
import {MoreVertical, Plus, ArrowLeft} from 'react-feather'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import currentMobileSectionAtom from '../../recoil-atoms/currentMobileSectionAtom'
import allRoutesAtom from '../../recoil-atoms/allRoutesAtom'
import slotsAtom from '../../recoil-atoms/slotsAtom'
import openSlotAtom from '../../recoil-atoms/openSlotAtom'

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
                setModalConfig({type: ''})
            },
            onBack: ()=>{
                document.getElementById('bookSection').style.transform = 'translateX(0%)'
                document.getElementById('journalSideSection').style.transform = 'translateX(-100%)'
                setCurrentMobileSection(0)
            }
        }
    ]

    return (
        <div className={styles.header}>
            <div className={styles.options}>
                <ArrowLeft onMouseDown={sections[currentMobileSection].onBack} />
                <p>{sections[currentMobileSection].title}</p>
            </div>
            <div className={styles.options}>
                <Plus onMouseDown={sections[currentMobileSection].onAdd} />
                <MoreVertical />
            </div>
        </div>
    )
}

export default MobileHeader
