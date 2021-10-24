import React from 'react'
import MoreMenu from '../../../../../../components/MoreMenu'
import {ArrowDown} from 'react-feather'
import journalStyles from '../../../../../Journals/_journal.module.sass'
import { NavLink } from 'react-router-dom'
import AddButton from '../../../AddButton'

import openModal from '../../../../../Journals/functions/openModal'
import modalConfigAtom from '../../../../../Journals/recoil-atoms/modalConfigAtom'

import {useRecoilState, useSetRecoilState} from 'recoil' 
import routinesAtom from '../../../../recoil-atoms/routinesAtom'

const Routines = () => {
    const [routines] = useRecoilState(routinesAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const openRoutineModal = () => {
        openModal({type: 'addroutine', setModalConfig: setModalConfig})
    }

    return (
        <div>
            <div className={journalStyles.slotSection} style={{height: 'calc(100vh - 160px)'}}>
                {routines.length!==0 ? routines.map((item)=>{
                    return <NavLink key={item.id} to={`/schedule/routines/${item.id}`} className={journalStyles.sideSectionSlot} activeClassName={journalStyles.activeSectionSlot} data-title={item.title}><p>{item.title}</p>
                    <MoreMenu items={[{name: "rename", function: null}, {name: "delete", function: null}]} id={`scheduleSlotsMoreMenu${item.id}`} pos={{right: '-3.5vh', top: '3.5vh'}} /></NavLink>
                }) : <div className={journalStyles.helperTextAddEntry}><p>Add your first entry!</p><ArrowDown /></div>}
            </div>
            <AddButton name="routine" openRoutineModal={openRoutineModal} />
        </div>
    )
}

export default Routines
