import React, {useState} from 'react'
import {MoreVertical} from 'react-feather'
import styles from './_moremenu.module.sass'

const MoreMenu = ({items}) => {

    const [visible, setVisible] = useState('none');
    
    
    document.addEventListener('mouseup', function(e) {
        const moreMenu = document.getElementById('moreMenu');
        if (!moreMenu.contains(e.target)) {
            setVisible('none')
        }
    });

    const toggleMenu = () => {
        visible==='none' ? setVisible('block') : setVisible('none')
    }

    return (
        <div className={styles.moreMenuIcon} onClick={toggleMenu} id="moreMenu">
            <MoreVertical />
            <ul className={styles.moreMenu} style={{display: visible}}>
                {items.map((name, index)=><li key={index}>{name}</li>)}
            </ul>
        </div>
    )
}

export default MoreMenu