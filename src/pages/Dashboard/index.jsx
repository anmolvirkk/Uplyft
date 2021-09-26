import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Fitness from './screens/Fitness'
import Habits from './screens/Habits'
import Home from './screens/Home'
import Journals from './screens/Journals'
import Settings from './screens/Settings'
import SideBar from './components/SideBar'

const Dashboard = () => (
    <React.Fragment>
        <Router>
            <div style={{display: 'flex'}}>
                <SideBar />
                <div style={{width: '100%', height: '100%'}}>
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route path="/home"><Home /></Route>
                        <Route path="/journals"><Journals /></Route>
                        <Route path="/habits"><Habits /></Route>
                        <Route path="/fitness"><Fitness /></Route>
                        <Route path="/settings"><Settings /></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    </React.Fragment>
)

export default Dashboard