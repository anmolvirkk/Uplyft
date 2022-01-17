import React, {useState} from 'react'
import {MoreVertical} from 'react-feather'
import styles from './_moremenu.module.sass'
import OutsideClickHandler from 'react-outside-click-handler-lite'

const MoreMenu = ({items, id, pos}) => {

    const [visible, setVisible] = useState(false)

    const closeMenu = () => {
        if(visible){
            setVisible(false)
        }
    }
    
    if(document.getElementById('scheduleSideMenu') && visible){
        document.getElementById('scheduleSideMenu').onscroll = () => {
            setVisible(false)
            document.getElementById('scheduleSideMenu').onscroll = null
        }
    }

    return (
        <div className={styles.moreMenuWrapper}>
            <OutsideClickHandler onOutsideClick={closeMenu}>
                <div className={styles.moreMenuIcon} onClick={()=>setVisible(!visible)} id={id}>
                    <MoreVertical />
                    {visible?
                        <ul className={styles.moreMenu} style={{right: pos.right, top: pos.top}}>
                            {items.map((props, index)=><li onClick={props.function} key={index}>{props.name}</li>)}
                        </ul>
                    :null}
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default MoreMenu