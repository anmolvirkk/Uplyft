import React from 'react'
import styles from './_addbutton.module.sass'
import {Plus} from 'react-feather'
import { Redirect } from 'react-router'

import {useRecoilState, useSetRecoilState} from 'recoil'

import modalConfigAtom from '../../../../recoil-atoms/modalConfigAtom'
import openModal from '../../../../functions/openModal'
import company from '../../../../../../company'

import { openBookAtom, openSlotAtom, slotsAtom, allRoutesAtom } from '../../../../allAtoms'

const AddButton = ({name}) => {
    
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)

    const [openBook] = useRecoilState(openBookAtom)

    const setModalConfig = useSetRecoilState(modalConfigAtom)
  
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

    const [openSlot, setOpenSlot] = useRecoilState(openSlotAtom)

    const addNoteSlot = () => {
        if(slots[allRoutes['book']] && slots[allRoutes['book']][allRoutes['date']]){
            setSlots({...slots, [allRoutes['book']]: {...slots[allRoutes['book']], [allRoutes['date']]: [...slots[allRoutes['book']][allRoutes['date']], slot]}})
        }else{
            setSlots({...slots, [allRoutes['book']]: {...slots[allRoutes['book']], [allRoutes['date']]: [slot]}})
        }
        setAllRoutes({...allRoutes, [allRoutes['book']]: {...allRoutes[allRoutes['book']], [allRoutes['date']]: slot.id}})
        setOpenSlot(slot.id)
    }

    const openJournalModal = () => {
        openModal({type: 'addjournal', setModalConfig: setModalConfig})
    }

    return (
        <button className={styles.addButton} id="addButton" >
            {openBook?<Redirect to={allRoutes&&allRoutes[openBook]&&allRoutes[openBook].slot?`/dashboard/${company.journals}/${openBook}/${allRoutes['date']}/${allRoutes[openBook].slot}`:`/dashboard/${company.journals}/${openBook}/${allRoutes['date']}`} />:null}
            {openSlot?<Redirect to={`/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${openSlot}`} />:null}
            <div className={styles.clickButton} onClick={name==='journal'?openJournalModal:addNoteSlot}><p>Add {name}</p><Plus /></div>
        </button>
    )
}

export default AddButton