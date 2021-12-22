import React from 'react'
import Dashboard from './pages/Uplift/Dashboard'
import {useRecoilState} from 'recoil'
import darkModeAtom from './pages/Uplift/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import LandingPage from './pages/Uplift/LandingPage'

const App = () => {

    const [darkMode] = useRecoilState(darkModeAtom)

    return (
        <div className={(darkMode?'dark':'light')}>
            <Router>
                <Switch>
                    <Route exact path="/"><LandingPage /></Route>
                    <Route exact path="/uplift"><LandingPage /></Route>
                    <Route path="/uplift/dashboard"><Dashboard /></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App