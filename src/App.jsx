import React, { useEffect, useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import {useRecoilState} from 'recoil'
import darkModeAtom from './screens/Subsidiary/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'

const App = () => {

    const [darkMode] = useRecoilState(darkModeAtom)

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = darkMode?'dark':'light'
    }, [darkMode])


    let timeout
    const [forceUpdate, setForceUpdate] = useState(false)

    window.onresize = () => {
        if(document.getElementById('textEditorHeader')){
            if(window.innerHeight < windowHeight){
                document.getElementById('mainSideBar').style.display = 'none'
                document.getElementById('textEditorHeader').style.display = 'block'
                document.getElementById('textEditor').style.height = (window.innerHeight - 60 - 24)+'px'
                document.getElementById('promptsSelector').style.height = (window.innerHeight - 60 - 40 - 40 - 24 - 15)+'px'
            }else{
                document.getElementById('mainSideBar').style.display = 'flex'
                document.getElementById('textEditorHeader').style.display = 'none'
                document.getElementById('textEditor').style.height = (window.innerHeight - 80 - 60 - 24)+'px'
                document.getElementById('promptsSelector').style.height = (window.innerHeight - 60 - 80 - 40 - 24 - 15)+'px'
            }
        }

        clearTimeout(timeout)
        timeout = setTimeout(()=>{
            setForceUpdate(!forceUpdate)
        }, 300)

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