import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Fitness from './screens/Fitness'
import Schedule from './screens/Schedule'
import Journals from './screens/Journals'
import Settings from './screens/Settings'
import Modal from './components/Modal'
import modalConfigAtom from './screens/Journals/recoil-atoms/modalConfigAtom'
import { useRecoilState } from 'recoil'
import '../../../_main.sass'
import Construction from './screens/Construction'
import company from '../../../company'

const Dashboard = () => {
    const [modalConfig] = useRecoilState(modalConfigAtom)

    return (
        <Router>
            <div className="container">
                {modalConfig.type!=='' ? 
                <Modal />
                : null}
                <Switch>
                    <Route exact path={`/${company.subsidiary}/dashboard`}><Construction /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/home`}><Construction /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.fitness}`}><Construction /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.finances}`}><Construction /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.notes}`}><Construction /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.journals}`}><Journals /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.schedule}`}><Schedule /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.fitness}`}><Fitness /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/settings`}><Settings /></Route>
                </Switch>
            </div>
        </Router>
)
}

export default Dashboard