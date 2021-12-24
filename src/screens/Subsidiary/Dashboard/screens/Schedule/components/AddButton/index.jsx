import React from 'react'
import styles from './_addbutton.module.sass'
import { Plus } from 'react-feather'

const AddButton = (props) => {
    return (
        <button onMouseUp={props.onclick} className={styles.addButton} id="addButton" >
            <div className={styles.clickButton}><p>Add {props.name}</p><Plus /></div>
        </button>
    )
}

export default AddButton