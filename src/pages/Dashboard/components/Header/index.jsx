import React from 'react'
import './_header.module.sass'
import {ChevronDown} from 'react-feather'

const Header = ({type, items}) => {
    switch (type) {
        case 'editor':
            return <header>
                {items.map((items, index)=>{
                    switch (items.type) {
                        case 'dropdown':
                            return <button key={index}><p>{items.options[0]}<span><ChevronDown /></span></p></button>
                        case 'icon':
                            return <button key={index}>{items.icon}</button>
                        default:
                            return null
                    }
            })}</header>
        default:
            return <header></header>
    }
}

export default Header