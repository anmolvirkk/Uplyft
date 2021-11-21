import React from 'react'
import styles from './_taskdeadline.module.sass'

const TaskDeadline = () => {
    return (
        <div className={styles.taskDeadline}>
            <hr />
            <ul>
                <li>
                    <div className={styles.deadlineDot} />
                    <h3>Start</h3>
                    <p>{new Date().toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: '2-digit'})}</p>
                </li>
            </ul>
        </div>
    )
}

export default TaskDeadline
