import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Schedule from './screens/Schedule'
import Journals from './screens/Journals'
import Modal from './components/Modal'
import modalConfigAtom from './screens/Journals/recoil-atoms/modalConfigAtom'
import { useRecoilState } from 'recoil'
import '../../../_main.sass'
import Construction from './screens/Construction'
import company from '../../../company'

const Dashboard = () => {

    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)
    const isMobile = window.innerWidth < 1450
    if(isMobile){
        let timeout = null
        window.onresize = () => {
            if(!document.getElementById('textEditor')){
                clearTimeout(timeout)
                timeout = setTimeout(()=>{
                    setModalConfig({...modalConfig})
                }, 300)
            }
        }
    }

    return (
        <Router>
            <div className="container">
                {modalConfig.type!=='' ? 
                <Modal />
                : null}
                <Switch>
                    <Route path={`/${company.subsidiary}/dashboard/${company.fitness}`}><Construction color="linear-gradient(90deg,#42D104,#FFE500)" /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.finances}`}><Construction color="linear-gradient(90deg,#FE3200,#FF914D)" /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.notes}`}><Construction color="linear-gradient(90deg,#3A1582,#A400FE)" /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.journals}`}><Journals /></Route>
                    <Route path={`/${company.subsidiary}/dashboard/${company.schedule}`}><Schedule /></Route>
                </Switch>
            </div>
        </Router>
)
}

export default Dashboard