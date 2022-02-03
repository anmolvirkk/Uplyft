import React, { useCallback, useRef, useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil'
import { darkModeAtom, allPromptsAtom, allRoutesAtom, booksAtom, currentMobileSectionAtom, datesAtom, 
 newDateAtom, notesAtom, notesDropDownAtom, openBookAtom, openSlotAtom, slotsAtom, allCalendarEventsAtom,
completedOpenAtom, dropDownDayAtom, eventsAtom, habitsAtom, projectsAtom, routinesAtom, scheduleAddDropDownAtom, scheduleHeaderAtom,
scheduleSideMenuAtom, tasksAtom, eventTagsAtom, tagsAtom } from './screens/Subsidiary/Dashboard/allAtoms'

import Backendless from 'backendless'
import isMobileAtom from './screens/Subsidiary/Dashboard/recoil-atoms/isMobileAtom'
import modalConfigAtom from './screens/Subsidiary/Dashboard/recoil-atoms/modalConfigAtom'
import authAtom from './screens/Subsidiary/Auth/authAtom'

const App = () => {

    const [forceUpdate, setForceUpdate] = useState(false)
    const setIsMobile = useSetRecoilState(isMobileAtom)

    window.onresize = (e) => {
        if(window.innerWidth < 1450){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
        if(window.innerWidth < 1450){
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

    const saved = useRef(false)
    const [auth] = useRecoilState(authAtom)
    const [loggedUser, setLoggedUser] = useState(false)
    
    const batchUpdate = useRecoilCallback(({set})=>(data)=>{
        if(data){
            if(darkMode!==data.darkMode){
                set(darkModeAtom, data.darkMode)
            }
            if(allPrompts!==data.allPrompts){
                set(allPromptsAtom, data.allPrompts)
            }
            if(allRoutes!==data.allRoutes){
                set(allRoutesAtom, data.allRoutes)
            }
            if(books!==data.books){
                set(booksAtom, data.books)
            }
            if(currentMobileSection!==data.currentMobileSection){
                set(currentMobileSectionAtom, data.currentMobileSection)
            }
            if(dates!==data.dates){
                set(datesAtom, data.dates)
            }
            if(newDate!==data.newDate){
                set(newDateAtom, data.newDate)
            }
            if(notes!==data.notes){
                set(notesAtom, data.notes)
            }
            if(notesDropDown!==data.notesDropDown){
                set(notesDropDownAtom, data.notesDropDown)
            }
            if(openBook!==data.openBook){
                set(openBookAtom, data.openBook)
            }
            if(openSlot!==data.openSlot){
                set(openSlotAtom, data.openSlot)
            }
            if(slots!==data.slots){
                set(slotsAtom, data.slots)
            }
            if(allCalendarEvents!==data.allCalendarEvents){
                set(allCalendarEventsAtom, data.allCalendarEvents)
            }
            if(completedOpen!==data.completedOpen){
                set(completedOpenAtom, data.completedOpen)
            }
            if(dropDownDay!==data.dropDownDay){
                set(dropDownDayAtom, data.dropDownDay)
            }
            if(events!==data.events){
                set(eventsAtom, data.events)
            }
            if(habits!==data.habits){
                set(habitsAtom, data.habits)
            }
            if(projects!==data.projects){
                set(projectsAtom, data.projects)
            }
            if(routines!==data.routines){
                set(routinesAtom, data.routines)
            }
            if(scheduleAddDropDown!==data.scheduleAddDropDown){
                set(scheduleAddDropDownAtom, data.scheduleAddDropDown)
            }
            if(scheduleHeader!==data.scheduleHeader){
                set(scheduleHeaderAtom, data.scheduleHeader)
            }
            if(scheduleSideMenu!==data.scheduleSideMenu){
                set(scheduleSideMenuAtom, data.scheduleSideMenu)
            }
            if(tasks!==data.tasks){
                set(tasksAtom, data.tasks)
            }
            if(eventTags!==data.eventTags){
                set(eventTagsAtom, data.eventTags)
            }
            if(tags!==data.tags){
                set(tagsAtom, data.tags)
            }
        }
    }, [])

    const updateAtoms = useCallback(() => {
        if(auth.social){
            if(!loggedUser){
                let xhr = new XMLHttpRequest()
                xhr.open('POST', `https://deepway.backendless.app/api/users/oauth/googleplus/login`, true)
                xhr.send(JSON.stringify({accessToken: auth.accessToken}))
                xhr.onload = (loggedInUser) => {
                    if(!window.location.pathname.split('/').includes('dashboard')){
                        window.location.replace(`/${company.subsidiary}/dashboard/${company.journals}`)
                    }else if(JSON.parse(loggedInUser.currentTarget.response).data){
                            setLoggedUser(JSON.parse(loggedInUser.currentTarget.response))
                            batchUpdate(JSON.parse(loggedInUser.currentTarget.response).data)
                        }
                    }
            }else{
                batchUpdate(loggedUser.data)
            }
        }else if(auth.social === undefined){
            if(window.location.pathname.split('/').length > 2){
                window.location.replace(`/${company.subsidiary}`)
            }
        }else{
            if(!loggedUser){
                let xhr = new XMLHttpRequest()
                xhr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
                xhr.send(JSON.stringify({login: auth.login, password: auth.password}))
                xhr.onload = (loggedInUser) => {
                    if(!window.location.pathname.split('/').includes('dashboard')){
                        window.location.replace(`/${company.subsidiary}/dashboard/${company.journals}`)
                    }else if(JSON.parse(loggedInUser.currentTarget.response).data){
                            setLoggedUser(JSON.parse(loggedInUser.currentTarget.response))
                            batchUpdate(JSON.parse(loggedInUser.currentTarget.response).data)
                        }
                    }
            }else{
                batchUpdate(loggedUser.data)
            }
        }
    }, [auth, batchUpdate, loggedUser])

    const updateBackendless = useCallback(() => {
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

        if(auth.social){
            if(!loggedUser){
                let xr = new XMLHttpRequest()
                xr.open('POST', `https://deepway.backendless.app/api/users/oauth/googleplus/login`, true)
                xr.send(JSON.stringify({accessToken: auth.accessToken}))
                xr.onload = (loggedInUser) => {
                    let user = {...JSON.parse(loggedInUser.currentTarget.response), data: {...recoilData}}
                    Backendless.UserService.update(user)
                }
            }else{
                Backendless.UserService.update({...loggedUser, data: {...recoilData}})
            }
        }else{
            if(!loggedUser){
                let xr = new XMLHttpRequest()
                xr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
                xr.send(JSON.stringify({login: auth.login, password: auth.password}))
                xr.onload = (loggedInUser) => {
                    let user = {...JSON.parse(loggedInUser.currentTarget.response), data: {...recoilData}}
                    Backendless.UserService.update(user)
                }
            }else{
                Backendless.UserService.update({...loggedUser, data: {...recoilData}})
            }
        }

        saved.current = false
    }, [loggedUser, allCalendarEvents, allPrompts, allRoutes, auth, books, completedOpen, currentMobileSection, darkMode, dates, dropDownDay, eventTags, events, habits, modalConfig, newDate, notes, notesDropDown, openBook, openSlot, projects, routines, scheduleAddDropDown, scheduleHeader, scheduleSideMenu, slots, tags, tasks])

    document.onvisibilitychange = () => {
        if (document.visibilityState === 'hidden' && !saved.current) {
            saved.current = true
            updateBackendless()
        }
    }
    
    window.onbeforeunload = () => {
        updateBackendless()
        return false
    }

    window.onpagehide = () => {
        updateBackendless()
    }

    window.onload = () => {
        let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
        let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
        Backendless.initApp(APP_ID, API_KEY)
        updateAtoms()
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/"><Redirect to={`/${company.subsidiary}`} /></Route>
                <Route exact path={`/${company.subsidiary}/signup`}><Auth type='signup' /></Route>
                <Route exact path={`/${company.subsidiary}/login`}><Auth type='login' /></Route>
                <Route exact path={`/${company.subsidiary}`}><LandingPage /></Route>
                <Route path={`/${company.subsidiary}/dashboard`}><Dashboard updateAtoms={updateAtoms} updateBackendless={updateBackendless} /></Route>
            </Switch>
        </Router>
    )
}

export default App