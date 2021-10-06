import React, {useState} from 'react'
import styles from './_addbutton.module.sass'
import {ArrowUp, Plus, File, Check, Calendar} from 'react-feather'

const AddButton = ({name, journalData, setJournalData, currentBook, currentSection, setCurrentBook, setCurrentSlot, colors, icons}) => {
    
    const [journalTabOpen, setJournalTabOpen] = useState(false)
  
    let date = new Date()
    let formattedDate = date.toDateString()

    const slot = {
        id: date.valueOf(),
        title: '',
        date: formattedDate,
        subsections: [
            {
                name: 'brain dump',
                color: '#E4EE90',
                id: 0,
                data: []
            },
            {
                name: 'gratitude',
                color: '#FFC972',
                id: 1,
                data: []
            },
            {
                name: 'reflection',
                color: '#FF9B73',
                id: 2,
                data: []
            },
            {
                name: 'aspiration',
                color: '#02D3FF',
                id: 3,
                data: []
            },
            {
                name: 'memory',
                color: '#B692FE',
                id: 4,
                data: []
            },
            {
                name: 'note',
                color: '#EFF1F8',
                id: 5,
                data: []
            }
        ]
    }
    
    const addSlotSection = () => {

        if(journalData.length > 0){
            journalData.forEach((props)=>{
                if(currentBook === props.id){
    
                    props.sections.forEach((props2)=>{
                        
                        if(currentSection === props2.name){
    
                                props2.slots.push(slot)
                                setJournalData([...journalData])
                                setCurrentSlot(slot.id)
    
    
                        }
    
                    })
    
                }
            })
        }
    }

    const [journalColor, setJournalColor] = useState(0)
    const [journalIcon, setJournalIcon] = useState(0)

    const addJournal = () => {
        let newJournal = {
                id: date.valueOf(),
                icon: icons[journalIcon],
                color: colors[journalColor],
                sections: 
                [
                            {
                                id: 0,
                                icon: <File />,
                                name: 'notes',
                                slots: []
                            },
                            {
                                id: 1,
                                icon: <Check />,
                                name: 'tasks',
                                slots: [
                                    {
                                        id: 0,
                                        title: 'Title',
                                        body: 'loriem ipsum'
                                    }
                                ]
                            },
                            {
                                id: 2,
                                icon: <Calendar />,
                                name: 'events',
                                slots: [
                                    {
                                        id: 0,
                                        title: 'Title',
                                        body: 'loriem ipsum'
                                    }
                                ]
                            }
                ]
        }
        journalData.push(newJournal)
        setJournalData([...journalData])
        setJournalTabOpen(false)
        setCurrentBook(newJournal.id)
    }
    
    const JournalTab = () => {
        return (
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
        )
    }

    const openJournalTab = () => {
        setJournalTabOpen(true)
    }

    document.addEventListener('mouseup', function(e) {
        const addButton = document.getElementById('addButton');
        if(addButton){
            if (!addButton.contains(e.target)) {
                setJournalTabOpen(false)
            }
        }
    });
    
    const journalButtonIcon = journalTabOpen ? <Plus /> : <ArrowUp />

    const journalClick = journalTabOpen ? addJournal : openJournalTab

    const text = name==='journal' ? <div onClick={journalClick} className={styles.clickButton}><p>Add {name}</p>{journalButtonIcon}</div> : <div className={styles.clickButton} onClick={addSlotSection}><p>Add {name}</p><Plus /></div>

    return (
        <button className={styles.addButton} id="addButton" >
            {text}
            {journalTabOpen ? <JournalTab /> : null}
        </button>
    )
}

export default AddButton