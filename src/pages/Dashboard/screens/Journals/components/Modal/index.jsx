import React, {useState} from 'react'
import styles from './_modal.module.sass'
import {X} from 'react-feather'

const Modal = ({current, id, journalData, setJournalData, currentBook, currentSection, setModalConfig}) => {

    
    
    document.addEventListener('mouseup', function(e) {
        const modalForm = document.getElementById('modalForm');
        if(modalForm){
            if (!modalForm.contains(e.target)) {
                setModalConfig({open: false})
            }
        }
    });

    const [renameText, setRenameText] = useState(current)

    const continueBtn = () => {
        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
    
                    props.sections.forEach((props2)=>{
                        
                        if(currentSection === 'notes'){
    
                            if(props2.slots.length > 0){
    
                                props2.slots.forEach((props3)=>{
    
                                    if(id === props3.id){
                                        
                                        props3.title = renameText
                                        setJournalData([...journalData])
                                        setModalConfig({open: false})
                                    }
    
                                })
    
                            }
    
                        }
    
                    })
    
                }
            })
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>Rename Entry</p>
                    <X onClick={()=>setModalConfig({open: false})} />
                </div>
                <div className={styles.renameEntry}>
                    <input type="text" placeholder='Entry Name' value={renameText} onChange={e => setRenameText(e.target.value)} />
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({open: false})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={continueBtn}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Modal