import React, { useRef, useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'
import { useRecoilState } from 'recoil'
import { darkModeAtom, allPromptsAtom, allRoutesAtom, booksAtom, currentMobileSectionAtom, datesAtom, 
 newDateAtom, notesAtom, notesDropDownAtom, openBookAtom, openSlotAtom, slotsAtom, allCalendarEventsAtom,
completedOpenAtom, dropDownDayAtom, eventsAtom, habitsAtom, projectsAtom, routinesAtom, scheduleAddDropDownAtom, scheduleHeaderAtom,
scheduleSideMenuAtom, tasksAtom, eventTagsAtom, tagsAtom } from './screens/Subsidiary/Dashboard/allAtoms'

import Backendless from 'backendless'
import authAtom from './screens/Subsidiary/Auth/authAtom'
import isMobileAtom from './screens/Subsidiary/Dashboard/recoil-atoms/isMobileAtom'
import modalConfigAtom from './screens/Subsidiary/Dashboard/recoil-atoms/modalConfigAtom'

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

    const saved = useRef(false)
    const [auth] = useRecoilState(authAtom)

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
            Backendless.UserService.getCurrentUser().then((currentUser)=>{
                if(currentUser){
                    let user = {...currentUser, data: {...recoilData}}
                    let xhr = new XMLHttpRequest()
                    xhr.open('PUT', `https://deepway.backendless.app/api/users/${currentUser.objectId}`, true)
                    xhr.send(JSON.stringify(user))
                    saved.current = false
                }
            })
        }
    }
    
    window.onbeforeunload = () => {
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
        return false
    }

    window.onpagehide = () => {
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
    }

    window.onload = () => {
        let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
        let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
        Backendless.initApp(APP_ID, API_KEY)
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