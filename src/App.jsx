import React, { useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {isMobile, windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'

const App = () => {

    const [forceUpdate, setForceUpdate] = useState(false)

    window.onresize = (e) => {
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