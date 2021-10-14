import React, {useState} from 'react'
import styles from './_modal.module.sass'
import {X} from 'react-feather'

const Modal = ({current, id, journalData, setJournalData, currentBook, currentSection, setModalConfig, modalConfig, colors, icons, currentDate, allPrompts, setAllPrompts}) => {

    
    
    document.addEventListener('mouseup', function(e) {
        const modalForm = document.getElementById('modalForm');
        if(modalForm){
            if (!modalForm.contains(e.target)) {
                setModalConfig({type: ''})
            }
        }
    });

    const [renameText, setRenameText] = useState(current)

    const renameEntry = () => {
        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
                    props.dates.forEach((date)=>{
                        if(date.date.toDateString() === currentDate.toDateString()){
                            date.sections.forEach((props2)=>{
                                
                                if(currentSection === 'notes'){
            
                                    if(props2.slots.length > 0){
            
                                        props2.slots.forEach((props3)=>{
            
                                            if(id === props3.id){
                                                
                                                props3.title = renameText
                                                setJournalData([...journalData])
                                                setModalConfig({type: ''})
                                            }
            
                                        })
            
                                    }
            
                                }
            
                            })
                        }
                    })
                }
            })
        }
    }

    const RenameEntry = () => (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>Rename Entry</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.renameEntry}>
                    <input autoFocus type="text" placeholder='Entry Name' value={renameText} onChange={e => setRenameText(e.target.value)} />
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={renameEntry}>Continue</button>
                </div>
        </div>
    )

    const [journalColor, setJournalColor] = useState(0)
    const [journalIcon, setJournalIcon] = useState(0)

    const editJournal = () => {
        journalData.forEach((props)=>{
            if(props.id === currentBook) {
                props.icon = icons[journalIcon]
                props.color = colors[journalColor]
                setJournalData([...journalData])
                setModalConfig({type: ''})
            }
        })
    }

    const EditJournal = () => (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>Edit Journal</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.editJournal}>
                    <ul>
                        <li>
                            <p>Color</p>
                            <ol className={styles.colors}>
                                {colors.map((color, i)=><li className="colorButtons" onClick={()=>setJournalColor(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div className={i===journalColor ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol>
                                {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setJournalIcon(i)} key={i} id={`icon${i}`}><div className={i===journalIcon ? styles.activeButton : null} />{icon}</li>)}
                            </ol>
                        </li>   
                    </ul>
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={editJournal}>Continue</button>
                </div>
            </div>
    )

    const [newPrompt, setNewPrompt] = useState('')

    const addPrompt = () => {
        
        for(let key in allPrompts){
            if(key === modalConfig.name.replace(/\s/g, "")){
                let prompts = allPrompts[key]
                let newPrompts = [...prompts, newPrompt]
                allPrompts[key] = newPrompts
            }
        }

        setAllPrompts({...allPrompts})
        modalConfig.updatePrompt(newPrompt)
        setModalConfig({type: ''})

    }

    const AddPrompt = () => (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>Add Prompt</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.renameEntry}>
                    <input autoFocus type="text" placeholder='Enter Prompt' value={newPrompt} onChange={e => setNewPrompt(e.target.value)} />
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={addPrompt}>Continue</button>
                </div>
            </div>
    )

    const [editedPrompt, setEditedPrompt] = useState(modalConfig.current)
    const [editPromptPlaceholder, setEditPromptPlaceholder] = useState('Enter Prompt')

    const editPrompt = () => {
        if(editedPrompt.replace(/\s/g, "") !== ''){
            
            for(let key in allPrompts){
                if(key === modalConfig.name.replace(/\s/g, "")){
                    let prompts = allPrompts[key]
                    prompts.forEach((item, index)=>{
                        if(item === modalConfig.current){
                            allPrompts[key][index] = editedPrompt
                        }
                    })
                }
            }
            
            setAllPrompts({...allPrompts})
            modalConfig.updatePrompt(editedPrompt)
            setModalConfig({type: ''})
            setEditPromptPlaceholder('Enter Prompt')

        }else{
            setEditPromptPlaceholder('Prompt Cannot Be Empty')
        }
    }

    const EditPrompt = () => (
        <div className={styles.form} id='modalForm'>
                <div className={styles.header}>
                    <p>Edit Prompt</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.renameEntry}>
                    <input autoFocus type="text" placeholder={editPromptPlaceholder} value={editedPrompt} onChange={e => setEditedPrompt(e.target.value)} />
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={editPrompt}>Continue</button>
                </div>
            </div>
    )

    return (
        <div className={styles.modal}>
            {modalConfig.type === 'entry' ? 
            <RenameEntry /> 
            : modalConfig.type === 'journal' ?
            <EditJournal />
            : modalConfig.type === 'prompt' ?
            <AddPrompt />
            : modalConfig.type === 'editprompt' ?
            <EditPrompt />
            : null
            }
        </div>
    )
}

export default Modal