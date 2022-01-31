import React, { useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'
import { useRecoilState, useSetRecoilState } from 'recoil'

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

export const SaveToBackend = () => {

    const [darkMode] = useRecoilState(darkModeAtom)
    const [allPrompts] = useRecoilState(allPromptsAtom)
    const [allRoutes] = useRecoilState(allRoutesAtom)

    const [books] = useRecoilState(booksAtom)
    const [currentMobileSection] = useRecoilState(currentMobileSectionAtom)
    const [dates] = useRecoilState(datesAtom)
    const [modalConfig] = useRecoilState(modalConfigAtom)
    const [newDate] = useRecoilState(newDateAtom)
    const [notes] = useRecoilState(notesAtom)
    const [notesDropDown] = useRecoilState(notesDropDownAtom)
    const [openBook] = useRecoilState(openBookAtom)
    const [openSlot] = useRecoilState(openSlotAtom)
    const [slots] = useRecoilState(slotsAtom)

    const [allCalendarEvents] = useRecoilState(allCalendarEventsAtom)
    const [completedOpen] = useRecoilState(completedOpenAtom)
    const [dropDownDay] = useRecoilState(dropDownDayAtom)
    const [events] = useRecoilState(eventsAtom)
    const [habits] = useRecoilState(habitsAtom)
    const [projects]= useRecoilState(projectsAtom)
    const [routines] = useRecoilState(routinesAtom)
    const [scheduleAddDropDown] = useRecoilState(scheduleAddDropDownAtom)
    const [scheduleHeader] = useRecoilState(scheduleHeaderAtom)
    const [scheduleSideMenu] = useRecoilState(scheduleSideMenuAtom)
    const [tasks] = useRecoilState(tasksAtom)

    const [eventTags] = useRecoilState(eventTagsAtom)
    const [tags] = useRecoilState(tagsAtom)

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
    Backendless.UserService.getCurrentUser().then((currentUser)=>{
        if(currentUser){
            let user = {...currentUser, data: {...recoilData}}
            let xhr = new XMLHttpRequest()
            xhr.open('PUT', `https://deepway.backendless.app/api/users/${currentUser.objectId}`, true)
            xhr.send(JSON.stringify(user))
        }
    })

    return null
}

export const SaveFromBackend = () => {
    const [auth] = useRecoilState(authAtom)
    const setDarkMode = useSetRecoilState(darkModeAtom)
    const setAllRoutes = useSetRecoilState(allRoutesAtom)
    const setBooks = useSetRecoilState(booksAtom)
    const setCurrentMobileSection = useSetRecoilState(currentMobileSectionAtom)
    const setDates = useSetRecoilState(datesAtom)
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const setNewDate = useSetRecoilState(newDateAtom)
    const setNotes = useSetRecoilState(notesAtom)
    const setNotesDropDown = useSetRecoilState(notesDropDownAtom)
    const setOpenBook = useSetRecoilState(openBookAtom)
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
    const setAllPrompts = useSetRecoilState(allPromptsAtom)
    const setOpenSlot = useSetRecoilState(openSlotAtom)
    if(auth.email !== ''){
        Backendless.UserService.login(auth.email, auth.password, true).then((loggedInUser)=>{
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
    }
}

const App = () => {

    const [forceUpdate, setForceUpdate] = useState(false)
    const [isMobile, setIsMobile] = useRecoilState(isMobileAtom)

    const [saveToBackend, setSaveToBackend] = useState(false)
    const [saveFromBackend, setSaveFromBackend] = useState(false)

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

    document.onvisibilitychange = () => {
        setSaveToBackend(true)
    }
    
    window.onbeforeunload = () => {
        setSaveToBackend(true)
    }

    window.onpagehide = () => {
        setSaveToBackend(true)
    }

    window.onload = () => {
        let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
        let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
        Backendless.initApp(APP_ID, API_KEY)
        setSaveFromBackend(true)
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/"><Redirect to={`/${company.subsidiary}`} /></Route>
                <Route exact path={`/${company.subsidiary}/signup`}><Auth type='signup' /></Route>
                <Route exact path={`/${company.subsidiary}/login`}><Auth type='login' /></Route>
                <Route exact path={`/${company.subsidiary}`}><LandingPage /></Route>
                <Route path={`/${company.subsidiary}/dashboard`}><Dashboard /></Route>
                {saveToBackend?<SaveToBackend />:null}
                {saveFromBackend?<SaveFromBackend />:null}
            </Switch>
        </Router>
    )
}

export default App