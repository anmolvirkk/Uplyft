import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import Schedule from './screens/Schedule'
import Journals from './screens/Journals'
import Modal from './components/Modal'
import { useRecoilState } from 'recoil'
import '../../../_main.sass'
import Construction from './screens/Construction'
import company from '../../../company'
import { darkModeAtom, planAtom } from './allAtoms'
import modalConfigAtom from './recoil-atoms/modalConfigAtom'
import Snackbar from './components/Snackbar'
import snacksAtom from './components/Snackbar/snacksAtom'
import { useRef } from 'react'

const Dashboard = ({updateAtoms, updateBackendless}) => {

    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)

    const [darkMode] = useRecoilState(darkModeAtom)

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = darkMode?'dark':'light'
        if(window.innerWidth<1450){
            if(document.getElementById('mainSideBar')){
                document.getElementById('mainSideBar').style.display = 'flex'
            }
        }else{
            if(document.getElementById('mainSideBar')){
                document.getElementById('mainSideBar').style.display = 'grid'
            }
        }
    }, [darkMode])

    const [snacks, setSnacks] = useRecoilState(snacksAtom)
    const [plan] = useRecoilState(planAtom)

    const updated = useRef({snacks: false, modals: false, atoms: false})

    useEffect(() => {
        if(!updated.current.snacks){
            updated.current.snacks = true
            setSnacks([])
        }
        if(!updated.current.modals){
            updated.current.modals = true
            setModalConfig({type: ''})
        }
        if(plan==='pro' && !updated.current.atoms){
            updated.current.atoms = true
            updateAtoms()
        }
    }, [modalConfig, snacks, setModalConfig, setSnacks, plan, updateAtoms])

    return (
        <div className="container">
            {modalConfig.type!=='' ? 
            <Modal />
            : null}
            <Snackbar />
            <Switch>
                <Route path={`/${company.subsidiary}/dashboard/${company.fitness}`}><Construction color="linear-gradient(90deg,#42D104,#FFE500)" updateBackendless={updateBackendless} /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.finances}`}><Construction color="linear-gradient(90deg,#FE3200,#FF914D)" updateBackendless={updateBackendless} /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.notes}`}><Construction color="linear-gradient(90deg,#3A1582,#A400FE)" updateBackendless={updateBackendless} /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.journals}`}><Journals updateBackendless={updateBackendless} updateAtoms={updateAtoms} /></Route>
                <Route path={`/${company.subsidiary}/dashboard/${company.schedule}`}><Schedule updateBackendless={updateBackendless} updateAtoms={updateAtoms} /></Route>
            </Switch>
        </div>
)
}

export default Dashboard