import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'
import Schedule from './screens/Schedule'
import Journals from './screens/Journals'
import { useRecoilState } from 'recoil'
import '../../_main.sass'
import Construction from './screens/Construction'
import company from '../../company'
import { darkModeAtom, planAtom } from './allAtoms'
import modalConfigAtom from './recoil-atoms/modalConfigAtom'
import Snackbar from './components/Snackbar'
import snacksAtom from './components/Snackbar/snacksAtom'
import { stripeSecret } from '../Pricing/components/Plan'
import Modal from './components/Modal'
import updatedAtom from './updatedAtom'
import dataAtom from './dataAtom'
import isGuestAtom from '../Pricing/isGuestAtom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'

const Dashboard = React.memo(({updateAtoms, updateBackend}) => {

    const [plan, setPlan] = useRecoilState(planAtom)
    const [data] = useRecoilState(dataAtom)
    const [isGuest] = useRecoilState(isGuestAtom)

    useEffect(()=>{
            const docRef = doc(db, 'users', data.uid)
            getDoc(docRef).then(e=>{
                if(e.exists){
                    let xr = new XMLHttpRequest()
                    xr.open('GET', `https://api.stripe.com/v1/customers`, true)
                    xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                    xr.send(null)
                    xr.onload = (customers) => {
                        if(JSON.parse(customers.currentTarget.response).data.find(i=>i.email===data.email)){
                            let xr = new XMLHttpRequest()
                            xr.open('GET', `https://api.stripe.com/v1/subscriptions`, true)
                            xr.setRequestHeader('Authorization', 'Bearer '+stripeSecret )
                            xr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                            xr.send(`customer=${customers[0]}`)
                            xr.onload = (sub) => {
                                if(JSON.parse(sub.currentTarget.response).data.length > 0){
                                    if(JSON.parse(sub.currentTarget.response).data[0].items.data[0].price.unit_amount>0){
                                        setPlan(JSON.parse(sub.currentTarget.response).data[0].items.data[0].price.unit_amount)
                                    }else{
                                        setPlan(0)
                                    }
                                }else{
                                    setPlan(0)
                                }
                            }
                        }else{
                            setPlan(0)
                        }
                    }
                }else if(!isGuest){
                    window.location.replace(`/`)
            }
        })
    }, [setPlan, plan, data, isGuest])

    const [modalConfig, setModalConfig] = useRecoilState(modalConfigAtom)

    const [darkMode] = useRecoilState(darkModeAtom)

    useEffect(()=>{
        document.getElementsByTagName('html')[0].className = darkMode?'dark':'light'
        if(window.innerWidth<=640){
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

    let planTitle = 'Starter'
    if(plan === 2000 || plan === 22000){
        planTitle = 'Plus'
    }else if(plan === 2500 || plan === 27500){
        planTitle = 'Pro'
    }

    const [updated, setUpdated] = useRecoilState(updatedAtom)

    useEffect(() => {
        if(snacks.length > 0 && !updated.snacks){
            setSnacks([])
            setUpdated({...updated, snacks: true})
        }
        if(snacks.length === 0 && planTitle==='Pro' && !updated.atoms){
            updateAtoms()
            setUpdated({...updated, atoms: true})
        }
    }, [modalConfig, snacks, setModalConfig, setSnacks, planTitle, updateAtoms, updated, setUpdated])

    return (
        <div className="container">
            {modalConfig.type!==''?<Modal />:null}
            <Snackbar />
            <Switch>
                <Route path={`/dashboard/${company.fitness}`}><Construction color="linear-gradient(90deg,#42D104,#FFE500)" updateBackend={updateBackend} /></Route>
                <Route path={`/dashboard/${company.finances}`}><Construction color="linear-gradient(90deg,#FE3200,#FF914D)" updateBackend={updateBackend} /></Route>
                <Route path={`/dashboard/${company.notes}`}><Construction color="linear-gradient(90deg,#3A1582,#A400FE)" updateBackend={updateBackend} /></Route>
                <Route path={`/dashboard/${company.journals}`}><Journals updateBackend={updateBackend} updateAtoms={updateAtoms} /></Route>
                <Route path={`/dashboard/${company.schedule}`}><Schedule updateBackend={updateBackend} updateAtoms={updateAtoms} /></Route>
            </Switch>
        </div>
    )
})

export default Dashboard