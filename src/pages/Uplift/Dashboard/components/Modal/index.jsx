import React, {useState} from 'react'
import styles from './_modal.module.sass'
import {X} from 'react-feather'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'


import {useRecoilState, useSetRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import slotsAtom from '../../screens/Journals/recoil-atoms/slotsAtom'
import allPromptsAtom from '../../screens/Journals/recoil-atoms/allPromptsAtom'
import booksAtom from '../../screens/Journals/recoil-atoms/booksAtom'

import { colors, icons } from '../../variables/journalConfig'

import modalConfigAtom from '../../screens/Journals/recoil-atoms/modalConfigAtom'
import openBookAtom from '../../screens/Journals/recoil-atoms/openBookAtom'

import AddHabit from './components/AddHabit'
import AddTask from './components/AddTask'
import AddProject from './components/AddProject'
import AddEvent from './components/AddEvent'

const Modal = () => {

    const setAllRoutes = useSetRecoilState(allRoutesAtom)
    const setOpenBook = useSetRecoilState(openBookAtom)

    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)

    const [allRoutes] = useRecoilState(allRoutesAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)
    const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)
    const [books, setBooks] = useRecoilState(booksAtom)

    const iconsSvg = [<Activity />, <AlertTriangle />, <Anchor />, <Aperture />, <Archive />, <Award />, <BarChart />, <BatteryCharging />, <Bell />, <Book />, <Box />, <Briefcase />, <Camera />, <Clock />, <CloudLightning />, <Code />, <Coffee />, <Command />, <Compass />, <Crosshair />, <DollarSign />, <Droplet />, <Dribbble />, <Eye />, <Feather />, <Flag />, <GitHub />, <Gitlab />, <Globe />, <Grid />, <Hash />, <Headphones />, <Heart />, <Key />, <LifeBuoy />, <Map />, <Moon />, <Smile />, <Sun />, <Star />]
    
    const selectIcon = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name){
                return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
            }
            return null
        })

    }

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

    const [renameText, setRenameText] = useState(currentSlotTitle)

    const renameEntry = () => {
        let newSlots = slots[allRoutes['book']][allRoutes['date']].map((data)=>{
            let newData = {...data}
            if(data.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                newData.title = renameText
            }
            return newData
        })
        setSlots({...slots, [allRoutes['book']]: {[allRoutes['date']]: [...newSlots]}})
        setModalConfig({type: ''})
    }

    const RenameEntry = () => (
        <div className={styles.form} id='modalForm' style={{minWidth: '50vh'}}>
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
        let newBooks = books.map((data)=>{
            let newData = {...data}
                if(data.id === allRoutes['book']) {
                    newData.icon = icons[journalIcon]
                    newData.color = colors[journalColor]
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
                            <ol className={styles.colors}>
                                {colors.map((color, i)=><li className="colorButtons" onClick={()=>setJournalColor(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===journalColor ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol>
                                {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setJournalIcon(i)} key={i} id={`icon${i}`}><div className={i===journalIcon ? styles.activeButton : null} />{selectIcon(icon)}</li>)}
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
            icon: icons[journalIcon],
            color: colors[journalColor]
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
        <div className={`${styles.form} ${styles.addHabit} ${styles.habitCustomize}`} id='modalForm'>
                <div className={styles.header}>
                    <p>Add Journal</p>
                    <X onClick={()=>setModalConfig({type: ''})} />
                </div>
                <div className={styles.editJournal}>
                    <ul>
                        <li>
                            <p>Color</p>
                            <ol className={styles.colors}>
                                {colors.map((color, i)=><li className="colorButtons" onClick={()=>setJournalColor(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div style={{borderColor: color}} className={i===journalColor ? styles.activeButton : null} /></li>)}
                            </ol>
                        </li> 
                        <li>
                            <p>Icon</p>
                            <ol>
                                {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setJournalIcon(i)} key={i} id={`icon${i}`}><div className={i===journalIcon ? styles.activeButton : null} />{selectIcon(icon)}</li>)}
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

    const [newPrompt, setNewPrompt] = useState('')

    const addPrompt = () => {
        
        for(let key in allPrompts){
            if(key === modalConfig.category.replace(/\s/g, "")){
                let prompts = allPrompts[key]
                setAllPrompts({...allPrompts, [key]: [...prompts, newPrompt]})
            }
        }
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

            let newPrompts = allPrompts[modalConfig.category.replace(/\s/g, "")].map((data)=>{
                let newData = data
                if(modalConfig.current === data){
                    newData = editedPrompt
                }
                return newData
            })

            
            setAllPrompts({...allPrompts, [modalConfig.category.replace(/\s/g, "")]: [...newPrompts]})
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
        <div className={`${styles.modal} ${modalConfig.type === 'addEvent'||modalConfig.type === 'editEvent'?styles.addEvent:null}`} onMouseDown={(e)=>closeModal(e)}>
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
    )
}

export default Modal