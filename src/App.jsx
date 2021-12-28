import React from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import {useRecoilState} from 'recoil'
import darkModeAtom from './screens/Subsidiary/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'

const App = () => {

    const [darkMode] = useRecoilState(darkModeAtom)

    return (
        <div className={(darkMode?'dark':'light')}>
            <Router>
                <Switch>
                    <Route exact path="/"><Redirect to={`/${company.subsidiary}`} /></Route>
                    <Route exact path={`/${company.subsidiary}`}><LandingPage /></Route>
                    <Route path={`/${company.subsidiary}/dashboard`}><Dashboard /></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App