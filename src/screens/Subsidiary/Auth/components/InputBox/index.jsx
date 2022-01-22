import React from 'react'
import styles from './_inputBox.module.sass'
import { windowHeight, isMobile } from '../../../Dashboard/variables/mobileHeights'

const scrollToView = (e, wrapper) => {
    let elem = document.getElementById(wrapper)
    if(elem){
        if(window.innerHeight < windowHeight){
            elem.scroll({top: elem.scrollHeight/4.5, behavior: 'smooth'})
        }else if(isMobile){
            setTimeout(()=>{
                if(window.innerHeight < windowHeight){
                    elem.scroll({top: 1500, behavior: 'smooth'})
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
