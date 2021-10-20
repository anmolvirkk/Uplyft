import React, {useState} from 'react'
import styles from './_modal.module.sass'
import {X} from 'react-feather'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'

import {useRecoilState} from 'recoil'
import allRoutesAtom from '../../screens/Journals/recoil-atoms/allRoutesAtom'
import slotsAtom from '../../screens/Journals/recoil-atoms/slotsAtom'
import allPromptsAtom from '../../screens/Journals/recoil-atoms/allPromptsAtom'
import booksAtom from '../../screens/Journals/recoil-atoms/booksAtom'

import { colors, icons } from '../../screens/Journals/variables/journalConfig'

import modalConfigAtom from '../../screens/Journals/recoil-atoms/modalConfigAtom'

const Modal = () => {

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
    
    document.addEventListener('mouseup', function(e) {
        const modalForm = document.getElementById('modalForm');
        if(modalForm){
            if (!modalForm.contains(e.target)) {
                setModalConfig({type: ''})
            }
        }
    });

    let currentSlotTitle
    if(slots&&slots[allRoutes['book']]){

        slots[allRoutes['book']].forEach((item)=>{
            if(item.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                currentSlotTitle = item.title
            }
        })

    }

    const [renameText, setRenameText] = useState(currentSlotTitle)

    const renameEntry = () => {
        let newSlots = slots[allRoutes['book']].map((data)=>{
            let newData = {...data}
            if(data.id === allRoutes[allRoutes['book']][allRoutes['date']]){
                newData.title = renameText
            }
            return newData
        })
        setSlots({...slots, [allRoutes['book']]: newSlots})
        setModalConfig({type: ''})
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

    const [newPrompt, setNewPrompt] = useState('')

    const addPrompt = () => {
        
        for(let key in allPrompts){
            if(key === modalConfig.category.replace(/\s/g, "")){
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