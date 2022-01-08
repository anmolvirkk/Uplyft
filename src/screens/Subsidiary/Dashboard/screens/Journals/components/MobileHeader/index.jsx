import React from 'react'
import styles from './_mobileHeader.module.sass'
import {MoreVertical, Plus} from 'react-feather'
import modalConfigAtom from '../../recoil-atoms/modalConfigAtom'
import { useSetRecoilState } from 'recoil'

const MobileHeader = () => {
    const setModalConfig = useSetRecoilState(modalConfigAtom)
    return (
        <div className={styles.header}>
            <p>Journals</p>
            <div className={styles.options}>
                <Plus onMouseDown={()=>setModalConfig({type: 'addjournal'})} />
                <MoreVertical />
            </div>
        </div>
    )
}

export default MobileHeader
