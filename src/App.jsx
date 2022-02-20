import React, { useCallback, useRef, useState } from 'react'
import Dashboard from './screens/Dashboard'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import LandingPage from './screens/LandingPage'
import company from './company'
import Auth from './screens/Auth'
import {windowHeight} from './screens/Dashboard/variables/mobileHeights'
import { useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil'
import { darkModeAtom, allPromptsAtom, allRoutesAtom, booksAtom, currentMobileSectionAtom, datesAtom, 
 newDateAtom, notesAtom, notesDropDownAtom, openBookAtom, openSlotAtom, slotsAtom, allCalendarEventsAtom,
completedOpenAtom, dropDownDayAtom, eventsAtom, habitsAtom, projectsAtom, routinesAtom, scheduleAddDropDownAtom, scheduleHeaderAtom,
scheduleSideMenuAtom, tasksAtom, eventTagsAtom, tagsAtom, planAtom } from './screens/Dashboard/allAtoms'

import Backendless from 'backendless'
import isMobileAtom from './screens/Dashboard/recoil-atoms/isMobileAtom'
import modalConfigAtom from './screens/Dashboard/recoil-atoms/modalConfigAtom'
import authAtom from './screens/Auth/authAtom'
import Pricing from './screens/Pricing'
import Checkout from './screens/Checkout'
import snacksAtom from './screens/Dashboard/components/Snackbar/snacksAtom'
import Journals from './screens/Journals'
import Schedule from './screens/Schedule'

export const APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
export const API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'

const App = React.memo(() => {

    const [forceUpdate, setForceUpdate] = useState(false)
    const setIsMobile = useSetRecoilState(isMobileAtom)
    const windowWidth = useRef(window.innerWidth)

    window.onresize = () => {
        if(window.innerWidth < 1450){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
        if(windowWidth.current !== window.innerWidth){
            setForceUpdate(!forceUpdate)
            windowWidth.current = window.innerWidth
        }
        if(window.innerWidth < 1450){
            if(document.getElementById('modalContainer')){
                document.getElementById('modalContainer').style.height = window.innerHeight+'px'
            }
            if(document.getElementById('authWrapper')){
                document.getElementById('authWrapper').style.height = window.innerHeight+'px'
            }
            if(window.innerHeight < windowHeight){
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

    const [plan] = useRecoilState(planAtom)
    const [snacks, setSnacks] = useRecoilState(snacksAtom)

    const batchUpdate = useRecoilCallback(({set})=>(data)=>{
        if(data){
            set(darkModeAtom, data.darkMode)
            set(allPromptsAtom, data.allPrompts)
            set(allRoutesAtom, data.allRoutes)
            set(booksAtom, data.books)
            set(currentMobileSectionAtom, data.currentMobileSection)
            set(datesAtom, data.dates)
            set(newDateAtom, data.newDate)
            set(notesAtom, data.notes)
            set(notesDropDownAtom, data.notesDropDown)
            set(openBookAtom, data.openBook)
            set(openSlotAtom, data.openSlot)
            set(slotsAtom, data.slots)
            set(allCalendarEventsAtom, data.allCalendarEvents)
            set(completedOpenAtom, data.completedOpen)
            set(dropDownDayAtom, data.dropDownDay)
            set(eventsAtom, data.events)
            set(habitsAtom, data.habits)
            set(projectsAtom, data.projects)
            set(routinesAtom, data.routines)
            set(scheduleAddDropDownAtom, data.scheduleAddDropDown)
            set(scheduleHeaderAtom, data.scheduleHeader)
            set(scheduleSideMenuAtom, data.scheduleSideMenu)
            set(tasksAtom, data.tasks)
            set(eventTagsAtom, data.eventTags)
            set(tagsAtom, data.tags)
        }
    }, [])

    const updateAtoms = useCallback(() => {
        if(auth.social){
            let xhr = new XMLHttpRequest()
            xhr.open('POST', `https://deepway.backendless.app/api/users/oauth/googleplus/login`, true)
            xhr.send(JSON.stringify({accessToken: auth.accessToken}))
            setSnacks([...snacks, {animate: true, text: 'syncing', icon: 'load'}])
            xhr.onload = (loggedInUser) => {
                if(!window.location.pathname.split('/').includes('dashboard')){
                    window.location.replace(`/dashboard/${company.journals}`)
                }else if(JSON.parse(loggedInUser.currentTarget.response).data){
                    batchUpdate(JSON.parse(loggedInUser.currentTarget.response).data)
                }
                setSnacks([...snacks, {animate: true, text: 'sync complete', icon: 'check'}])
            }
        }else if(auth.social === undefined){
            if(window.location.pathname.split('/').length > 2){
                window.location.replace(``)
            }
        }else{
            let xhr = new XMLHttpRequest()
            xhr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
            xhr.send(JSON.stringify({login: auth.login, password: auth.password}))
            setSnacks([...snacks, {animate: true, text: 'syncing', icon: 'load'}])
            xhr.onload = (loggedInUser) => {
                if(!window.location.pathname.split('/').includes('dashboard')){
                    window.location.replace(`/dashboard/${company.journals}`)
                }else if(JSON.parse(loggedInUser.currentTarget.response).data){
                    batchUpdate(JSON.parse(loggedInUser.currentTarget.response).data)
                }
                setSnacks([...snacks, {animate: true, text: 'sync complete', icon: 'check'}])
            }
        }
    }, [auth, batchUpdate, setSnacks, snacks])

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

        if(Object.keys(auth).length > 0){
            if(auth.social){
                let xr = new XMLHttpRequest()
                xr.open('POST', `https://deepway.backendless.app/api/users/oauth/googleplus/login`, true)
                xr.send(JSON.stringify({accessToken: auth.accessToken}))
                setSnacks([...snacks, {animate: true, text: 'saving', icon: 'load'}])
                xr.onload = (loggedInUser) => {
                    let user = {...JSON.parse(loggedInUser.currentTarget.response), data: {...recoilData}}
                    Backendless.UserService.update(user)
                    setSnacks([...snacks, {animate: true, text: 'saved to cloud', icon: 'check'}])
                }
            }else{
                let xr = new XMLHttpRequest()
                xr.open('POST', `https://deepway.backendless.app/api/users/login`, true)
                xr.send(JSON.stringify({login: auth.login, password: auth.password}))
                setSnacks([...snacks, {animate: true, text: 'saving', icon: 'load'}])
                xr.onload = (loggedInUser) => {
                    let user = {...JSON.parse(loggedInUser.currentTarget.response), data: {...recoilData}, plan: plan}
                    Backendless.UserService.update(user)
                    setSnacks([...snacks, {animate: true, text: 'saved to cloud', icon: 'check'}])
                }
            }
        }
        saved.current = false
    }, [allCalendarEvents, plan, setSnacks, snacks, allPrompts, allRoutes, auth, books, completedOpen, currentMobileSection, darkMode, dates, dropDownDay, eventTags, events, habits, modalConfig, newDate, notes, notesDropDown, openBook, openSlot, projects, routines, scheduleAddDropDown, scheduleHeader, scheduleSideMenu, slots, tags, tasks])

    document.onvisibilitychange = () => {
        if(plan==='Pro'){
            if (document.visibilityState === 'hidden' && !saved.current) {
                saved.current = true
                updateBackendless()
            }
        }
    }
    
    window.onbeforeunload = () => {
        if(plan==='Pro'){
            updateBackendless()
            return false
        }
    }

    window.onpagehide = () => {
        if(plan==='Pro'){
            updateBackendless()
        }
    }

    window.onload = () => {
        Backendless.initApp(APP_ID, API_KEY)
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/"><LandingPage /></Route>
                <Route exact path={`/${company.journals}`}><Journals /></Route>
                <Route exact path={`/${company.schedule}`}><Schedule /></Route>
                <Route exact path={`/pricing`}><Pricing /></Route>
                <Route exact path={`/signup`}><Auth type='signup' /></Route>
                <Route exact path={`/login`}><Auth type='login' /></Route>
                <Route exact path={`/checkout`}><Checkout updateBackendless={updateBackendless} /></Route>
                <Route path={`/dashboard`}><Dashboard updateAtoms={updateAtoms} updateBackendless={updateBackendless} /></Route>
            </Switch>
        </Router>
    )
})

export default App