import React, { useState } from 'react'
import styles from './_mobileHeader.module.sass'
import {Plus, ArrowLeft} from 'react-feather'
import modalConfigAtom from '../../../Journals/recoil-atoms/modalConfigAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import currentMobileSectionAtom from '../../recoil-atoms/currentMobileSectionAtom'
import allRoutesAtom from '../../../Journals/recoil-atoms/allRoutesAtom'
import MoreMenu from '../../../../components/MoreMenu'
import { Redirect } from 'react-router-dom'
import company from '../../../../../../../company'
import darkModeAtom from '../../../../components/SideBar/components/DarkMode/darkModeAtom'

const MobileHeader = () => {
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    const [currentMobileSection] = useRecoilState(currentMobileSectionAtom)


    const [allRoutes] = useRecoilState(allRoutesAtom)

    const [darkMode, setDarkMode] = useRecoilState(darkModeAtom)
  
    const [redirect] = useState(false)

    const sections = [
        {
            title: 'Habits',
            onAdd: ()=>{
                setModalConfig({type: 'addhabit'})
            },
            onBack: null
        }
    ]

    return (
        <div className={styles.header}>
            {redirect?<Redirect to={`/${company.subsidiary}/dashboard/${company.journals}/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`} />:null}
            <div className={styles.options}>
                {currentMobileSection===0?null:<ArrowLeft onMouseDown={sections[currentMobileSection].onBack} />}
                <p>{sections[currentMobileSection].title}</p>
            </div>
            <div className={styles.options}>
                {sections[currentMobileSection].onAdd?<Plus onMouseDown={sections[currentMobileSection].onAdd} />:null}
                <div className={styles.moremenu}>
                    <MoreMenu items={[{name: `${darkMode ? 'Light' : 'Dark'} Mode`, function: ()=>setDarkMode(!darkMode)}, {name: "Logout", function: null}]} pos={{right: '0', top: '6vh'}} />
                </div>
            </div>
        </div>
    )
}

export default MobileHeader
