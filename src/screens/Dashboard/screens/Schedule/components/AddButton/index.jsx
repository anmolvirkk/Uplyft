import React from 'react'
import styles from './_addbutton.module.sass'
import { Plus } from 'react-feather'

const AddButton = (props) => {
    return (
        <button onMouseUp={props.onclick} className={props.type==='round'?styles.roundButton:styles.addButton} id="addButton" >
            {props.type==='round'?<Plus />:<div className={styles.clickButton}><p>Add {props.name}</p><Plus /></div>}
        </button>
    )
}

export default AddButton