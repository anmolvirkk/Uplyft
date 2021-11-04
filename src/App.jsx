import React from 'react'
import Dashboard from './pages/Dashboard'
import {useRecoilState} from 'recoil'
import darkModeAtom from './pages/Dashboard/components/SideBar/components/DarkMode/darkModeAtom'

const App = () => {

    const [darkMode] = useRecoilState(darkModeAtom)

    return (
        <div className={(darkMode?'dark':'light')}>
            <Dashboard />
        </div>
    )
}

export default App