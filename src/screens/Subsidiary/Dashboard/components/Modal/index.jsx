import React, {useRef, useState} from 'react'
import styles from './_modal.module.sass'
import {X} from 'react-feather'

import {useRecoilState, useSetRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import slotsAtom from '../../screens/Journals/recoil-atoms/slotsAtom'
import allPromptsAtom from '../../screens/Journals/recoil-atoms/allPromptsAtom'
import booksAtom from '../../screens/Journals/recoil-atoms/booksAtom'

import { colors } from '../../variables/journalConfig'

import modalConfigAtom from '../../screens/Journals/recoil-atoms/modalConfigAtom'
import openBookAtom from '../../screens/Journals/recoil-atoms/openBookAtom'

import AddHabit from './components/AddHabit'
import AddTask from './components/AddTask'
import AddProject from './components/AddProject'
import AddEvent from './components/AddEvent'

import { iconsSvg } from '../../variables/journalConfig'
import InputBox from '../../../Auth/components/InputBox'
import { windowHeight } from '../../variables/mobileHeights'

const Modal = () => {

    const setAllRoutes = useSetRecoilState(allRoutesAtom)
    const setOpenBook = useSetRecoilState(openBookAtom)

    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)
    const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)
    const [books, setBooks] = useRecoilState(booksAtom)

    const closeModal = (e) => {
        const modalForm = document.getElementById('modalForm');
        if(modalForm){
            if (!modalForm.contains(e.target)) {
                setModalConfig({type: ''})
            }
        }
    }

    let currentSlotTitle
    if(slots&&slots[allRoutes['book']]&&slots[allRoutes['book']][allRoutes['date']]){

        slots[allRoutes['book']][allRoutes['date']].forEach((item)=>{
            if(item.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                currentSlotTitle = item.title
            }
        })

    }

    const renameText = useRef(currentSlotTitle)
    const setRenameText = (val) => {
        renameText.current = val
    }

    const renameEntry = () => {
        let newSlots = slots[allRoutes['book']][allRoutes['date']].map((data)=>{
            let newData = {...data}
            if(data.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                newData.title = renameText.current
            }
            return newData
        })
        setSlots({...slots, [allRoutes['book']]: {[allRoutes['date']]: [...newSlots]}})
        setModalConfig({type: ''})
    }

    const RenameEntry = () => (
        <div className={`${styles.form} ${styles.renameEntry}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Rename Entry</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <InputBox wrapper='modalContainer' value={renameText.current} name="Entry Name" type="text" onChange={e=>setRenameText(e.target.value)} />
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={renameEntry}>Continue</button>
                </div>
        </div>
    )

    const journalDetail = useRef({color: 0, icon: 0})

    const updateJournalDetails =  {
        color: (num) => {
            journalDetail.current.color = num
            for(let i=0; i<document.getElementById('journalColors').children.length; i++){
                if(i === num){
                    document.getElementById('journalColors').children[i].children[0].className = styles.activeButton
                }else{
                    document.getElementById('journalColors').children[i].children[0].classList.remove(styles.activeButton)
                }
            }
        },
        icon: (num) => {
            journalDetail.current.icon = num
            for(let i=0; i<document.getElementById('journalIcons').children.length; i++){
                if(i === num){
                    document.getElementById('journalIcons').children[i].children[0].className = styles.activeButton
                }else{
                    document.getElementById('journalIcons').children[i].children[0].classList.remove(styles.activeButton)
                }
            }

        }
    }

    const editJournal = () => {
        let newBooks = books.map((data)=>{
            let newData = {...data}
                if(data.id === allRoutes['book']) {
                    newData.icon = journalDetail.current.icon
                    newData.color = colors[journalDetail.current.color]
                }
            return newData
        })
        setBooks([...newBooks])
        setModalConfig({type: ''})
    }

    const EditJournal = () => (
        <div className={`${styles.form} ${styles.addHabit} ${styles.habitCustomize}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Edit Journal</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.editJournal}>
                    <ul>
                        <li>
                            <p>Color</p>
                            <ol className={styles.colors} id='journalColors'>
                                {colors.map((color, i)=><li className="colorButtons" onMouseDown={()=>updateJournalDetails.color(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===journalDetail.current.color ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol id='journalIcons'>
                                {iconsSvg.map((icon, i)=>{
                                    return <li className="iconButtons" onMouseDown={()=>updateJournalDetails.icon(i)} key={i}><div className={i===journalDetail.current.icon ? styles.activeButton : null} />{icon}</li>
                                })}
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


    const addJournal = () => {
        let date = new Date()

        let newBook = {
            id: date.valueOf(),
            icon: journalDetail.current.icon,
            color: colors[journalDetail.current.color]
        }

        setBooks([...books, newBook])

        let bookObj = {}
        const bookObjSet = async () => {
            bookObj[newBook.id] = {}
            bookObj[newBook.id][allRoutes['date']] = null
        }
        bookObjSet().then(()=>{
            setAllRoutes({...allRoutes, book: newBook.id ,...bookObj})
            setOpenBook(newBook.id)
            setModalConfig({type: ''})
        })

    }

    const AddJournal = () => (
        <div className={`${styles.form} ${styles.addHabit} ${styles.habitCustomize} ${styles.addJournal}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Add Journal</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.editJournal}>
                    <ul>
                        <li>
                            <p>Color</p>
                            <ol className={styles.colors} id='journalColors'>
                                {colors.map((color, i)=><li className="colorButtons" onMouseDown={()=>updateJournalDetails.color(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===journalDetail.current.color ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol id='journalIcons'>
                                {iconsSvg.map((icon, i)=>{
                                    return <li className="iconButtons" onMouseDown={()=>updateJournalDetails.icon(i)} key={i}><div className={i===journalDetail.current.icon ? styles.activeButton : null} />{icon}</li>
                                })}
                            </ol>
                        </li>   
                    </ul>
                </div>
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={addJournal}>Continue</button>
                </div>
            </div>
    )


    const newPrompt = useRef('')
    const setNewPrompt = (val) => {
        newPrompt.current = val
    }

    const addPrompt = () => {
        
        for(let key in allPrompts){
            if(key === modalConfig.category.replace(/\s/g, "")){
                let prompts = allPrompts[key]
                setAllPrompts({...allPrompts, [key]: [...prompts, newPrompt.current]})
            }
        }
        modalConfig.updatePrompt(newPrompt.current)
        setModalConfig({type: ''})

    }

    const AddPrompt = () => (
        <div className={`${styles.form} ${styles.renameEntry}`} id='modalForm'>
            <div className={styles.header}>
                <p>Add Prompt</p>
                <X onClick={()=>setModalConfig({type: ''})} />
            </div>
            <InputBox  wrapper='modalContainer' name="Enter Prompt" type="text" onChange={e=>setNewPrompt(e.target.value)} />
            <div className={styles.footer}>
                <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                <button className={styles.continueBtn} onClick={addPrompt}>Continue</button>
            </div>
        </div>
    )

    const [editPromptPlaceholder, setEditPromptPlaceholder] = useState('Enter Prompt')

    const editedPrompt = useRef(modalConfig.current)
    const setEditedPrompt = (val) => {
        editedPrompt.current = val
    }

    const editPrompt = () => {
        if(editedPrompt.current.replace(/\s/g, "") !== ''){

            let newPrompts = allPrompts[modalConfig.category.replace(/\s/g, "")].map((data)=>{
                let newData = data
                if(modalConfig.current === data){
                    newData = editedPrompt.current
                }
                return newData
            })

            
            setAllPrompts({...allPrompts, [modalConfig.category.replace(/\s/g, "")]: [...newPrompts]})
            modalConfig.updatePrompt(editedPrompt.current)
            setModalConfig({type: ''})
            setEditPromptPlaceholder('Enter Prompt')

        }else{
            setEditPromptPlaceholder('Prompt Cannot Be Empty')
        }
    }

    const EditPrompt = () => (
        <div className={`${styles.form} ${styles.renameEntry}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Edit Prompt</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <InputBox  wrapper='modalContainer' value={editedPrompt.current} name={editPromptPlaceholder} type="text" onChange={e=>setEditedPrompt(e.target.value)} />
                <div className={styles.footer}>
                    <button onClick={()=>setModalConfig({type: ''})} className={styles.cancelBtn}>Cancel</button>
                    <button className={styles.continueBtn} onClick={editPrompt}>Continue</button>
                </div>
            </div>
    )

    return (
        <div className={`${styles.modal} ${modalConfig.type === 'addEvent'||modalConfig.type === 'editEvent'?styles.addEvent:null}`} onMouseDown={(e)=>closeModal(e)}>
            <div className={styles.modalContainer} id='modalContainer' style={{height: window.innerHeight+'px'}}>
                <div className={styles.modalWrapper} style={{height: windowHeight+'px'}}>
                    {modalConfig.type === 'addjournal' ? 
                    <AddJournal /> 
                    : modalConfig.type === 'entry' ? 
                    <RenameEntry /> 
                    : modalConfig.type === 'journal' ?
                    <EditJournal />
                    : modalConfig.type === 'prompt' ?
                    <AddPrompt />
                    : modalConfig.type === 'editprompt' ?
                    <EditPrompt />
                    : modalConfig.type === 'addhabit' ?
                    <AddHabit icons={iconsSvg} type="add" currentHabit={null} />
                    : modalConfig.type === 'edithabit' ?
                    <AddHabit icons={iconsSvg} type="edit" currentHabit={modalConfig.habit} />
                    : modalConfig.type === 'addTask' ?
                    <AddTask icons={iconsSvg} type="add" currentTask={null} />
                    : modalConfig.type === 'editTask' ?
                    <AddTask icons={iconsSvg} type="edit" currentTask={modalConfig.task} currentActiveTask={modalConfig.activeTask} />
                    : modalConfig.type === 'addProject' ?
                    <AddProject icons={iconsSvg} type="add" currentTask={null} />
                    : modalConfig.type === 'editProject' ?
                    <AddProject icons={iconsSvg} type="edit" currentProject={modalConfig.project} />
                    : modalConfig.type === 'addEvent' ?
                    <AddEvent icons={iconsSvg} type="add" currentEvent={null} />
                    : modalConfig.type === 'editEvent' ?
                    <AddEvent icons={iconsSvg} type="edit" currentEvent={modalConfig.event} />
                    : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal