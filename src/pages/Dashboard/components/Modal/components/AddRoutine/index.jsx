import React, {useState} from 'react'
import { X } from 'react-feather'
import { useSetRecoilState, useRecoilState } from 'recoil'
import modalConfigAtom from '../../../../screens/Journals/recoil-atoms/modalConfigAtom'
import styles from '../../_modal.module.sass'
import { Redirect } from 'react-router'

import routinesAtom from '../../../../screens/Schedule/recoil-atoms/routinesAtom'

const AddRoutine = () => {

    const setModalConfig = useSetRecoilState(modalConfigAtom)

    const [routineName, setRoutineName] = useState('')
    const [addRoutinePlaceholder, setAddRoutinePlaceholder] = useState('Add Routine')

    const [routines, setRoutines] = useRecoilState(routinesAtom)

    const [routineRedirect, setRoutineRedirect] = useState()

    const addRoutine = () => {
        let date = new Date()
        if(routineName.replace(/\s/g, "") !== ''){
            setAddRoutinePlaceholder('Add Routine')
            let newRoutine = {
                id: date.valueOf(),
                title: routineName
            }
            setRoutines([...routines, newRoutine])
            setModalConfig({type: ''})
            setRoutineRedirect(date.valueOf())
        }else{
            setAddRoutinePlaceholder('Routine name cannot be empty')
        }
    }

    return (
        <div className={styles.form} id='modalForm'>
            {routineRedirect ? <Redirect to={`/schedule/routines/${routineRedirect}`} /> : null}
            <div className={styles.header}>
                <p>Add Routine</p>
                <X onClick={()=>setModalConfig({type: ''})} />
            </div>
            <div className={styles.renameEntry}>
                <input autoFocus type="text" placeholder={addRoutinePlaceholder} value={routineName} onChange={e => setRoutineName(e.target.value)} />
            </div>
            <div className={styles.footer}>
                <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                <button className={styles.continueBtn} onClick={addRoutine}>Continue</button>
            </div>
        </div>
    )
}

export default AddRoutine