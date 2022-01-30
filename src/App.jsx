import React, { useEffect, useRef, useState } from 'react'
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
    const [auth] = useRecoilState(authAtom)


    const recoilData = useRef({
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
    })

    useEffect(()=>{

        if(auth.email !== '' && auth.password !== ''){
            const _ = require('lodash')

            let APP_ID = 'DB0DCF25-9468-8FAB-FFC0-F3BAE974FB00'
            let API_KEY = '5CE4C303-32CB-498B-8645-DC70AD54F770'
            Backendless.initApp(APP_ID, API_KEY)

            Backendless.UserService.login(auth.email, auth.password, true).then((loggedUser)=>{
                if(!_.isEqual(loggedUser.data, recoilData.current)){
                    let user = loggedUser
                    user.data = {...recoilData.current}
                    Backendless.UserService.update(user)
                }
            })

        }

    }, [auth, recoilData])

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