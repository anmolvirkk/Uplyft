import React from 'react'
import styles from './_inputBox.module.sass'
import { windowHeight, isMobile } from '../../../Dashboard/variables/mobileHeights'

const scrollToView = (e, wrapper) => {
    if(wrapper){
        const top = e.target.scrollHeight-(e.target.scrollHeight-(e.target.scrollTop+e.clientY))
        if(window.innerHeight < windowHeight){
            wrapper.scroll({top: top, behavior: 'smooth'})
        }else if(isMobile){
            setTimeout(()=>{
                wrapper.scroll({top: top, behavior: 'smooth'})
            }, 500)
        }
    }
}

const InputBox = ({wrapper, name, type,  marginBottom, value, onChange}) => {
  return (
    <div onMouseDown={(e)=>scrollToView(e, wrapper)} className={styles.group} style={marginBottom?{marginBottom: marginBottom+'px'}:null}>
        <input onChange={e=>onChange(e)} defaultValue={value?value:null} type={type} required="required"/><span className={styles.highlight}></span><span className={styles.bar}></span>
        <label>{name}</label>
    </div>
  )
}

export default InputBox;
