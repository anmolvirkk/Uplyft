import React from 'react'

const AddButton = ({styles ,name}) => {

    return <button className={styles.addButton}><p>add {name}</p><span>+</span></button>
}

export default AddButton