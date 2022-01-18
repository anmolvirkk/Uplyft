import React, { useEffect } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import {useRecoilState} from 'recoil'
import darkModeAtom from './screens/Subsidiary/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'

const App = () => {

    const [darkMode] = useRecoilState(darkModeAtom)
    document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px'

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = darkMode?'dark':'light'
    }, [darkMode])

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