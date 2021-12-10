import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Fitness from './screens/Fitness'
import Schedule from './screens/Schedule'
import Journals from './screens/Journals'
import Settings from './screens/Settings'
import Modal from './components/Modal'
import modalConfigAtom from './screens/Journals/recoil-atoms/modalConfigAtom'
import { useRecoilState } from 'recoil'
import '../../_main.sass'
import Construction from './screens/Construction'

const Dashboard = () => {
    const [modalConfig] = useRecoilState(modalConfigAtom)

    return (
        <Router>
            <div className="container">
                {modalConfig.type!=='' ? 
                <Modal />
                : null}

                <Switch>
                    <Route exact path="/"><Construction /></Route>
                    <Route path="/home"><Construction /></Route>
                    <Route path="/fitness"><Construction /></Route>
                    <Route path="/finances"><Construction /></Route>
                    <Route path="/notes"><Construction /></Route>
                    <Route path="/journals"><Journals /></Route>
                    <Route path="/schedule"><Schedule /></Route>
                    <Route path="/fitness"><Fitness /></Route>
                    <Route path="/settings"><Settings /></Route>
                </Switch>
            </div>
        </Router>
)
}

export default Dashboard