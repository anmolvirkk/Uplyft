import React, {useState} from 'react'
import {MoreVertical} from 'react-feather'
import styles from './_moremenu.module.sass'

const MoreMenu = ({items, id, pos}) => {

    const [visible, setVisible] = useState('none');
    
    
    document.addEventListener('mouseup', function(e) {
        const moreMenu = document.getElementById(id);
        if(moreMenu){
            if (!moreMenu.contains(e.target)) {
                setVisible('none')
            }
        }
    });

    const toggleMenu = () => {
        visible==='none' ? setVisible('block') : setVisible('none')
    }

    return (
        <div className={styles.moreMenuIcon} onClick={toggleMenu} id={id}>
            <MoreVertical />
            <ul className={styles.moreMenu} style={{display: visible, right: pos.right, top: pos.top}}>
                {items.map((props, index)=><li onClick={props.function} key={index}>{props.name}</li>)}
            </ul>
        </div>
    )
}

export default MoreMenu