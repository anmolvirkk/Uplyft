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

import isMobileAtom from './screens/Dashboard/recoil-atoms/isMobileAtom'
import modalConfigAtom from './screens/Dashboard/recoil-atoms/modalConfigAtom'
import Pricing from './screens/Pricing'
import Checkout from './screens/Checkout'
import snacksAtom from './screens/Dashboard/components/Snackbar/snacksAtom'
import Journals from './screens/Journals'
import Schedule from './screens/Schedule'

import dataAtom from './screens/Dashboard/dataAtom'

import {doc, getDoc, updateDoc} from 'firebase/firestore'
import { db } from './firebase'

const App = React.memo(() => {

    const [forceUpdate, setForceUpdate] = useState(false)
    const setIsMobile = useSetRecoilState(isMobileAtom)
    const windowWidth = useRef(window.innerWidth)

    window.onresize = () => {
        if(window.innerWidth <= 640){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
        if(windowWidth.current !== window.innerWidth){
            setForceUpdate(!forceUpdate)
            windowWidth.current = window.innerWidth
        }
        if(window.innerWidth <= 640){
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

    const [data] = useRecoilState(dataAtom)

    const updateAtoms = useCallback(() => {
        setSnacks([...snacks, {animate: true, text: 'syncing', icon: 'load'}])
        const docRef = doc(db, 'users', data.uid)
        getDoc(docRef).then(e=>{
            if(e.exists()){
                if(Object.keys(e.data()).length > 0){
                    batchUpdate(e.data())
                }
                setSnacks([...snacks, {animate: true, text: 'sync complete', icon: 'check'}])
            }
        })
    }, [batchUpdate, setSnacks, snacks, data])

    const updateBackend = useCallback(() => {
        const recoilData = {
            darkMode: darkMode?darkMode:null,
            allPrompts: allPrompts?allPrompts:null,
            allRoutes: allRoutes?allRoutes:null,
            books: books?books:null,
            currentMobileSection: currentMobileSection?currentMobileSection:null,
            dates: dates?dates:null,
            modalConfig: modalConfig?modalConfig:null,
            newDate: newDate?newDate:null,
            notes: notes?notes:null,
            notesDropDown: notesDropDown?notesDropDown:null,
            openBook: openBook?openBook:null,
            openSlot: openSlot?openSlot:null,
            slots: slots?slots:null,
            allCalendarEvents: allCalendarEvents?allCalendarEvents:null,
            completedOpen: completedOpen?completedOpen:null,
            dropDownDay: dropDownDay?dropDownDay:null,
            events: events?events:null,
            habits: habits?habits:null,
            projects: projects?projects:null,
            routines: routines?routines:null,
            scheduleAddDropDown: scheduleAddDropDown?scheduleAddDropDown:null,
            scheduleHeader: scheduleHeader?scheduleHeader:null,
            scheduleSideMenu: scheduleSideMenu?scheduleSideMenu:null,
            tasks: tasks?tasks:null,
            eventTags: eventTags?eventTags:null,
            tags: tags?tags:null
        }
        const docRef = doc(db, 'users', data.uid)
        setSnacks([...snacks, {animate: true, text: 'saving', icon: 'load'}])
        const recoilString = JSON.parse(JSON.stringify(recoilData).replace('undefined', 'null'))
        updateDoc(docRef, {...recoilString}).then(()=>{
            setSnacks([...snacks, {animate: true, text: 'saved to cloud', icon: 'check'}])
        })
        saved.current = false
    }, [allCalendarEvents, data, setSnacks, snacks, allPrompts, allRoutes, books, completedOpen, currentMobileSection, darkMode, dates, dropDownDay, eventTags, events, habits, modalConfig, newDate, notes, notesDropDown, openBook, openSlot, projects, routines, scheduleAddDropDown, scheduleHeader, scheduleSideMenu, slots, tags, tasks])

    document.onvisibilitychange = () => {
        if(plan==='Pro'){
            if (document.visibilityState === 'hidden' && !saved.current) {
                saved.current = true
                updateBackend()
            }
        }
    }
    
    window.onbeforeunload = () => {
        if(plan==='Pro'){
            updateBackend()
            return false
        }
    }

    window.onpagehide = () => {
        if(plan==='Pro'){
            updateBackend()
        }
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
                <Route exact path={`/checkout`}><Checkout updateBackend={updateBackend} /></Route>
                <Route path={`/dashboard`}><Dashboard updateAtoms={updateAtoms} updateBackend={updateBackend} /></Route>
            </Switch>
        </Router>
    )
})

export default App