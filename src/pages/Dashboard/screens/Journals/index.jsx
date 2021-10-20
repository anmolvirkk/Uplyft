import React from 'react'
import styles from './_journal.module.sass'
import BookSection from './components/BookSection'
import SlotsSection from './components/SlotsSection'
import MainSection from './components/MainSection'
import Modal from '../../components/Modal'
import SideBar from '../../components/SideBar'
import { Redirect } from 'react-router'
import Calendar from './components/Calendar'

import {useRecoilState} from 'recoil'
import allRoutesAtom from './recoil-atoms/allRoutesAtom'
import modalConfigAtom from './recoil-atoms/modalConfigAtom'

const Journals = () => {

    const [allRoutes] = useRecoilState(allRoutesAtom)

    const [modalConfig] = useRecoilState(modalConfigAtom)

        return (
        <div style={{display: 'flex'}}>
            <Redirect to={Object.entries(allRoutes).length!==0?`/journals/${allRoutes['book']}/${allRoutes['date']}/${allRoutes[allRoutes['book']][allRoutes['date']]}`:`/journals`} />
            <SideBar />

            <BookSection styles={styles} />

            <SlotsSection styles={styles} />

            <MainSection styles={styles} />

            {allRoutes&&allRoutes['book']&&allRoutes[[allRoutes['book']]]?<Calendar />:null}

            {modalConfig.type!=='' ? 
            <Modal />
            : null}

        </div>
    )
}

export default Journals