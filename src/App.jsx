import React, { useRef, useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'
import { useRecoilState } from 'recoil'

import isMobileAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/isMobileAtom'
import darkModeAtom from './screens/Subsidiary/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'

import allPromptsAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/allPromptsAtom'
import allRoutesAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/allRoutesAtom'
import booksAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/booksAtom'
import currentMobileSectionAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/currentMobileSectionAtom'
import datesAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/datesAtom'
import modalConfigAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/modalConfigAtom'
import newDateAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/newDateAtom'
import notesAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/notesAtom'
import notesDropDownAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/notesDropDownAtom'
import openBookAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/openBookAtom'
import openSlotAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/openSlotAtom'
import slotsAtom from './screens/Subsidiary/Dashboard/screens/Journals/recoil-atoms/slotsAtom'

import allCalendarEventsAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/allCalendarEventsAtom'
import completedOpenAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/completedOpenAtom'
import dropDownDayAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/dropDownDayAtom'
import eventsAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/eventsAtom'
import habitsAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/habitsAtom'
import projectsAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/projectsAtom'
import routinesAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/routinesAtom'
import scheduleAddDropDownAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/scheduleAddDropDownAtom'
import scheduleHeaderAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/scheduleHeaderAtom'
import scheduleSideMenuAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/scheduleSideMenuAtom'
import tasksAtom from './screens/Subsidiary/Dashboard/screens/Schedule/recoil-atoms/tasksAtom'

import eventTagsAtom from './screens/Subsidiary/Dashboard/components/Modal/components/AddEvent/eventTagsAtom'
import tagsAtom from './screens/Subsidiary/Dashboard/components/Modal/components/AddTask/tagsAtom'

import Backendless from 'backendless'
import authAtom from './screens/Subsidiary/Auth/authAtom'

const App = () => {

    const [forceUpdate, setForceUpdate] = useState(false)
    const [isMobile, setIsMobile] = useRecoilState(isMobileAtom)

    window.onresize = (e) => {
        if(window.innerWidth < 1450){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
        if(isMobile){
            if(document.getElementById('modalContainer')){
                document.getElementById('modalContainer').style.height = window.innerHeight+'px'
            }
            if(document.getElementById('authWrapper')){
                document.getElementById('authWrapper').style.height = window.innerHeight+'px'
            }
            if(e.target.innerHeight < windowHeight){
                if(document.getElementById('mainSideBar')){
                    document.getElementById('mainSideBar').style.display = 'none'
                }
                if(document.getElementById('textEditorHeader')){
                    document.getElementById('textEditorHeader').style.display = 'block'
                    document.getElementById('textEditor').style.height = (window.innerHeight - 60 - 60 - 40 - 20 - 12)+'px'
                    document.getElementById('textEditor').style.marginBottom = '40px'
                    document.getElementById('promptsSelector').style.height = (window.innerHeight - 60 - 72)+'px'
                }
            }else{
                if(document.getElementById('mainSideBar')){
                    document.getElementById('mainSideBar').style.display = 'flex'
                }
                if(document.getElementById('textEditorHeader')){
                    document.getElementById('textEditorHeader').style.display = 'none'
                    document.getElementById('textEditor').style.height = (window.innerHeight - 80 - 60 - 72 - 12)+'px'
                    document.getElementById('textEditor').style.marginBottom = '-3px'
                    document.getElementById('promptsSelector').style.height = (window.innerHeight - 60 - 80 - 60)+'px'
                }
                setForceUpdate(!forceUpdate)
            }
        }else{
            if(document.getElementById('mainSideBar')){
                document.getElementById('mainSideBar').style.display = 'grid'
            }
        }
    }

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
    const [allPrompts, setAllPrompts] = useRecoilState(allPromptsAtom)
    const [allRoutes, setAllRoutes] = useRecoilState(allRoutesAtom)

    const [books, setBooks] = useRecoilState(booksAtom)
    const [currentMobileSection, setCurrentMobileSection] = useRecoilState(currentMobileSectionAtom)
    const [dates, setDates] = useRecoilState(datesAtom)
    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)
    const [newDate, setNewDate] = useRecoilState(newDateAtom)
    const [notes, setNotes] = useRecoilState(notesAtom)
    const [notesDropDown, setNotesDropDown] = useRecoilState(notesDropDownAtom)
    const [openBook, setOpenBook] = useRecoilState(openBookAtom)
    const [openSlot, setOpenSlot] = useRecoilState(openSlotAtom)
    const [slots, setSlots] = useRecoilState(slotsAtom)

    const [allCalendarEvents, setAllCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [completedOpen, setCompletedOpen] = useRecoilState(completedOpenAtom)
    const [dropDownDay, setDropDownDay] = useRecoilState(dropDownDayAtom)
    const [events, setEvents] = useRecoilState(eventsAtom)
    const [habits, setHabits] = useRecoilState(habitsAtom)
    const [projects, setProjects]= useRecoilState(projectsAtom)
    const [routines, setRoutines] = useRecoilState(routinesAtom)
    const [scheduleAddDropDown, setScheduleAddDropDown] = useRecoilState(scheduleAddDropDownAtom)
    const [scheduleHeader, setScheduleHeader] = useRecoilState(scheduleHeaderAtom)
    const [scheduleSideMenu, setScheduleSideMenu] = useRecoilState(scheduleSideMenuAtom)
    const [tasks, setTasks] = useRecoilState(tasksAtom)

    const [eventTags, setEventTags] = useRecoilState(eventTagsAtom)
    const [tags, setTags] = useRecoilState(tagsAtom)
    const [auth] = useRecoilState(authAtom)

    const saved = useRef(false)

    document.onvisibilitychange = () => {
        if (document.visibilityState === 'hidden' && !saved.current) {
            saved.current = true
            const recoilData = {
                darkMode: darkMode,
                allPrompts: allPrompts,
                allRoutes: allRoutes,
                books: books,
                currentMobileSection: currentMobileSection,
                dates: dates,
                modalConfig: modalConfig,
                newDate: newDate,
                notes: notes,
                notesDropDown: notesDropDown,
                openBook: openBook,
                openSlot: openSlot,
                slots: slots,
                allCalendarEvents: allCalendarEvents,
                completedOpen: completedOpen,
                dropDownDay: dropDownDay,
                events: events,
                habits: habits,
                projects: projects,
                routines: routines,
                scheduleAddDropDown: scheduleAddDropDown,
                scheduleHeader: scheduleHeader,
                scheduleSideMenu: scheduleSideMenu,
                tasks: tasks,
                eventTags: eventTags,
                tags: tags
            }
            let user = {...auth, data: {...recoilData}}
            navigator.sendBeacon(`https://deepway.backendless.app/api/users/${auth.objectId}`, JSON.stringify(user))
        }
    }
    
    window.onbeforeunload = () => {
        if(!saved.current){
            saved.current = true
            const recoilData = {
                darkMode: darkMode,
                allPrompts: allPrompts,
                allRoutes: allRoutes,
                books: books,
                currentMobileSection: currentMobileSection,
                dates: dates,
                modalConfig: modalConfig,
                newDate: newDate,
                notes: notes,
                notesDropDown: notesDropDown,
                openBook: openBook,
                openSlot: openSlot,
                slots: slots,
                allCalendarEvents: allCalendarEvents,
                completedOpen: completedOpen,
                dropDownDay: dropDownDay,
                events: events,
                habits: habits,
                projects: projects,
                routines: routines,
                scheduleAddDropDown: scheduleAddDropDown,
                scheduleHeader: scheduleHeader,
                scheduleSideMenu: scheduleSideMenu,
                tasks: tasks,
                eventTags: eventTags,
                tags: tags
            }
            let user = {...auth, data: {...recoilData}}
            navigator.sendBeacon(`https://deepway.backendless.app/api/users/${auth.objectId}`, JSON.stringify(user))
        }
    }

    window.onpagehide = () => {
        if(!saved.current){
            saved.current = true
            const recoilData = {
                darkMode: darkMode,
                allPrompts: allPrompts,
                allRoutes: allRoutes,
                books: books,
                currentMobileSection: currentMobileSection,
                dates: dates,
                modalConfig: modalConfig,
                newDate: newDate,
                notes: notes,
                notesDropDown: notesDropDown,
                openBook: openBook,
                openSlot: openSlot,
                slots: slots,
                allCalendarEvents: allCalendarEvents,
                completedOpen: completedOpen,
                dropDownDay: dropDownDay,
                events: events,
                habits: habits,
                projects: projects,
                routines: routines,
                scheduleAddDropDown: scheduleAddDropDown,
                scheduleHeader: scheduleHeader,
                scheduleSideMenu: scheduleSideMenu,
                tasks: tasks,
                eventTags: eventTags,
                tags: tags
            }
            let user = {...auth, data: {...recoilData}}
            navigator.sendBeacon(`https://deepway.backendless.app/api/users/${auth.objectId}`, JSON.stringify(user))
        }
    }

    window.onload = () => {
        let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
        let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
        Backendless.initApp(APP_ID, API_KEY)
        Backendless.UserService.getCurrentUser().then((auth)=>{
            setDarkMode(auth.data.darkMode)
            setAllPrompts(auth.data.allPrompts)
            setAllRoutes(auth.data.allRoutes)
            setBooks(auth.data.books)
            setCurrentMobileSection(auth.data.currentMobileSection)
            setDates(auth.data.dates)
            setModalConfig(auth.data.modalConfig)
            setNewDate(auth.data.newDate)
            setNotes(auth.data.notes)
            setNotesDropDown(auth.data.notesDropDown)
            setOpenBook(auth.data.openBook)
            setOpenSlot(auth.data.openSlot)
            setSlots(auth.data.slots)
            setAllCalendarEvents(auth.data.allCalendarEvents)
            setCompletedOpen(auth.data.completedOpen)
            setDropDownDay(auth.data.dropDownDay)
            setEvents(auth.data.events)
            setHabits(auth.data.habits)
            setProjects(auth.data.projects)
            setRoutines(auth.data.routines)
            setScheduleAddDropDown(auth.data.scheduleAddDropDown)
            setScheduleHeader(auth.data.scheduleHeader)
            setScheduleSideMenu(auth.data.scheduleSideMenu)
            setTasks(auth.data.tasks)
            setEventTags(auth.data.eventTags)
            setTags(auth.data.tags)
        })
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/"><Redirect to={`/${company.subsidiary}`} /></Route>
                <Route exact path={`/${company.subsidiary}/signup`}><Auth type='signup' /></Route>
                <Route exact path={`/${company.subsidiary}/login`}><Auth type='login' /></Route>
                <Route exact path={`/${company.subsidiary}`}><LandingPage /></Route>
                <Route path={`/${company.subsidiary}/dashboard`}><Dashboard /></Route>
            </Switch>
        </Router>
    )
}

export default App