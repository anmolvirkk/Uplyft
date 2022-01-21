import React, { useState } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'
import {windowHeight} from './screens/Subsidiary/Dashboard/variables/mobileHeights'

const App = () => {

    let timeout
    const [forceUpdate, setForceUpdate] = useState(false)

    window.onresize = () => {
            if(window.innerHeight < windowHeight){
                if(document.getElementById('mainSideBar')){
                    document.getElementById('mainSideBar').style.display = 'none'
                }
                if(document.getElementById('textEditorHeader')){
                    document.getElementById('textEditorHeader').style.display = 'block'
                    document.getElementById('textEditor').style.height = (window.innerHeight - 60 - 40 - 12 - 24 - 40)+'px'
                    document.getElementById('textEditor').style.marginBottom = '38px'
                    document.getElementById('promptsSelector').style.height = (window.innerHeight - 60 - 40 - 40 - 24)+'px'
                }
            }else{
                if(document.getElementById('mainSideBar')){
                    document.getElementById('mainSideBar').style.display = 'flex'
                }
                if(document.getElementById('textEditorHeader')){
                    document.getElementById('textEditorHeader').style.display = 'none'
                    document.getElementById('textEditor').style.height = (window.innerHeight - 80 - 60 - 50 - 12 - 24 - 3)+'px'
                    document.getElementById('textEditor').style.marginBottom = '12px'
                    document.getElementById('promptsSelector').style.height = (window.innerHeight - 60 - 80 - 40 - 24 - 10)+'px'
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