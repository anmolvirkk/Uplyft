import React, { useEffect } from 'react'
import Dashboard from './screens/Subsidiary/Dashboard'
import {useRecoilState} from 'recoil'
import darkModeAtom from './screens/Subsidiary/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import LandingPage from './screens/Subsidiary/LandingPage'
import company from './company'
import Auth from './screens/Subsidiary/Auth'

const App = () => {
    
    
    document.getElementsByTagName('html')[0].style.maxHeight = window.innerHeight+'px'
    document.getElementsByTagName('body')[0].style.maxHeight = window.innerHeight+'px'

    const [darkMode] = useRecoilState(darkModeAtom)

    useEffect(()=>{
        document.getElementsByTagName('html')[0].style.backgroundColor = darkMode?"rgb(11,11,11)":"rgb(255, 255, 255)"
        document.getElementsByTagName('body')[0].style.backgroundColor = darkMode?"rgb(11,11,11)":"rgb(255, 255, 255)"
    }, [darkMode])

    return (
        <div className={(darkMode?'dark':'light')}>
            <Router>
                <Switch>
                    <Route exact path="/"><Redirect to={`/${company.subsidiary}`} /></Route>
                    <Route exact path={`/${company.subsidiary}/signup`}><Auth type='signup' /></Route>
                    <Route exact path={`/${company.subsidiary}/login`}><Auth type='login' /></Route>
                    <Route exact path={`/${company.subsidiary}`}><LandingPage /></Route>
                    <Route path={`/${company.subsidiary}/dashboard`}><Dashboard /></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App