import React, {useState} from 'react'
import styles from './_addbutton.module.sass'
import {ArrowUp, Plus} from 'react-feather'
import { Redirect } from 'react-router'
import {Activity, AlertTriangle, Anchor, Aperture, Archive, Award, BarChart, BatteryCharging, Bell, Book, Box, Briefcase, Camera, Clock, CloudLightning, Code, Coffee, Command, Compass, Crosshair, DollarSign, Droplet, Dribbble, Eye, Feather, Flag, GitHub, Gitlab, Globe, Grid, Hash, Headphones, Heart, Key, LifeBuoy, Map, Moon, Smile, Sun, Star} from 'react-feather'

const AddButton = ({name, colors, icons, books, setBooks, slots, setSlots, allRoutes, setAllRoutes, currentDate}) => {
    
    const [journalTabOpen, setJournalTabOpen] = useState(false)
  
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

    const [openSlot, setOpenSlot] = useState()

    const addNoteSlot = () => {
        if(slots[allRoutes['book']]){
            slots[allRoutes['book']].push(slot)
            setSlots({...slots})
        }else{
            slots[allRoutes['book']] = []
            slots[allRoutes['book']].push(slot)
            setSlots({...slots})
        }
        
        allRoutes[allRoutes['book']] = {slot: slot.id}
        setAllRoutes({...allRoutes})
        setOpenSlot(slot.id)
    }

    const [journalColor, setJournalColor] = useState(0)
    const [journalIcon, setJournalIcon] = useState(0)

    const [openBook, setOpenBook] = useState()

    const addBook = () => {
        let newBook = {
            id: date.valueOf(),
            icon: icons[journalIcon],
            color: colors[journalColor]
        }
        books.push(newBook)
        setBooks([...books])
        setJournalTabOpen(false)

        allRoutes[newBook.id] = {}
        allRoutes['book'] = newBook.id
        setAllRoutes({...allRoutes})
        setOpenBook(newBook.id)
    }

    const iconsSvg = [<Activity />, <AlertTriangle />, <Anchor />, <Aperture />, <Archive />, <Award />, <BarChart />, <BatteryCharging />, <Bell />, <Book />, <Box />, <Briefcase />, <Camera />, <Clock />, <CloudLightning />, <Code />, <Coffee />, <Command />, <Compass />, <Crosshair />, <DollarSign />, <Droplet />, <Dribbble />, <Eye />, <Feather />, <Flag />, <GitHub />, <Gitlab />, <Globe />, <Grid />, <Hash />, <Headphones />, <Heart />, <Key />, <LifeBuoy />, <Map />, <Moon />, <Smile />, <Sun />, <Star />]
    
    const selectIcon = (name) => {

        return iconsSvg.map((icon, index)=>{
            if(icon.type.render.displayName === name){
                return <span style={{height: '100%', width: '100%'}} key={index}>{iconsSvg[index]}</span>
            }
            return null
        })

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
                        {icons.map((icon, i)=><li className="iconButtons" onClick={()=>setJournalIcon(i)} key={i} id={`icon${i}`}><div className={i===journalIcon ? styles.activeButton : null} />{selectIcon(icon)}</li>)}
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

    const journalClick = journalTabOpen ? addBook : openJournalTab

    const text = name==='journal' ? <div onClick={journalClick} className={styles.clickButton}><p>Add {name}</p>{journalButtonIcon}</div> : <div className={styles.clickButton} onClick={addNoteSlot}><p>Add {name}</p><Plus /></div>

    return (
        <button className={styles.addButton} id="addButton" >
            {openBook?<Redirect to={allRoutes&&allRoutes[openBook]&&allRoutes[openBook].slot?`/journals/${openBook}/${currentDate.valueOf()}/${allRoutes[openBook].slot}`:`/journals/${openBook}/`} />:null}
            {openSlot?<Redirect to={`/journals/${allRoutes['book']}/${currentDate.valueOf()}/${openSlot}`} />:null}
            {text}
            {journalTabOpen ? <JournalTab /> : null}
        </button>
    )
}

export default AddButton