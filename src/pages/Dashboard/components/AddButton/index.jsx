import React, {useState, useEffect} from 'react'
import styles from './_addbutton.module.sass'
import {ArrowUp, Plus} from 'react-feather'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star, File, Check, Calendar} from 'react-feather'

const AddButton = ({name, journalData, setJournalData, currentBook, currentSection, setCurrentBook, setCurrentSlot}) => {
    
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

    const colors = ['rgb(126, 217, 86)', '#A3DE83', '#28DF99', '#6DDCCF', 'rgb(155, 170, 211)', '#916BBF', '#FE8F8F', '#FF926B', '#F2A154', '#FFD36B']
    const icons = [<Activity />, <AlertTriangle />, <Anchor />, <Aperture />, <Archive />, <Award />, <BarChart />, <BatteryCharging />, <Bell />, <Book />, <Box />, <Briefcase />, <Camera />, <Clock />, <CloudLightning />, <Code />, <Coffee />, <Command />, <Compass />, <Crosshair />, <DollarSign />, <Droplet />, <Dribbble />, <Eye />, <Feather />, <Flag />, <GitHub />, <Gitlab />, <Globe />, <Grid />, <Hash />, <Headphones />, <Heart />, <Key />, <LifeBuoy />, <Map />, <Moon />, <Smile />, <Sun />, <Star />]

    const [journalColor, setJournalColor] = useState(0)
    const [journalIcon, setJournalIcon] = useState(0)

    const setColors = colors.map((color, i)=><li className="colorButtons" onClick={()=>setJournalColor(i)} key={i} id={`color${i}`} style={{backgroundColor: color}}><div /></li>)
    const setIcons = icons.map((icon, i)=><li className="iconButtons" onClick={()=>setJournalIcon(i)} key={i} id={`icon${i}`}><div />{icon}</li>)

    useEffect(()=>{
        const colorButtons = document.getElementsByClassName('colorButtons')
        if(colorButtons[journalColor] !== undefined){
            colorButtons[journalColor].childNodes[0].classList.add(styles.activeButton)
        }
    }, [setColors, journalColor])
   

    useEffect(()=>{
        const iconButtons = document.getElementsByClassName('iconButtons')
        if(iconButtons[journalIcon] !== undefined){
            iconButtons[journalIcon].childNodes[0].classList.add(styles.activeButton)
        }
    }, [setIcons, journalIcon])

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
                        {setColors}
                    </ol>
                </li> 
                <li>
                    <p>Icon</p>
                    <ol>
                        {setIcons}
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