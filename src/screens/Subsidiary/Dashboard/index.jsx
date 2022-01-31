import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import Schedule from './screens/Schedule'
import Journals from './screens/Journals'
import Modal from './components/Modal'
import modalConfigAtom from './screens/Journals/recoil-atoms/modalConfigAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import '../../../_main.sass'
import Construction from './screens/Construction'
import company from '../../../company'
import darkModeAtom from './components/SideBar/components/DarkMode/darkModeAtom'

import newDateAtom from './screens/Journals/recoil-atoms/newDateAtom'
import allPromptsAtom from './screens/Journals/recoil-atoms/allPromptsAtom'
import allRoutesAtom from './screens/Journals/recoil-atoms/allRoutesAtom'
import booksAtom from './screens/Journals/recoil-atoms/booksAtom'
import currentMobileSectionAtom from './screens/Journals/recoil-atoms/currentMobileSectionAtom'
import datesAtom from './screens/Journals/recoil-atoms/datesAtom'
import notesAtom from './screens/Journals/recoil-atoms/notesAtom'
import notesDropDownAtom from './screens/Journals/recoil-atoms/notesDropDownAtom'
import openBookAtom from './screens/Journals/recoil-atoms/openBookAtom'
import openSlotAtom from './screens/Journals/recoil-atoms/openSlotAtom'
import slotsAtom from './screens/Journals/recoil-atoms/slotsAtom'
import allCalendarEventsAtom from './screens/Schedule/recoil-atoms/allCalendarEventsAtom'
import completedOpenAtom from './screens/Schedule/recoil-atoms/completedOpenAtom'
import dropDownDayAtom from './screens/Schedule/recoil-atoms/dropDownDayAtom'
import eventsAtom from './screens/Schedule/recoil-atoms/eventsAtom'
import habitsAtom from './screens/Schedule/recoil-atoms/habitsAtom'
import projectsAtom from './screens/Schedule/recoil-atoms/projectsAtom'
import routinesAtom from './screens/Schedule/recoil-atoms/routinesAtom'
import scheduleAddDropDownAtom from './screens/Schedule/recoil-atoms/scheduleAddDropDownAtom'
import scheduleHeaderAtom from './screens/Schedule/recoil-atoms/scheduleHeaderAtom'
import scheduleSideMenuAtom from './screens/Schedule/recoil-atoms/scheduleSideMenuAtom'
import tasksAtom from './screens/Schedule/recoil-atoms/tasksAtom'
import tagsAtom from './components/Modal/components/AddTask/tagsAtom'
import eventTagsAtom from './components/Modal/components/AddEvent/eventTagsAtom'

import Backendless from 'backendless'

const Dashboard = () => {

    const [modalConfig] = useRecoilState(modalConfigAtom)

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = darkMode?'dark':'light'
        if(window.innerWidth<1450){
            if(document.getElementById('mainSideBar')){
                document.getElementById('mainSideBar').style.display = 'flex'
            }
        }else{
            if(document.getElementById('mainSideBar')){
                document.getElementById('mainSideBar').style.display = 'grid'
            }
        }
    }, [darkMode])

    const setAllPrompts = useSetRecoilState(allPromptsAtom)
    const setAllRoutes = useSetRecoilState(allRoutesAtom)
    const setBooks = useSetRecoilState(booksAtom)
    const setCurrentMobileSection = useSetRecoilState(currentMobileSectionAtom)
    const setDates = useSetRecoilState(datesAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const setNewDate = useSetRecoilState(newDateAtom)
    const setNotes = useSetRecoilState(notesAtom)
    const setNotesDropDown = useSetRecoilState(notesDropDownAtom)
    const setOpenBook = useSetRecoilState(openBookAtom)
    const setOpenSlot = useSetRecoilState(openSlotAtom)
    const setSlots = useSetRecoilState(slotsAtom)
    const setAllCalendarEvents = useSetRecoilState(allCalendarEventsAtom)
    const setCompletedOpen = useSetRecoilState(completedOpenAtom)
    const setDropDownDay = useSetRecoilState(dropDownDayAtom)
    const setEvents = useSetRecoilState(eventsAtom)
    const setHabits = useSetRecoilState(habitsAtom)
    const setProjects = useSetRecoilState(projectsAtom)
    const setRoutines = useSetRecoilState(routinesAtom)
    const setScheduleAddDropDown = useSetRecoilState(scheduleAddDropDownAtom)
    const setScheduleHeader = useSetRecoilState(scheduleHeaderAtom)
    const setScheduleSideMenu = useSetRecoilState(scheduleSideMenuAtom)
    const setTasks = useSetRecoilState(tasksAtom)
    const setEventTags = useSetRecoilState(eventTagsAtom)
    const setTags = useSetRecoilState(tagsAtom)

    useEffect(()=>{
        let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
        let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
        Backendless.initApp(APP_ID, API_KEY)
        Backendless.UserService.getCurrentUser().then((loggedInUser)=>{
            console.log(loggedInUser)
            if(loggedInUser){
                setDarkMode(loggedInUser.data.darkMode)
                setAllPrompts(loggedInUser.data.allPrompts)
                setAllRoutes(loggedInUser.data.allRoutes)
                setBooks(loggedInUser.data.books)
                setCurrentMobileSection(loggedInUser.data.currentMobileSection)
                setDates(loggedInUser.data.dates)
                setModalConfig(loggedInUser.data.modalConfig)
                setNewDate(loggedInUser.data.newDate)
                setNotes(loggedInUser.data.notes)
                setNotesDropDown(loggedInUser.data.notesDropDown)
                setOpenBook(loggedInUser.data.openBook)
                setOpenSlot(loggedInUser.data.openSlot)
                setSlots(loggedInUser.data.slots)
                setAllCalendarEvents(loggedInUser.data.allCalendarEvents)
                setCompletedOpen(loggedInUser.data.completedOpen)
                setDropDownDay(loggedInUser.data.dropDownDay)
                setEvents(loggedInUser.data.events)
                setHabits(loggedInUser.data.habits)
                setProjects(loggedInUser.data.projects)
                setRoutines(loggedInUser.data.routines)
                setScheduleAddDropDown(loggedInUser.data.scheduleAddDropDown)
                setScheduleHeader(loggedInUser.data.scheduleHeader)
                setScheduleSideMenu(loggedInUser.data.scheduleSideMenu)
                setTasks(loggedInUser.data.tasks)
                setEventTags(loggedInUser.data.eventTags)
                setTags(loggedInUser.data.tags)
            }
        })
    }, [setAllPrompts, setAllRoutes, setBooks, setCompletedOpen, setCurrentMobileSection, setDarkMode, setDates, setDropDownDay, setEventTags, setAllCalendarEvents, setEvents, setHabits, setModalConfig, setNewDate, setNotes, setNotesDropDown, setOpenBook, setOpenSlot, setProjects, setRoutines, setScheduleAddDropDown, setScheduleHeader, setScheduleSideMenu, setSlots, setTags, setTasks])
    
    return (
        <div className="container">
            {modalConfig.type!=='' ? 
            <Modal />
            : null}
            <Switch>
                <Route path={`/${company.subsidiary}/dashboard/${company.fitness}`}><Construction color="linear-gradient(90deg,#42D104,#FFE500)" /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.finances}`}><Construction color="linear-gradient(90deg,#FE3200,#FF914D)" /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.notes}`}><Construction color="linear-gradient(90deg,#3A1582,#A400FE)" /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.journals}`}><Journals /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.schedule}`}><Schedule /></Route>
            </Switch>
        </div>
)
}

export default Dashboard