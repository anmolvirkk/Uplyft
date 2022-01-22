import React from 'react'
import styles from './_inputBox.module.sass'
import { windowHeight, isMobile } from '../../../Dashboard/variables/mobileHeights'

const scrollToView = (e, wrapper) => {
    let elem = document.getElementById(wrapper)
    const checkParent = (elem) => {
        let parent = elem.parentNode
        if(parent.id){
            return parent
        }else if(parent){
            return checkParent(parent)
        }
    }
    if(elem){
        const top = elem.scrollHeight-(elem.scrollHeight-(elem.scrollTop+e.clientY-(checkParent(e.target).clientHeight)))
        if(window.innerHeight < windowHeight){
            elem.scroll({top: top, behavior: 'smooth'})
        }else if(isMobile){
            setTimeout(()=>{
                if(window.innerHeight < windowHeight){
                    elem.scroll({top: top, behavior: 'smooth'})
                }
            }, 500)
        }
    }
}

const InputBox = ({wrapper, name, type, marginBottom, value, onChange}) => {
    return (
    <div onMouseDown={(e)=>scrollToView(e, wrapper)} className={styles.group} style={marginBottom?{marginBottom: marginBottom+'px'}:null}>
        <input onChange={onChange?e=>onChange(e):null} defaultValue={value?value:null} type={type} required="required"/><span className={styles.highlight}></span><span className={styles.bar}></span>
        <label>{name}</label>
    </div>
    )
}

export default InputBox;
