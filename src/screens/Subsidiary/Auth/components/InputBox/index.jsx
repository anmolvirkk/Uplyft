import React, { useRef } from 'react'
import styles from './_inputBox.module.sass'
import { windowHeight } from '../../../Dashboard/variables/mobileHeights'
import { useRecoilState } from 'recoil'
import isMobileAtom from '../../../Dashboard/recoil-atoms/isMobileAtom'

const scrollToView = (e, wrapper, isMobile) => {
    let elem = document.getElementById(wrapper)
    if(elem){
        const top = elem.scrollHeight-(elem.scrollHeight-(elem.scrollTop+e.clientY))
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

const InputBox = ({wrapper, name, type, marginBottom, value, onChange, onBlur, icon, autoFocus, onFocus, id, autoComplete, onTouchEnd, error, onLoad, pattern, onKeyDown}) => {
    const [isMobile] = useRecoilState(isMobileAtom)
    const input = useRef()
    if(input.current){
        if(error){
            input.current.style.setProperty('--inputColor', 'rgb(255,51,51)')
            input.current.style.setProperty('--initialBar', '100%')
            input.current.style.setProperty('--initialLabelFontSize', '12px')
            input.current.style.setProperty('--initialLabelTop', '-15px')
            input.current.style.setProperty('--labelColor', 'rgb(255,51,51)')
        }else{
            input.current.style.setProperty('--inputColor', 'rgb(var(--primary))')
            input.current.style.setProperty('--initialBar', '0')
            input.current.style.setProperty('--initialLabelFontSize', '14px')
            input.current.style.setProperty('--initialLabelTop', '10px')
            input.current.style.setProperty('--labelColor', 'rgb(var(--titles))')
        }
    }
    return (
    <div ref={input} onMouseDown={(e)=>scrollToView(e, wrapper, isMobile)} className={`${styles.group} ${icon?styles.icon:null}`} style={marginBottom?{marginBottom: marginBottom+'px'}:null}>
        {icon?icon:null}
        <input onKeyDown={onKeyDown?onKeyDown:null} pattern={pattern?pattern:null} onLoad={(e)=>onLoad(e)} onTouchEnd={onTouchEnd?(e)=>onTouchEnd(e):null} autoComplete={autoComplete?autoComplete:null} id={id?id:null} onFocus={onFocus?(e)=>onFocus(e):null} autoFocus={autoFocus?autoFocus:null} onBlurCapture={onBlur?(e)=>onBlur(e):null} onChange={onChange?e=>onChange(e):null} defaultValue={value?value:null} type={type} required="required"/><span className={styles.highlight}></span><span className={styles.bar}></span>
        <label>{error?error:name}</label>
    </div>
    )
}

export default InputBox;
