import React from 'react'
import styles from './_header.module.sass'
import {ChevronDown} from 'react-feather'

const Header = ({type, items, edited}) => {
    switch (type) {
        case 'editor':
            return <header>
                        <p className={styles.date}>Last edited on {edited}</p>
                        <div>
                            {items.map((items, index)=>{
                            switch (items.type) {
                                case 'dropdown':
                                    return <button key={index}><p>{items.options[0]}<span><ChevronDown /></span></p></button>
                                case 'icon':
                                    return <button key={index}>{items.icon}</button>
                                default:
                                    return null
                                }
                            })}
                        </div>
                    </header>
        default:
            return <header></header>
    }
}

export default Header