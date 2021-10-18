import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Fitness from './screens/Fitness'
import Habits from './screens/Habits'
import Home from './screens/Home'
import Journals from './screens/Journals'
import Settings from './screens/Settings'

const Dashboard = () => {
    const [allRoutes, setAllRoutes] = useState(localStorage['allRoutes']?JSON.parse(localStorage['allRoutes']):{})
    localStorage['allRoutes'] = JSON.stringify(allRoutes)

    return (
    <React.Fragment>
        <Router>
            <div style={{width: '100%', height: '100%'}}>
                <Switch>
                    <Route exact path="/"><Home allRoutes={allRoutes} setAllRoutes={setAllRoutes} /></Route>
                    <Route path="/home"><Home allRoutes={allRoutes} setAllRoutes={setAllRoutes} /></Route>
                    <Route path="/journals"><Journals allRoutes={allRoutes} setAllRoutes={setAllRoutes} /></Route>
                    <Route path="/habits"><Habits allRoutes={allRoutes} setAllRoutes={setAllRoutes} /></Route>
                    <Route path="/fitness"><Fitness allRoutes={allRoutes} setAllRoutes={setAllRoutes} /></Route>
                    <Route path="/settings"><Settings allRoutes={allRoutes} setAllRoutes={setAllRoutes} /></Route>
                </Switch>
            </div>
        </Router>
    </React.Fragment>
)
}

export default Dashboard